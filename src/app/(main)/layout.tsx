import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileActionBar from '@/components/layout/MobileActionBar';
import SupportChatWidget from '@/components/chat/SupportChatWidget';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
