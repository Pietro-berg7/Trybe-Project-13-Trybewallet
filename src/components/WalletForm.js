import React, { Component } from 'react';
import { func, array } from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, submitExpense } from '../redux/actions';
import requestCurrencies from '../services/currencyAPI';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
  };

  componentDidMount() {
    this.currencies();
  }

  currencies = async () => {
    const { getCurrencies } = this.props;
    await getCurrencies();
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
            type="number"
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
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
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
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transportes">Transporte</option>
            <option value="saude">Saúde</option>
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
});

WalletForm.propTypes = {
  currencies: array,
  getCurrencies: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
