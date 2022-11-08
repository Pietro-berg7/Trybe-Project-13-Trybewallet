import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleRemove = ({ target: { name } }) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== Number(name));
    dispatch(deleteExpense(newExpenses));
  };

  render() {
    const { expenses, dispatch } = this.props;
    const ONE_THOUSAND = 1000;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  {
                    (expense.currency === 'BTC')
                      ? ((
                        Number(expense.exchangeRates[expense.currency]
                          .ask)) * ONE_THOUSAND)
                        .toFixed(2)
                      : (
                        Number(expense.exchangeRates[expense.currency].ask).toFixed(2))
                  }
                </td>
                <td>
                  {
                    (expense.currency === 'BTC')
                      ? ((
                        Number(expense.value)
                        * Number(expense.exchangeRates[expense.currency]
                          .ask)) * ONE_THOUSAND)
                        .toFixed(2)
                      : (
                        Number(expense.value)
                        * Number(expense.exchangeRates[expense.currency].ask))
                        .toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    name={ expense.id }
                    onClick={ () => {
                      dispatch(editExpense(expense.id));
                    } }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    name={ expense.id }
                    onClick={ this.handleRemove }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpenses,
});

Table.propTypes = {
  expenses: array,
}.isRequired;

export default connect(mapStateToProps)(Table);
