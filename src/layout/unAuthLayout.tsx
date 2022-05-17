import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '../context/authContext';
import { useModerator } from '../context/moderatorContext';
import { AppConfig } from '../utils/AppConfig';

const { secretKey } = AppConfig;

const unAuthLayout = (Page: any) => (props: any) => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { isLoading } = useModerator();

  useEffect(() => {
    const token = localStorage.getItem(secretKey);
    if (token && user) {
      (async () => {
        await router.push('/dashboard');
      })();
    }
  }, [router.events, user]);

  return (
    <div className="w-screen h-screen">
      <div className="h-2/4">
        <div className="w-full h-14 flex justify-center items-center bg-primary z-10">
          <h4 className="text-white tracking-widest uppercase mx-8 text-center">Welcome to your ADMIN PANEL</h4>
        </div>
        <div className="relative w-full bg-second">
          <div className={(loading || isLoading) ? 'w-full h-1.5 shim' : 'vw-full h-1.5'} />
        </div>
        <div className="img-back" />
      </div>
      <Page {...props} />
    </div>
  );
};

export default unAuthLayout;
