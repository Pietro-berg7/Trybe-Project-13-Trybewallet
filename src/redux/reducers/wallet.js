// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_REQUEST, SUBMIT_EXPENSE, TOTAL_VALUE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
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
  case TOTAL_VALUE:
    return {
      ...state,
      totalExpenses: state.totalExpenses + action.payload.total,
    };
  default:
    return state;
  }
}

export default wallet;
