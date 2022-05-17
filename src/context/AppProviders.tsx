import React from 'react';

import { AuthProvider } from './authContext';
import { ModeratorProvider } from './moderatorContext';

function AppProviders({ children }: { children: JSX.Element[] | JSX.Element }) {
  return <AuthProvider><ModeratorProvider>{children}</ModeratorProvider></AuthProvider>;
}

export default AppProviders;
