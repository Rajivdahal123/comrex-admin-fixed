import apiClient from './index';

export async function getModerators(page: number, perPage: number, search: string) {
  return apiClient
    .get(`/moderators?page=${page}&perPage=${perPage}&search=${search}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}

export async function createModerator(body: any) {
  return apiClient
    .post(`moderators`, body)
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}

export async function getModeratorById(id: string) {
  return apiClient
    .get(`moderators/${id}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}

export async function updateModerator(id: string, body: any) {
  return apiClient
    .put(`moderators/${id}`, body)
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}

export async function removeModerator(id: string) {
  return apiClient
    .delete(`moderators/${id}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject({ ...err }));
}

export async function updatePass(token: string, password: string) {
  return apiClient
    .post(`moderators/updatePass`, {token, password})
    .then((res) => res.data)
    .catch((err) => Promise.reject({...err}));
}

export async function resetPass(id: string) {
  return apiClient
    .post(`moderators/resetPass/${id}`)
    .then((res) =>  res.data)
    .catch((err) => Promise.reject({...err}))
}

