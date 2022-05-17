import React from 'react';
import { AppProps } from 'next/app';
import { ToastContainer } from "react-toastify";

import AppProviders from '../context/AppProviders';

import '../styles/main.css';
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProviders>
      <Component {...pageProps} />
      <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          draggable={false}
          closeOnClick
          pauseOnHover
      />
    </AppProviders>
  );
};

export default MyApp;
