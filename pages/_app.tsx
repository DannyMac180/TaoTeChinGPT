import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthProvider>
        <Analytics />
      </>
  );
}
export default MyApp;
