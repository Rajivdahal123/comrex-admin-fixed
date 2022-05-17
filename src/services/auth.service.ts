import { RegisterRequest } from '../interfaces/user';
import apiClient from './index';

export async function login(data: { email: string; password: string }) {
  return apiClient
    .post(`auth/login`, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}

export async function register(data: RegisterRequest) {
  return apiClient
    .post(`auth/register`, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}

export async function forgotPassword(email: string) {
  return apiClient
    .post(`auth/forgot_password`, { email })
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}

export async function resetPassword(
  email: string | undefined,
  password: string,
  token: string | string[] | undefined
) {
  return apiClient
    .post(`auth/reset_password`, { email, password, token })
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}

export async function verification(
    token: string | string[] | undefined
) {
  return apiClient
      .post(`auth/verification`, { token })
      .then((res) => res.data)
      .catch((err) => Promise.reject({ ...err }));
}

export async function moderatorEmailVerify(token: string | string[] | undefined) {
  return apiClient
    .post(`auth/moderatorVerify`, {token})
    .then((res) => res.data)
    .catch((err) => Promise.reject({...err}));
}

export async function acceptInvite(token: string | string[] | undefined, status: string) {
  return apiClient
    .post(`auth/invitation`, {token, status})
    .then((res) => res.data)
    .catch((err) => Promise.reject({...err}));
}

export async function moderatorChangePass(id: string, oldPass: string, newPass: string) {
  return apiClient
    .post(`auth/moderatorChangePass/${id}`, {oldPass, newPass})
    .then((res) =>  res.data)
    .catch((err) => Promise.reject({...err}));
}

export async function restModeratorPass(token: string | string[] | undefined, password: string) {
  return apiClient
    .post('auth/moderatorResetPass', {token, password})
    .then((res) => res.data)
    .catch((err) => Promise.reject({...err}))
}

export async function setupAccountPass(id: string | string[] | undefined, password: string) {
  return apiClient
  .post('auth/setupAccountPass', {id, password})
  .then((res) => res.data)
  .catch((err) => Promise.reject({...err})) 
}
