import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBanking } from '../../app/bankingContext'
import { demoRecipients } from '../../mocks/recipients'
import { Icon } from '../../components/Icon'
import { RecipientAvatar } from '../../components/RecipientAvatar'
import { normalize } from '../../utils/format'
import { TransferFrame } from './TransferFrame'

export function RecipientStep() {
  const bank = useBanking()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const normalized = normalize(query)
  const numberQuery = query.replace(/[\s-]/g, '')
  const results = demoRecipients.filter((r) =>
    normalized
      ? normalize(`${r.name} ${r.bank}`).includes(normalized) ||
        (numberQuery !== '' &&
          (r.account.includes(numberQuery) || r.phone.includes(numberQuery)))
      : showAll || bank.favorites.includes(r.id),
  )
  return (
    <TransferFrame
      step={1}
      title="¿A quién quieres transferir?"
      description="Busca a una persona o elige uno de tus destinatarios frecuentes."
    >
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          if (bank.draft.recipient) navigate('/transferencias/monto')
        }}
      >
        <div className="field">
          <label htmlFor="recipient-search">
            Nombre, celular o número de cuenta
          </label>
          <div className="input-wrap">
            <Icon name="search" />
            <input
              id="recipient-search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Por ejemplo, María Torres"
              aria-describedby="recipient-hint"
            />
            {query && (
              <button
                type="button"
                className="icon-button"
                onClick={() => setQuery('')}
                aria-label="Limpiar búsqueda"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </div>
          <span id="recipient-hint" className="field-hint">
            Busca por nombre, celular o cuenta.
          </span>
        </div>
        <div className="recipient-list-heading">
          <h3>
            {normalized
              ? 'Resultados de búsqueda'
              : showAll
                ? 'Destinatarios guardados'
                : 'Tus frecuentes'}
          </h3>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setShowAll(!showAll)
              setQuery('')
            }}
          >
            {showAll ? 'Ver frecuentes' : 'Ver todos'}
          </button>
        </div>
        <div className="sr-only" role="status">
          {results.length} destinatarios disponibles
        </div>
        {results.length ? (
          <fieldset className="recipient-options">
            <legend className="sr-only">Selecciona un destinatario</legend>
            {results.map((recipient) => (
              <label
                className={`recipient-option ${bank.draft.recipient?.id === recipient.id ? 'selected' : ''}`}
                key={recipient.id}
              >
                <input
                  type="radio"
                  required
                  name="recipient"
                  value={recipient.id}
                  checked={bank.draft.recipient?.id === recipient.id}
                  onChange={() => bank.selectRecipient(recipient)}
                />
                <RecipientAvatar recipient={recipient} />
                <span className="recipient-option-text">
                  <strong>
                    {recipient.name}
                    {recipient.own && (
                      <span className="own-label">Tu cuenta</span>
                    )}
                  </strong>
                  <span>
                    {recipient.bank} <span className="dot-separator">·</span>{' '}
                    •••• {recipient.account.slice(-4)}
                  </span>
                </span>
                <span className="radio-indicator" aria-hidden="true">
                  {bank.draft.recipient?.id === recipient.id && (
                    <Icon name="check" size={13} />
                  )}
                </span>
              </label>
            ))}
          </fieldset>
        ) : (
          <div className="empty-state">
            <Icon name={normalized ? 'search' : 'users'} size={32} />
            <h3>
              {normalized
                ? 'No encontramos ese destinatario'
                : 'No tienes destinatarios frecuentes'}
            </h3>
            <p>
              {normalized
                ? 'Revisa el nombre o el número de cuenta. Elige uno de los destinatarios disponibles.'
                : 'Puedes elegir uno de los destinatarios guardados para empezar.'}
            </p>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setQuery('')
                setShowAll(true)
              }}
            >
              Ver destinatarios guardados <Icon name="arrow" size={16} />
            </button>
          </div>
        )}
        <div className="form-footer">
          <p className="selection-hint" aria-live="polite">
            {bank.draft.recipient ? (
              <>
                Seleccionado: <strong>{bank.draft.recipient.name}</strong>
              </>
            ) : (
              'Selecciona un destinatario para continuar.'
            )}
          </p>
          <button className="button primary" disabled={!bank.draft.recipient}>
            Continuar <Icon name="arrow" size={18} />
          </button>
        </div>
      </form>
    </TransferFrame>
  )
}

