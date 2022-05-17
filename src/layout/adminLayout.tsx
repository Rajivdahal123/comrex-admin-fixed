import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import Header from '../components/Header/Header';
import { useAuth } from '../context/authContext';
import { AppConfig } from '../utils/AppConfig';

const { secretKey } = AppConfig;

const withLayout = (Page: any) => (props: any) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem(secretKey);
    if (!token) {
      router.push('/login');
    }
  }, [router.events, user]);

  return (
    <div className="w-screen h-screen bg-background font-regularHN">
      <Header />
      <Page {...props} />
    </div>
  );
};

export default withLayout;
