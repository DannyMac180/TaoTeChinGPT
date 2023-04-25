import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { UserContext } from '@/contexts/UserContext';
import { useUserData } from '@/lib/hooks';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
      </UserContext.Provider>
      <Analytics />
    </>
  );
}
export default MyApp;
