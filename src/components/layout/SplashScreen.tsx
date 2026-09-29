'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, FastForward, Play } from 'lucide-react';
import { BUSINESS } from '@/lib/config';

// Scoped to browser session: activates on 1st entry when opening the site,
// but never in between page navigation or browser reloads.
const SESSION_KEY = 'bt_session_started_v1';

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  // Both mounted and isVisible initialize to false to guarantee 100% identical SSR & client hydration
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(10);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Check orientation dynamically for portrait video selection
  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window === 'undefined') return;
      const mql = window.matchMedia('(orientation: portrait)');
      const isAspectPortrait = window.innerHeight > window.innerWidth;
      setIsPortrait(mql.matches || isAspectPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    const mql = window.matchMedia('(orientation: portrait)');
    if (mql?.addEventListener) {
      mql.addEventListener('change', checkOrientation);
    }

    return () => {
      window.removeEventListener('resize', checkOrientation);
      if (mql?.removeEventListener) {
        mql.removeEventListener('change', checkOrientation);
      }
    };
  }, []);

  // Check once client mounts: only show on 1st entry of the site, never on reloads or page navigation
  useEffect(() => {
    setMounted(true);
    try {
      // Initialize portrait orientation state immediately
      const isPortraitScreen =
        window.matchMedia('(orientation: portrait)').matches ||
        window.innerHeight > window.innerWidth;
      setIsPortrait(isPortraitScreen);

      // 1. Detect if the page load is a browser reload (F5 / Refresh button / Pull-to-refresh)
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const isReload = navEntry?.type === 'reload';

      // 2. Check if the site was already opened/entered in this session
      const alreadyEntered = sessionStorage.getItem(SESSION_KEY);

      // 3. Developer override query param for manual testing
      const forceSplash = window.location.search.includes('splash=true');

      // If user already entered this session or reloaded the site, do NOT show splash
      if ((alreadyEntered || isReload) && !forceSplash) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        document.documentElement.classList.remove('has-splash-intro');
        return;
      }

      // Mark session as entered immediately so subsequent reloads and page changes never trigger splash
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsVisible(true);
      
      // Hide the loading spinner immediately once React hydrates and SplashScreen decides to show.
      // This allows the video to buffer natively without being covered by a 10-second spinner.
      setTimeout(() => {
        document.documentElement.classList.remove('has-splash-intro');
      }, 50);
    } catch {
      // In case sessionStorage is restricted in incognito/embedded webviews
    }
  }, []);

  // Dismiss splash screen smoothly
  const handleDismiss = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);

    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // Ignore if sessionStorage is not accessible
    }

    // Clean up zero-flash curtain class
    document.documentElement.classList.remove('has-splash-intro');

    // Allow CSS transition to finish before unmounting
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
      // Signal other components (e.g. coach marks) that splash is done
      window.dispatchEvent(new CustomEvent('splash-complete'));
    }, 700);
  }, [isExiting, onComplete]);

  // Handle video completion
  const handleVideoEnd = () => {
    handleDismiss();
  };

  // Update progress tracking
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 10;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      if (dur && !isNaN(dur)) {
        setDuration(dur);
      }
    }
  };

  // Toggle sound with user interaction
  const toggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHasInteracted(true);
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);

      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Auto-play on mount when visible or when orientation changes
  useEffect(() => {
    if (!isVisible) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Autoplay waiting for user gesture:', err);
          setIsPlaying(false);
        });
    } else {
       setIsPlaying(true);
    }
  }, [isVisible, isPortrait, isMuted]);

  // Sync mute state to video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Lock body scroll while splash is active
  useEffect(() => {
    if (isVisible && !isExiting) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isVisible, isExiting]);

  // No keyboard skipping allowed
  useEffect(() => {
    // Intentionally empty: skipping is disabled.
  }, []);

  // Safety fallback: maximum 12 seconds
  useEffect(() => {
    if (!isVisible) return;
    const safetyTimer = setTimeout(() => {
      if (!isExiting && isVisible) {
        handleDismiss();
      }
    }, 12000);

    return () => clearTimeout(safetyTimer);
  }, [isExiting, isVisible, handleDismiss]);

  // Support replaying splash screen on demand via custom event
  useEffect(() => {
    const handleReplay = () => {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.add('has-splash-intro');
        const isPortraitNow =
          window.matchMedia('(orientation: portrait)').matches ||
          window.innerHeight > window.innerWidth;
        setIsPortrait(isPortraitNow);
      }
      setIsVisible(true);
      setIsExiting(false);
      setProgress(0);
      setCurrentTime(0);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = false; // unmuted on intentional user replay
        setIsMuted(false);
        videoRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('replay-splash', handleReplay);
    return () => window.removeEventListener('replay-splash', handleReplay);
  }, []);

  if (!mounted || !isVisible) return null;

  const secondsRemaining = Math.max(0, Math.ceil(duration - currentTime));

  return (
    <div
      id="balaji-splash-root"
      role="dialog"
      aria-label="Welcome to Balaji Traders splash screen"
      aria-modal="true"
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden transition-all duration-700 ease-out select-none ${
        isExiting
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* ============================================================ */}
      {/* 1. CINEMATIC BACKGROUND VIDEO (PORTRAIT & LANDSCAPE ADAPTIVE) */}
      {/* ============================================================ */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted={isMuted}
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          className="w-full h-full object-cover object-center transform-gpu will-change-transform"
        >
          <source src="/videos/splash-potrait.mp4" type="video/mp4" media="(orientation: portrait)" />
          <source src="/videos/splash.mp4" type="video/mp4" />
        </video>

        {/* Ambient aquatic gradient vignette around edges for theatrical framing */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-black/20 to-black/60" />
      </div>

      {/* ============================================================ */}
      {/* 3. CENTER PLAY FALLBACK (If autoplay was blocked)            */}
      {/* ============================================================ */}
      {!isPlaying && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (videoRef.current) {
              videoRef.current.play().then(() => setIsPlaying(true));
            }
          }}
          type="button"
          className="absolute z-20 flex flex-col items-center gap-3 p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:border-sky-400 transition-all active:scale-95"
        >
          <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
            <Play className="w-7 h-7 text-white fill-white translate-x-0.5" />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider">
            Tap to Play Intro
          </span>
        </button>
      )}
    </div>
  );
}
