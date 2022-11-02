// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCY_REQUEST:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  default:
    return state;
  }
}

export default wallet;
