import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { UserContextProvider } from '@/contexts/UserContext';
import { useUserData } from '@/lib/hooks';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <>
      <UserContextProvider>
        <Navbar />
        <div className="chat-component">
          <Component {...pageProps} />
        </div>
      </UserContextProvider>
      <Analytics />
    </>
  );
}
export default MyApp;
