// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  CURRENCY_REQUEST,
  SUBMIT_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SUBMIT_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  editId: 0,
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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: true,
      editId: action.payload,
    };
  case SUBMIT_EDIT:
    return {
      ...state,
      expenses: action.payload,
      edit: false,
    };
  default:
    return state;
  }
}

export default wallet;
