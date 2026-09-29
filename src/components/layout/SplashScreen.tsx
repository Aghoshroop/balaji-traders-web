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
          // Hide the loading curtain so the video is visible
          document.documentElement.classList.remove('has-splash-intro');
        })
        .catch((err) => {
          console.warn('Autoplay waiting for user gesture:', err);
          setIsPlaying(false);
          // Even if autoplay fails, we need to show the play button, so hide curtain
          document.documentElement.classList.remove('has-splash-intro');
        });
    } else {
       // Fallback if playPromise is undefined
       setIsPlaying(true);
       document.documentElement.classList.remove('has-splash-intro');
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

  // Keyboard accessibility: ESC or SPACE to skip, M to toggle sound
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        handleDismiss();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleDismiss, isMuted]);

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
          key={isPortrait ? 'portrait-splash' : 'landscape-splash'}
          src={isPortrait ? '/videos/splash-potrait.mp4' : '/videos/splash.mp4'}
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
      {/* 2. TOP CONTROLS & BRAND IDENTITY BAR                         */}
      {/* ============================================================ */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-auto">
        {/* Brand identity badge */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-sky-400 relative" />
          </div>
          <div>
            <div className="text-white text-xs sm:text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span>{BUSINESS.name}</span>
              <span className="text-[10px] technical-mono font-medium text-sky-400 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-800/60 hidden sm:inline-block">
                CHENNAI
              </span>
            </div>
            <p className="text-[10px] text-slate-300 technical-mono tracking-wider hidden sm:block">
              SWIMWEAR DISTRIBUTION · EST. {BUSINESS.established}
            </p>
          </div>
        </div>

        {/* Audio Toggle Pill */}
        <button
          onClick={toggleSound}
          type="button"
          aria-label={isMuted ? 'Turn sound on' : 'Mute sound'}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium backdrop-blur-md border transition-all cursor-pointer shadow-lg active:scale-95 ${
            isMuted
              ? 'bg-black/50 text-slate-200 border-white/20 hover:bg-black/80 hover:border-sky-400/60 hover:text-white'
              : 'bg-sky-500/20 text-sky-300 border-sky-400/60 hover:bg-sky-500/30'
          }`}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-300" />
              <span className="font-semibold">Sound Off</span>
              {!hasInteracted && (
                <span className="hidden md:inline text-[10px] text-sky-300 ml-1 font-mono uppercase bg-sky-900/60 px-1.5 py-0.5 rounded border border-sky-600/40">
                  Tap to Listen
                </span>
              )}
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-sky-400 animate-pulse" />
              <span className="font-semibold text-white">Sound On</span>
              {/* Dynamic audio waves indicator */}
              <div className="flex items-center gap-0.5 h-3 ml-1">
                <span className="w-0.5 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-0.5 h-3 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-0.5 h-1.5 bg-sky-400 rounded-full animate-bounce" />
              </div>
            </>
          )}
        </button>
      </header>

      {/* ============================================================ */}
      {/* 3. CENTER PLAY FALLBACK (If autoplay was blocked)            */}
      {/* ============================================================ */}
      {!isPlaying && (
        <button
          onClick={() => {
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

      {/* ============================================================ */}
      {/* 4. BOTTOM CONTROLS: SKIP BUTTON & PROGRESS BAR               */}
      {/* ============================================================ */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-auto">
        {/* Keyboard Hint */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] technical-mono text-slate-400">
          <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-slate-300">
            ESC
          </span>
          <span>to skip intro</span>
          <span className="mx-1 text-slate-600">·</span>
          <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-slate-300">
            M
          </span>
          <span>to toggle sound</span>
        </div>

        {/* Skip button with countdown */}
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={handleDismiss}
            type="button"
            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/25 hover:border-white/50 text-white text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all cursor-pointer shadow-xl"
          >
            <span>Skip Intro</span>
            {secondsRemaining > 0 && (
              <span className="technical-mono text-xs text-sky-300 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-800/80">
                {secondsRemaining}s
              </span>
            )}
            <FastForward className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* 5. RAZOR-THIN ELECTRIC PROGRESS BAR ALONG THE BOTTOM EDGE   */}
      {/* ============================================================ */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15 z-30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-300 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(56,189,248,0.7)]"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
