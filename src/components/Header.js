import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;

    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p
          data-testid="total-field"
        >
          { total.toFixed(2) }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.totalExpenses,
});

Header.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
