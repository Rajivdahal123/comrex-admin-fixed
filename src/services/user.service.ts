import apiClient from './index';

export async function fetchCurrentUser() {
  return apiClient
    .get(`users/current`)
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}

export async function updateUser(id: string, body: any) {
  const user = new FormData();
  user.append('username', body.username);
  user.append('firstName', body.firstName);
  user.append('lastName', body.lastName);
  user.append('email', body.email);
  user.append('avatar', body.avatar);

  return apiClient
    .put(`users/${id}`, user, {
      headers: {
        responseType: 'blob',
      },
      timeout: 20000000,
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}


export async function updateCodec(id: string, body: any) {
  return apiClient
    .post(`users/updateCodec/${id}`, body)
    .then((res) => res.data)
    .catch((err) => Promise.reject({...err}))
}

export async function updateUserPass(id: string, newPass: string) {
  return apiClient
    .post(`users/updatePassword/${id}`, {password: newPass})
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}