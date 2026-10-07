import type { Transaction } from '../types/banking'
import { money, shortDate } from '../utils/format'
import { Icon } from './Icon'

export function TransactionList({
  transactions,
}: {
  transactions: Transaction[]
}) {
  if (!transactions.length)
    return (
      <div className="empty-state">
        <Icon name="history" size={32} />
        <h3>No encontramos movimientos</h3>
        <p>Prueba con otro nombre o cambia el filtro.</p>
      </div>
    )
  return (
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <span className={`transaction-icon ${transaction.kind}`}>
            <Icon name={transaction.kind} />
          </span>
          <div className="transaction-copy">
            <strong>{transaction.name}</strong>
            <span>{transaction.detail}</span>
          </div>
          <div className="transaction-value">
            <strong
              className={transaction.kind === 'incoming' ? 'positive' : ''}
            >
              {transaction.kind === 'incoming' ? '+' : '−'}{' '}
              {money(transaction.amount)}
            </strong>
            <time dateTime={transaction.date}>
              {shortDate(transaction.date)}
            </time>
          </div>
        </li>
      ))}
    </ul>
  )
}
