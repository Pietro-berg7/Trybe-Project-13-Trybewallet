import React, { Component } from 'react';
import { func, array } from 'prop-types';
import { connect } from 'react-redux';
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#named_import
import {
  fetchCurrencies, submitExpense, submitEdit as submitEditFunction,
} from '../redux/actions';
import requestCurrencies from '../services/currencyAPI';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    this.currencies();
  }

  currencies = async () => {
    const { getCurrencies } = this.props;
    await getCurrencies();
  };

  editExpenses = async () => {
    const { expenses, editId, submitEdit } = this.props;
    const arrToEdit = expenses.find((expense) => expense.id === editId);

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const arrEdit = {
      id: editId,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: arrToEdit.exchangeRates,
    };

    const deleteArrPosition = expenses.filter((expense) => expense.id !== editId);
    submitEdit(deleteArrPosition);
    const newExpenses = [...deleteArrPosition, arrEdit];
    submitEdit(newExpenses.sort((a, b) => a.id - b.id));
  };

  expenses = async () => {
    const { expense } = this.props;
    const response = await requestCurrencies();
    delete response.USDT;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const localState = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: response,
    };
    expense(localState);

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies, edit } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div>
        <label htmlFor="expense-value">
          <input
            data-testid="value-input"
            type="text"
            id="expense-value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="expense-description">
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="expense-description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currencies">
          <select
            data-testid="currency-input"
            name="currency"
            id="currencies"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((curr) => (
              <option key={ curr }>{ curr }</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        { edit
          ? (
            <button
              type="button"
              onClick={ () => {
                this.editExpenses();
              } }
            >
              Editar despesa
            </button>)
          : (
            <button
              type="button"
              onClick={ () => {
                this.expenses();
              } }
            >
              Adicionar despesa
            </button>
          ) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  edit: state.wallet.edit,
  editId: state.wallet.editId,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  expense: (state) => dispatch(submitExpense(state)),
  submitEdit: (newExpenses) => dispatch(submitEditFunction(newExpenses)),
});

WalletForm.propTypes = {
  currencies: array,
  getCurrencies: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
