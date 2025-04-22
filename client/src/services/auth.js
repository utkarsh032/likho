import API from './api';

export const authService = {
  signin: (data) => API.post('/auth/signin', data),
};
