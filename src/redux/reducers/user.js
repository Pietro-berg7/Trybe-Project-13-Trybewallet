// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_REQUEST } from '../actions';

const INITIAL_STATE = {
  user: {},
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default user;
