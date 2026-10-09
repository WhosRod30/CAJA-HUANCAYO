import { demoRecipients } from '../mocks/recipients'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBanking } from '../app/bankingContext'
import { Icon } from '../components/Icon'
import { RecipientAvatar } from '../components/RecipientAvatar'
import { TransactionList } from '../components/TransactionList'
import { money } from '../utils/format'

export function Dashboard() {
  const { account, transactions, favorites, beginTransfer, status } =
    useBanking()
  const [visible, setVisible] = useState(true)
  const navigate = useNavigate()
  const recipients = demoRecipients.filter((recipient) =>
    favorites.includes(recipient.id),
  )
  const date = new Intl.DateTimeFormat('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Lima',
  }).format(new Date())

  return (
    <div className="page dashboard">
      <div className="page-heading">
        <div>
          <div className="eyebrow">TU DÍA, MÁS SIMPLE</div>
          <h1>
            Hola, Valeria <span className="greeting-dot">.</span>
          </h1>
          <p>Qué bueno tenerte aquí. Este es el resumen de tu cuenta.</p>
        </div>
        <span className="today">
          <Icon name="calendar" size={17} />
          {date}
        </span>
      </div>
      <div className="overview-grid">
        <section className="account-card" aria-label="Resumen de cuenta">
          <div className="account-top">
            <span className="account-symbol">
              <Icon name="wallet" size={23} />
            </span>
            <span>MI CUENTA EN SOLES</span>
            <span className="account-currency">PEN</span>
          </div>
          <div className="balance-label">
            Saldo disponible
            <button
              className="icon-button on-red"
              onClick={() => setVisible(!visible)}
              aria-label={visible ? 'Ocultar saldo' : 'Mostrar saldo'}
              aria-pressed={!visible}
            >
              <Icon name={visible ? 'eye' : 'eyeOff'} size={18} />
            </button>
          </div>
          <div className="balance" aria-live="polite">
            {visible ? money(account.balance) : 'S/ ••••••'}
          </div>
          <div className="account-bottom">
            <div>
              <strong>{account.name}</strong>
              <span>Cuenta · •••• 1024</span>
            </div>
            <Link
              to="/movimientos"
              aria-label="Ver movimientos de Cuenta de Ahorros"
              className="account-link"
            >
              <Icon name="arrow" />
            </Link>
          </div>
        </section>
        <section className="quick-transfer-card">
          <div className="quick-transfer-top">
            <span className="icon-tile red-soft">
              <Icon name="transfer" size={26} />
            </span>
            <span className="pill">Fácil y paso a paso</span>
          </div>
          <h2>
            Tu próxima transferencia,
            <br />a un paso.
          </h2>
          <p>
            Elige a quién enviar, indica el monto y revisa antes de confirmar.
          </p>
          <button
            className="button primary"
            onClick={() => {
              if (status !== 'pending') beginTransfer()
              navigate(
                status === 'pending'
                  ? '/transferencias/procesando'
                  : '/transferencias/destinatario',
              )
            }}
          >
            Transferir dinero <Icon name="arrow" size={18} />
          </button>
        </section>
      </div>
      <div className="section-heading">
        <h2>Tus operaciones</h2>
        <span>Todo a la mano</span>
      </div>
      <div className="shortcut-grid">
        <Link to="/pagos" className="shortcut">
          <span className="icon-tile red-soft">
            <Icon name="receipt" />
          </span>
          <div>
            <strong>Pagar servicios</strong>
            <span>Agua, luz y más</span>
          </div>
          <Icon name="chevron" size={18} />
        </Link>
        <Link to="/transferencias" className="shortcut">
          <span className="icon-tile red-soft">
            <Icon name="transfer" />
          </span>
          <div>
            <strong>Transferencias</strong>
            <span>Envía dinero a quien quieras</span>
          </div>
          <Icon name="chevron" size={18} />
        </Link>
        <Link to="/movimientos" className="shortcut">
          <span className="icon-tile neutral">
            <Icon name="history" />
          </span>
          <div>
            <strong>Mis movimientos</strong>
            <span>Revisa tus últimas operaciones</span>
          </div>
          <Icon name="chevron" size={18} />
        </Link>
        <Link to="/destinatarios" className="shortcut">
          <span className="icon-tile neutral">
            <Icon name="users" />
          </span>
          <div>
            <strong>Destinatarios</strong>
            <span>Ten cerca a tus frecuentes</span>
          </div>
          <Icon name="chevron" size={18} />
        </Link>
      </div>
      <div className="dashboard-bottom">
        <section className="panel activity-panel">
          <div className="panel-heading">
            <h2>Últimos movimientos</h2>
            <Link className="text-link" to="/movimientos">
              Ver todos <Icon name="arrow" size={16} />
            </Link>
          </div>
          <TransactionList transactions={transactions.slice(0, 4)} />
        </section>
        <section className="panel favorites-panel">
          <div className="panel-heading">
            <h2>Tus frecuentes</h2>
            <Icon name="star" size={19} />
          </div>
          <p className="panel-intro">Menos búsquedas, más tiempo para ti.</p>
          {recipients.length ? (
            <div className="favorite-list">
              {recipients.slice(0, 3).map((recipient) => (
                <button
                  key={recipient.id}
                  className="favorite-row"
                  onClick={() => {
                    if (status !== 'pending') beginTransfer(recipient)
                    navigate(
                      status === 'pending'
                        ? '/transferencias/procesando'
                        : '/transferencias/monto',
                    )
                  }}
                >
                  <RecipientAvatar recipient={recipient} small />
                  <span>
                    <strong>{recipient.name}</strong>
                    <small>{recipient.bank}</small>
                  </span>
                  <Icon name="chevron" size={16} />
                </button>
              ))}
            </div>
          ) : (
            <div className="compact-empty">
              <Icon name="users" />
              <p>Aún no tienes destinatarios frecuentes.</p>
            </div>
          )}
          <Link to="/destinatarios" className="button secondary full-width">
            <Icon name="users" size={17} /> Ver destinatarios
          </Link>
        </section>
      </div>
      <div className="trust-strip">
        <Icon name="shield" size={22} />
        <div>
          <strong>Antes de confirmar, revisa con calma.</strong>
          <span>
            Siempre podrás comprobar el destinatario y el monto de tu
            transferencia.
          </span>
        </div>
        <span className="trust-caption">Tú tienes el control</span>
      </div>
    </div>
  )
}

