import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { submitUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    disabled: true,
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  validateForm = () => {
    const { email, password } = this.state;
    const SIX = 6;
    if (/\S+@\S+\.\S+/.test(email)
      && password.length >= SIX) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  // dispatchForm = () => {
  //   const { history, user } = this.props;
  //   const { email } = this.state;
  //   user(email);
  //   this.setState({
  //     email: '',
  //     password: '',
  //   });
  //   history.push('/carteira');
  // };

  render() {
    const { disabled, email, password } = this.state;
    const { history, user } = this.props;

    return (
      <div>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ () => {
            user(this.state);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

// https://redux.js.org/faq/design-decisions#why-doesnt-mapdispatchtoprops-allow-use-of-return-values-from-getstate-or-mapstatetoprops
const mapDispatchToProps = (dispatch) => ({
  user: (email) => dispatch(submitUser(email)),
});

Login.propTypes = {
  user: func,
}.isResquired;

export default connect(null, mapDispatchToProps)(Login);
