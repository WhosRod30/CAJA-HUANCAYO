import { demoRecipients } from '../mocks/recipients'
import { useNavigate } from 'react-router-dom'
import { useBanking } from '../app/bankingContext'
import { RecipientAvatar } from '../components/RecipientAvatar'
import { Icon } from '../components/Icon'

export function Recipients() {
  const bank = useBanking()
  const navigate = useNavigate()
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">SIEMPRE A LA MANO</div>
          <h1>Tus destinatarios</h1>
          <p>
            Marca tus frecuentes para encontrarlos más rápido al transferir.
          </p>
        </div>
      </div>
      <div className="recipient-directory">
        {demoRecipients.map((recipient) => (
          <article className="panel directory-card" key={recipient.id}>
            <div className="directory-top">
              <RecipientAvatar recipient={recipient} />
              <button
                className={`icon-button favorite-toggle ${bank.favorites.includes(recipient.id) ? 'is-favorite' : ''}`}
                onClick={() => bank.toggleFavorite(recipient.id)}
                aria-label={`${bank.favorites.includes(recipient.id) ? 'Quitar a' : 'Agregar a'} ${recipient.name} ${bank.favorites.includes(recipient.id) ? 'de' : 'a'} frecuentes`}
                aria-pressed={bank.favorites.includes(recipient.id)}
              >
                <Icon name="star" />
              </button>
            </div>
            <h2>{recipient.name}</h2>
            <p>{recipient.bank}</p>
            <dl className="directory-details">
              <div>
                <dt>Cuenta</dt>
                <dd>{recipient.account}</dd>
              </div>
              {recipient.phone && (
                <div>
                  <dt>Celular</dt>
                  <dd>{recipient.phone}</dd>
                </div>
              )}
            </dl>
            <button
              className="button secondary full-width"
              onClick={() => {
                if (bank.status !== 'pending') bank.beginTransfer(recipient)
                navigate(
                  bank.status === 'pending'
                    ? '/transferencias/procesando'
                    : '/transferencias/monto',
                )
              }}
            >
              Transferir <Icon name="arrow" size={17} />
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

