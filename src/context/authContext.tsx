import React, { useEffect, useState } from 'react';

import Router, { useRouter } from 'next/router';

import { User, UserFullData } from '../interfaces/user';
import * as AuthApi from '../services/auth.service';
import * as UserApi from '../services/user.service';
import { AppConfig } from '../utils/AppConfig';

const { secretKey } = AppConfig;

const AuthContext = React.createContext({} as any);

function AuthProvider(props: any) {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [loading, setIsLoading] = useState<boolean>();

  const fetchCurrentUser = async () => {
    try {
      setIsLoading(true);
      const res = await UserApi.fetchCurrentUser();
      if (res) {
        setUser(res);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if(router.pathname === '/login' || router.pathname === '/') {
        await Router.push('/login');
      }
    }
  };

  useEffect(() => {
    (async () => {
      await fetchCurrentUser();
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await AuthApi.login({ email, password });
      if (res.accessToken) {
        localStorage.setItem(secretKey, res.accessToken);
      }
      if (res.user) {
        setUser(res.user);
        await Router.push('/dashboard');
      }
      setIsLoading(false);
      return res.user;
    } catch (err) {
      setIsLoading(false);
      return Promise.reject(err);
    }
  };

  const updateUser = async (values: any) => {
    try {
      if (user && user.id) {
        setIsLoading(true);
        const res = await UserApi.updateUser(user.id, values);
        if (res) {
          await fetchCurrentUser();
        }
        setIsLoading(false);
        return res;
      }
      return await Promise.reject('User does not exist.');
    } catch (err) {
      setIsLoading(false);
      return Promise.reject(err);
    }
  };

  const updateCodec = async(values: any) => {
    try {
      if(user && user.id) {
        setIsLoading(true);
        const res = await UserApi.updateCodec(user.id, values);
        if(res) {
          await fetchCurrentUser();
        }
        setIsLoading(false);
        return res;
      }
    } catch(err) {
      return Promise.reject(err)
    }
  }

  const updateUserPass = async(id: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await UserApi.updateUserPass(id, password);
      if(res) {
        setIsLoading(false);
      }
      return res;
    } catch(err) {
      setIsLoading(false);
      return Promise.reject(err);
    }
  }

  const logout = async () => {
    localStorage.removeItem(secretKey);
    await Router.push('/login');
  };

  const updateProfile = async (data: UserFullData) => {
    try {
      setIsLoading(true);

      const res = await UserApi.updateUser(user?.id || '', data);
      if (res) {
        await fetchCurrentUser();
      }
      setIsLoading(false);
      return res;
    } catch (err) {
      setIsLoading(false);
      return Promise.reject(err);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const res = await AuthApi.forgotPassword(email);
      setIsLoading(false);
      return res;
    } catch (err) {
      setIsLoading(false);
      return Promise.reject(err);
    }
  };

  const resetPassword = async (password: string) => {
    try {
      setIsLoading(true);

      const { token } = Router.query;

      const res = await AuthApi.resetPassword(user?.email, password, token);

      if (res.user) {
        setUser(res.user);
        await Router.push('/login');
      }
      if (res.accessToken) {
        localStorage.setItem(secretKey, res.accessToken);
      }
      setIsLoading(false);
      return res.user;
    } catch (err) {
      setIsLoading(false);
      return Promise.reject(err);
    }
  };

  const resetModeratorPass = async(password: string) => {
    try {
      setIsLoading(true);
      const { token } = Router.query;
      const res = await AuthApi.restModeratorPass(token, password);
      setIsLoading(false);
      return res;
    } catch(err) {
      setIsLoading(false);
      return Promise.reject(err);
    }
  }

  const verification = async () => {
    try {
      setIsLoading(true);

      const { token } = Router.query;

      const res = await AuthApi.verification(token);

      if (res.user) {
        setUser(res.user);
        await Router.push('/login');
      }
      if (res.accessToken) {
        localStorage.setItem(secretKey, res.accessToken);
      }
      setIsLoading(false);
      return res.user;
    } catch (err) {
      setIsLoading(false);
      return Promise.reject(err);
    }
  };

  const moderatorEmailVerify = async() => {
    try {
      setIsLoading(true);
      const { token } = Router.query;

      const res = await AuthApi.moderatorEmailVerify(token);
      if(res.success) {
        setIsLoading(false);
        window.open(process.env.GAGL_URL, '_blank');
      }
      return res;
    } catch(err) {
      setIsLoading(false);
      return Promise.reject(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        updateUser,
        updateProfile,
        forgotPassword,
        resetPassword,
        verification,
        resetModeratorPass,
        updateUserPass,
        moderatorEmailVerify,
        loading,
        updateCodec
      }}
      {...props}
    />
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
