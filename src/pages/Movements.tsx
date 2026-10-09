import { useState } from 'react'
import { useBanking } from '../app/bankingContext'
import { Icon } from '../components/Icon'
import { TransactionList } from '../components/TransactionList'
import { money, normalize } from '../utils/format'

export function Movements() {
  const { account, transactions } = useBanking()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const filtered = transactions.filter(
    (t) =>
      (filter === 'all' || t.kind === filter) &&
      normalize(`${t.name} ${t.detail}`).includes(normalize(query)),
  )
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">TU ACTIVIDAD</div>
          <h1>Mis movimientos</h1>
          <p>Consulta los ingresos, transferencias y pagos de tu cuenta.</p>
        </div>
        <div className="balance-badge">
          <span>Saldo disponible</span>
          <strong>{money(account.balance)}</strong>
        </div>
      </div>
      <section className="panel">
        <div className="filters">
          <div className="search-field">
            <label htmlFor="movement-search">Buscar movimiento</label>
            <div className="input-wrap">
              <Icon name="search" />
              <input
                id="movement-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nombre o descripción"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="movement-type">Tipo de movimiento</label>
            <select
              id="movement-type"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todos los movimientos</option>
              <option value="incoming">Ingresos</option>
              <option value="outgoing">Salidas: transferencias y pagos</option>
            </select>
          </div>
        </div>
        <div className="results-label" aria-live="polite">
          {filtered.length}{' '}
          {filtered.length === 1 ? 'movimiento' : 'movimientos'}
        </div>
        <TransactionList transactions={filtered} />
      </section>
    </div>
  )
}

