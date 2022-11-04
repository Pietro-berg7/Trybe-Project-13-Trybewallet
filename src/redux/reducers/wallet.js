// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_REQUEST, SUBMIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCY_REQUEST:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case SUBMIT_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.payload,
        },
      ],
    };
  default:
    return state;
  }
}

export default wallet;
