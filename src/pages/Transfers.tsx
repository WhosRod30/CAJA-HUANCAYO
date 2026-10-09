import { demoRecipients } from '../mocks/recipients'
import { Link, useNavigate } from 'react-router-dom'
import { useBanking } from '../app/bankingContext'
import { Icon } from '../components/Icon'
import { RecipientAvatar } from '../components/RecipientAvatar'
import { TransactionList } from '../components/TransactionList'

export function Transfers() {
  const bank = useBanking()
  const navigate = useNavigate()
  const recipients = demoRecipients.filter((recipient) =>
    bank.favorites.includes(recipient.id),
  )
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">CERCA DE QUIENES IMPORTAN</div>
          <h1>Transferencias</h1>
          <p>
            Entre tus cuentas, a otra persona o a otro banco. Todo empieza aquí.
          </p>
        </div>
      </div>
      <section className="transfer-banner">
        <div>
          <span className="eyebrow">TÚ ELIGES A QUIÉN</span>
          <h2>Enviar dinero puede ser simple.</h2>
          <p>Busca un destinatario y nosotros te mostramos su banco.</p>
          <button
            className="button primary"
            onClick={() => {
              if (bank.status !== 'pending') bank.beginTransfer()
              navigate(
                bank.status === 'pending'
                  ? '/transferencias/procesando'
                  : '/transferencias/destinatario',
              )
            }}
          >
            Nueva transferencia <Icon name="plus" size={18} />
          </button>
        </div>
        <div className="transfer-art" aria-hidden="true">
          <div className="art-avatar first">TÚ</div>
          <div className="art-track">
            <Icon name="transfer" size={36} />
          </div>
          <div className="art-avatar second">
            <Icon name="users" size={29} />
          </div>
          <span>Un destino. Un camino más claro.</span>
        </div>
      </section>
      <section className="section-block">
        <div className="section-heading">
          <h2>Transfiere a tus frecuentes</h2>
          <Link className="text-link" to="/destinatarios">
            Administrar <Icon name="arrow" size={16} />
          </Link>
        </div>
        {recipients.length ? (
          <div className="recipient-tiles">
            {recipients.map((recipient) => (
              <button
                className="recipient-tile"
                key={recipient.id}
                onClick={() => {
                  if (bank.status !== 'pending') bank.beginTransfer(recipient)
                  navigate(
                    bank.status === 'pending'
                      ? '/transferencias/procesando'
                      : '/transferencias/monto',
                  )
                }}
              >
                <RecipientAvatar recipient={recipient} />
                <strong>{recipient.name}</strong>
                <span>
                  {recipient.bank} · •••• {recipient.account.slice(-4)}
                </span>
                <span className="text-link">
                  Transferir <Icon name="arrow" size={15} />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="panel empty-state">
            <Icon name="users" size={32} />
            <h3>No tienes destinatarios frecuentes</h3>
            <p>Puedes buscar uno al crear una nueva transferencia.</p>
          </div>
        )}
      </section>
      <section className="panel">
        <div className="panel-heading">
          <h2>Transferencias recientes</h2>
          <Link className="text-link" to="/movimientos">
            Ver movimientos <Icon name="arrow" size={16} />
          </Link>
        </div>
        <TransactionList
          transactions={bank.transactions
            .filter((t) => t.kind === 'outgoing')
            .slice(0, 4)}
        />
      </section>
    </div>
  )
}

