import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { ChakraProvider } from '@chakra-ui/react';
import { UserContext } from '@/contexts/UserContext';
import { useUserData } from '@/lib/hooks';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <>
      <ChakraProvider>
        <UserContext.Provider value={userData}>
          <Navbar />
          <Component {...pageProps} />
        </UserContext.Provider>
        <Analytics />
      </ChakraProvider>
    </>
  );
}
export default MyApp;
