// Coloque aqui suas actions
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const submitUser = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});
