import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <ChakraProvider>
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthProvider>
        <Analytics />
        </ChakraProvider>
      </>
  );
}
export default MyApp;
