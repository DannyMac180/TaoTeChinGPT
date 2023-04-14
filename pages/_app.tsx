import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import AuthListener from '../components/AuthListener';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthListener />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
