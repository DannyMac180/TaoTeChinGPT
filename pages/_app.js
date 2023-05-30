import Navbar from '@/components/Navbar';
import TaoTeChing from '@/pages/index';
import { Analytics } from '@vercel/analytics/react';
import { UserContextProvider } from '@/contexts/UserContext';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <UserContextProvider>
        <Navbar />
        <TaoTeChing />
        <Component {...pageProps} />
      </UserContextProvider>
      <Analytics />
    </>
  );
}
export default MyApp;
