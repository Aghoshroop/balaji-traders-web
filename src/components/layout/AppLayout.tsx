'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import MobileActionBar from './MobileActionBar';
import SplashScreen from './SplashScreen';
import SupportChatWidget from '../chat/SupportChatWidget';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/hidden-admin');

  if (isAdmin) {
    return <main className="flex-1 w-full min-w-0 max-w-full overflow-x-hidden">{children}</main>;
  }

  return (
    <>
      <SplashScreen />
      <Header />
      <main className="flex-1 w-full min-w-0 max-w-full overflow-x-hidden pt-20 sm:pt-24 lg:pt-28 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileActionBar />
      <SupportChatWidget />
    </>
  );
}
