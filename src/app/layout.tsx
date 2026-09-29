import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileActionBar from '@/components/layout/MobileActionBar';
import SplashScreen from '@/components/layout/SplashScreen';
import SupportChatWidget from '@/components/chat/SupportChatWidget';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import { BUSINESS, SEO } from '@/lib/config';
import { getOrganizationSchema, getWebSiteSchema, getLocalBusinessSchema } from '@/lib/schema';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: {
    default: SEO.defaultTitle,
    template: `%s | ${BUSINESS.name}`,
  },
  description: SEO.defaultDescription,
  keywords: [...SEO.defaultKeywords],
  authors: [{ name: BUSINESS.name }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SEO.siteUrl,
    siteName: BUSINESS.name,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SEO.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Synchronous preloader detector: runs before body is painted to eliminate flash of content */}
        <script
          id="splash-preloader-detector"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var isReload = false;
                  if (window.performance && window.performance.getEntriesByType) {
                    var nav = window.performance.getEntriesByType('navigation')[0];
                    if (nav && nav.type === 'reload') isReload = true;
                  }
                  var entered = sessionStorage.getItem('bt_session_started_v1');
                  var force = window.location.search.indexOf('splash=true') !== -1;
                  if ((!entered && !isReload) || force) {
                    document.documentElement.classList.add('has-splash-intro');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteSchema()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
        {/* Zero-latency initial curtain - prevents any flash of store content before splash video */}
        <div
          id="splash-curtain"
          style={{ display: 'none' }}
          className="fixed inset-0 z-[99998] bg-black items-center justify-center pointer-events-auto"
        >
          <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
        </div>

        <SmoothScrollProvider>
          <SplashScreen />
          <Header />
          <main className="flex-1 w-full min-w-0 max-w-full overflow-x-hidden pt-20 sm:pt-24 lg:pt-28 pb-16 lg:pb-0">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
          <SupportChatWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
