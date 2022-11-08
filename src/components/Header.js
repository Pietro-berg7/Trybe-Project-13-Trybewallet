import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, element) => {
      const { value } = element;
      const ONE_THOUSAND = 1000;
      let sum = 0;
      if (element.currency === 'BTC') {
        sum = value * (element.exchangeRates[element.currency].ask * ONE_THOUSAND);
      } else {
        sum = value * element.exchangeRates[element.currency].ask;
      }
      acc += sum;
      return acc;
    }, 0);
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;

    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p
          data-testid="total-field"
        >
          { this.totalExpenses() }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  total: state.wallet.totalExpenses,
});

Header.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
