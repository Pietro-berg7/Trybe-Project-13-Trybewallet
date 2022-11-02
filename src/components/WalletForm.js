import React, { Component } from 'react';
import { func, array } from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    this.currencies();
  }

  currencies = async () => {
    const { getCurrencies } = this.props;
    await getCurrencies();
  };

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <label htmlFor="expense-value">
          <input
            data-testid="value-input"
            type="number"
            id="expense-value"
          />
        </label>
        <label htmlFor="expense-description">
          <input
            data-testid="description-input"
            type="text"
            name=""
            id="expense-description"
          />
        </label>
        <label htmlFor="currencies">
          <select
            data-testid="currency-input"
            name=""
            id="currencies"
          >
            { currencies.map((currency) => (
              <option key={ currency }>{ currency }</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          <select
            data-testid="method-input"
            name=""
            id="method"
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="expense">
          <select
            data-testid="tag-input"
            name=""
            id="expense"
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transportes">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

WalletForm.propTypes = {
  currencies: array,
  getCurrencies: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
