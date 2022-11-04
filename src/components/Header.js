import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenses = () => {

  };

  render() {
    const { email } = this.props;

    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.totalExpenses() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
