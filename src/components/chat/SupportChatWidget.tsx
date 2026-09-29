'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  MessageSquareText,
  X,
  Send,
  RotateCcw,
  Phone,
  MessageCircle,
  User,
  Loader2,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import ChatbotCoachMark from './ChatbotCoachMark';
import { CONTACT } from '@/lib/config';
import { getGeneralWhatsAppUrl, getPhoneUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick, trackCallClick } from '@/lib/analytics';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  'Recommend my swimwear size',
  'What EGLIDER products do you have?',
  'Where is your Chennai store located?',
  'What are your store hours & contact?',
  'How do I place an order?',
];

const INITIAL_GREETING: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content: `Hello! 👋 I'm **Balaji AI**, your personal customer support assistant for **Balaji Traders, Chennai**.

I'm here to provide 24/7 personal assistance with:
- 🏊 **Swimwear & Gear:** Sizing charts, fit guidance & EGLIDER specs
- 📦 **Stock & Availability:** Current store & warehouse stock
- 📍 **Store & Location:** Otteri, Chennai address, directions & timings
- 💬 **Orders & Enquiries:** Personalized support for individual swimmers, coaches & retailers

How can I help you today?`,
  timestamp: 'Just now',
};

// Formatted message helper to render markdown bold, bullet lists, and paragraphs cleanly
function FormattedMessage({ content }: { content: string }) {
  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        const isBullet =
          trimmed.startsWith('- ') ||
          trimmed.startsWith('• ') ||
          trimmed.startsWith('* ');
        const bulletText = isBullet ? trimmed.replace(/^[-•*]\s*/, '') : trimmed;

        const renderInline = (str: string) => {
          const parts = str.split(/(\*\*[^*]+\*\*)/g);
          return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={i} className="font-bold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });
        };

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-0.5">
              <span className="text-sky-500 font-bold shrink-0 mt-0.5">•</span>
              <div className="flex-1">{renderInline(bulletText)}</div>
            </div>
          );
        }

        return <p key={lineIdx}>{renderInline(trimmed)}</p>;
      })}
    </div>
  );
}

export default function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(true);
  const [showCoachMark, setShowCoachMark] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Trigger coach mark on first visit — but only AFTER splash finishes
  useEffect(() => {
    try {
      const seen = localStorage.getItem('balaji_ai_onboarding_seen');
      if (seen) return;
    } catch {
      return;
    }

    const showAfterDelay = () => {
      const timer = setTimeout(() => setShowCoachMark(true), 500);
      return () => clearTimeout(timer);
    };

    // Check if splash screen is currently active
    const splashActive =
      document.getElementById('balaji-splash-root') ||
      document.documentElement.classList.contains('has-splash-intro');

    if (splashActive) {
      // Wait for splash to finish, then show coach mark
      const handler = () => {
        setTimeout(() => setShowCoachMark(true), 600);
      };
      window.addEventListener('splash-complete', handler, { once: true });
      // Safety: if splash somehow never fires the event, show after 15s
      const safety = setTimeout(() => {
        window.removeEventListener('splash-complete', handler);
        setShowCoachMark(true);
      }, 15000);
      return () => {
        window.removeEventListener('splash-complete', handler);
        clearTimeout(safety);
      };
    } else {
      return showAfterDelay();
    }
  }, []);

  // Listen for custom event to re-trigger coach mark
  useEffect(() => {
    const handleReopenTour = () => setShowCoachMark(true);
    window.addEventListener('open-store-tour', handleReopenTour);
    return () => window.removeEventListener('open-store-tour', handleReopenTour);
  }, []);

  // Listen for custom event to open chat dialog from anywhere in the app
  useEffect(() => {
    const handleOpenChat = () => {
      setShowCoachMark(false);
      setIsOpen(true);
    };
    window.addEventListener('open-support-chat', handleOpenChat);
    return () => window.removeEventListener('open-support-chat', handleOpenChat);
  }, []);

  const handleDismissCoachMark = () => {
    setShowCoachMark(false);
    try {
      localStorage.setItem('balaji_ai_onboarding_seen', 'true');
    } catch {
      // Ignore
    }
  };

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setShowWelcomeTooltip(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isLoading]);

  // Dismiss welcome tooltip automatically after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for Escape key to close chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Send message to Next.js API route
  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputPrompt).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const replyContent =
        data.reply ||
        data.fallbackReply ||
        `Thank you for reaching out to Balaji Traders AI Support. For immediate assistance with sizes, stock, or orders, you can also message our team on WhatsApp at ${CONTACT.phoneFormatted}.`;

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `I'm having a brief connection issue. Please feel free to reach our Balaji Traders team directly on WhatsApp at ${CONTACT.phoneFormatted} or call ${CONTACT.phone} for immediate assistance.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setInputPrompt('');
  };

  return (
    <>
      {/* ============================================================ */}
      {/* 0. SPOTLIGHT COACH MARK (first-time onboarding)              */}
      {/* ============================================================ */}
      {showCoachMark && !isOpen && (
        <ChatbotCoachMark
          targetSelector="[data-coachmark-target='chatbot-launcher']"
          onDismiss={handleDismissCoachMark}
        />
      )}

      {/* ============================================================ */}
      {/* 1. FLOATING LAUNCHER BUTTON                                  */}
      {/* ============================================================ */}
      <div
        data-coachmark-target="chatbot-launcher"
        className="fixed bottom-20 lg:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end pointer-events-auto"
      >
        {/* Floating trigger button - Dedicated AI Support styling */}
        {!isOpen && (
          <button
            onClick={() => {
              if (showCoachMark) {
                handleDismissCoachMark();
              }
              setIsOpen(true);
            }}
            className="group relative flex items-center justify-center p-2.5 sm:px-3.5 sm:py-2.5 sm:gap-2 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 hover:from-slate-900 hover:to-slate-800 text-white rounded-full shadow-xl shadow-slate-950/30 border border-sky-500/40 hover:border-sky-400 hover:scale-[1.03] active:scale-95 transition-all duration-200 focus:outline-hidden cursor-pointer"
            aria-label="Open Balaji Traders AI Support Chat"
          >
            {/* Ambient subtle glow ring */}
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-sky-500/20 to-emerald-500/20 blur-xs group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative shrink-0 flex items-center justify-center w-7 h-7 sm:w-7 sm:h-7 rounded-full bg-sky-500/20 text-sky-400 group-hover:text-white transition-colors">
              {/* Authentic AI Rays (centered on the icon) */}
              <span className="absolute inset-0 rounded-full bg-sky-500/40 animate-[ping_2s_ease-out_infinite] pointer-events-none" />
              <span className="absolute inset-0 rounded-full bg-sky-400/30 animate-[ping_2.5s_ease-out_infinite] pointer-events-none" style={{ animationDelay: '0.5s' }} />
              
              <Bot className="w-4 h-4 sm:w-4 sm:h-4 text-sky-400 relative z-10" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-slate-900 z-10" />
            </div>

            <div className="hidden sm:flex flex-col items-start text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-wide">
                  Balaji AI Support
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-sky-500/20 text-[9px] font-bold text-sky-300 uppercase tracking-wider">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-300 font-medium">
                Personal Assistant · 24/7
              </span>
            </div>
          </button>
        )}
      </div>

      {/* ============================================================ */}
      {/* 2. CHAT SYSTEM WINDOW DIALOG                                */}
      {/* ============================================================ */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-16 top-16 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[620px] sm:max-h-[85vh] z-50 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden transition-all duration-200 animate-fade-in">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-sky-500/30 flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-5 h-5 text-sky-400" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white tracking-wide">
                    Balaji Traders AI Support
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-sky-500/20 text-[9px] font-bold text-sky-300 uppercase tracking-wider">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online · Personal Assistant (24/7)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowCoachMark(true);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="View Guide"
                aria-label="View Guide"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <a
                href={getPhoneUrl()}
                onClick={() => trackCallClick('chat-header')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Call Support Desk"
                aria-label="Call Support Desk"
              >
                <Phone className="w-4 h-4 text-slate-300" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
                aria-label="Close Chat Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick AI Topic Suggestions */}
          <div className="bg-slate-50 border-b border-slate-200/80 px-3 py-2 overflow-x-auto scrollbar-none no-scrollbar">
            <div className="flex items-center gap-1.5 w-max">
              <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider pl-1 shrink-0 flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-sky-600" />
                <span>SUGGESTED:</span>
              </span>
              {INITIAL_SUGGESTIONS.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(topic)}
                  disabled={isLoading}
                  className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white hover:bg-sky-50 hover:text-sky-900 hover:border-sky-300 border border-slate-200 rounded-lg transition-colors shadow-2xs whitespace-nowrap disabled:opacity-50 cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Stream Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30">
            {messages.map((message) => {
              const isAssistant = message.role === 'assistant';
              return (
                <div
                  key={message.id}
                  className={`flex gap-2.5 ${isAssistant ? 'items-start' : 'items-end justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-sky-500/30 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                      <Bot className="w-4 h-4 text-sky-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isAssistant
                        ? 'bg-slate-50 text-slate-800 border border-slate-200/90 rounded-tl-xs'
                        : 'bg-slate-900 text-white rounded-br-xs font-normal'
                    }`}
                  >
                    <FormattedMessage content={message.content} />

                    <div
                      className={`text-[9px] mt-1.5 technical-mono ${
                        isAssistant ? 'text-slate-400' : 'text-slate-400 text-right'
                      }`}
                    >
                      {message.timestamp}
                    </div>

                    {/* If assistant suggests WhatsApp, provide quick 1-click button */}
                    {isAssistant && message.id !== 'greeting' && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center gap-2">
                        <a
                          href={getGeneralWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick('chat-reply-cta')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold border border-emerald-200 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Continue on WhatsApp</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing / Waiting Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-sky-500/30 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-4 h-4 text-sky-400 animate-pulse" />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-xs p-3.5 shadow-xs flex items-center gap-2 text-xs text-slate-600">
                  <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
                  <span>Balaji AI is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Submission Area */}
          <div className="p-3 bg-white border-t border-slate-200/90">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask Balaji Traders AI anything..."
                disabled={isLoading}
                className="flex-1 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-sky-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-2xs transition-all"
              />
              <button
                type="submit"
                disabled={!inputPrompt.trim() || isLoading}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-xs transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Direct Escalation Subtext */}
            <div className="flex items-center justify-between pt-2 px-1 text-[10px] text-slate-400 technical-mono">
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <Bot className="w-3.5 h-3.5 text-sky-600" />
                <span>Balaji Traders AI Support</span>
              </span>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('chat-footer-escalation')}
                className="text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-1 shrink-0"
              >
                <span>Direct WhatsApp (+91 98410 22137)</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
