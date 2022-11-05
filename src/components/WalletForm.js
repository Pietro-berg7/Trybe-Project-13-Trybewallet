import React, { Component } from 'react';
import { func, array } from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, submitExpense, totalValue } from '../redux/actions';
import requestCurrencies from '../services/currencyAPI';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
    total: '',
  };

  componentDidMount() {
    this.currencies();
  }

  currencies = async () => {
    const { getCurrencies } = this.props;
    await getCurrencies();
  };

  expenses = async () => {
    const { expense, totalExpenses } = this.props;
    const response = await requestCurrencies();
    delete response.USDT;

    const {
      value,
      description,
      currency,
      method,
      tag,
      total,
    } = this.state;

    const { ask } = response[currency];
    const sum = Number(value) * Number(ask);
    const totalSum = Number(total) + sum;

    const localState = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: response,
    };
    expense(localState);

    const localStateTotal = {
      total: totalSum,
    };
    totalExpenses(localStateTotal);

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
    const { currencies } = this.props;
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
        <button
          type="button"
          onClick={ () => {
            this.expenses();
          } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  expense: (state) => dispatch(submitExpense(state)),
  totalExpenses: (state) => dispatch(totalValue(state)),
});

WalletForm.propTypes = {
  currencies: array,
  getCurrencies: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
