// Coloque aqui suas actions
import requestCurrencies from '../../services/currencyAPI';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const CURRENCY_REQUEST = 'CURRENCY_REQUEST';
export const EXPENSE = 'EXPENSE';
export const SUBMIT_EXPENSE = 'SUBMIT_EXPENSE';
export const TOTAL_VALUE = 'TOTAL_VALUE';

export const submitUser = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const getCurrencies = (payload) => ({
  type: CURRENCY_REQUEST,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await requestCurrencies();
  delete response.USDT;
  dispatch(getCurrencies(response));
};

export const submitExpense = (payload) => ({
  type: SUBMIT_EXPENSE,
  payload,
});

export const totalValue = (payload) => ({
  type: TOTAL_VALUE,
  payload,
});
