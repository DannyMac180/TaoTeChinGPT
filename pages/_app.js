import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { UserContextProvider } from '@/contexts/UserContext';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserContextProvider>
      <Analytics />
    </>
  );
}
export default MyApp;
