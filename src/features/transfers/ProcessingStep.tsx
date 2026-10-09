import { Link, Navigate } from 'react-router-dom'
import { useBanking } from '../../app/bankingContext'
import { Icon } from '../../components/Icon'
import { money, parseAmount } from '../../utils/format'
import { Steps } from './TransferFrame'

export function ProcessingStep() {
  const bank = useBanking()
  if (bank.status === 'success' && bank.lastReceipt)
    return (
      <Navigate
        to={`/transferencias/comprobante/${bank.lastReceipt.id}`}
        replace
      />
    )
  if (bank.status === 'idle') return <Navigate to="/transferencias" replace />
  const failed = bank.status === 'error'
  return (
    <div className="page transfer-page">
      <div className="flow-title">
        <div className="eyebrow">NUEVA TRANSFERENCIA</div>
        <h1>{failed ? 'Puedes volver a intentarlo.' : 'Estamos en ello.'}</h1>
      </div>
      <Steps active={3} />
      <section className="panel processing-panel" aria-busy={!failed}>
        {failed ? (
          <>
            <span className="result-icon error">
              <Icon name="warning" size={35} />
            </span>
            <h2>No se completó la transferencia</h2>
            <p role="alert">{bank.error}</p>
            <div className="processing-actions">
              <button
                className="button primary"
                onClick={() => void bank.submitTransfer()}
              >
                Intentar nuevamente <Icon name="arrow" size={17} />
              </button>
              <Link to="/transferencias/revisar" className="button secondary">
                Revisar los datos
              </Link>
            </div>
          </>
        ) : (
          <>
            <span className="spinner" aria-hidden="true" />
            <div role="status">
              <h2>Estamos procesando tu transferencia…</h2>
              <p>
                {money(parseAmount(bank.draft.amount) ?? 0)} a{' '}
                {bank.draft.recipient?.name}
              </p>
              <span className="field-hint">
                Espera un momento. No necesitas volver a confirmar.
              </span>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
