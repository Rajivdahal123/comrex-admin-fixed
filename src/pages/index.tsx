import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext';
const Spinner = dynamic(() => import('../components/common/Spinner'));

const Index = () => {
  const router = useRouter();
  const { user } = useAuth();

  const getDefaultProps = async () => {
    if (user) {
      await router.push('/dashboard');
    } else {
      if(router.pathname === '/login' || router.pathname === '/') {
        await router.push('/login');
      }
    }
  };

  useEffect(() => {
    getDefaultProps();
    const handleRouteChangeComplete = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  useEffect(() => {
    getDefaultProps();
  }, [router]);

  return (
    <div className="h-screen w-screen">
      <div className="container mx-auto h-full">
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export default Index;
