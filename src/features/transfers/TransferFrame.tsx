import type { ReactNode } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useBanking } from '../../app/bankingContext'
import { Icon } from '../../components/Icon'
import { RecipientAvatar } from '../../components/RecipientAvatar'
import { amountError, money } from '../../utils/format'

export function TransferGuard({
  children,
  step,
}: {
  children: ReactNode
  step: number
}) {
  const bank = useBanking()
  if (bank.status === 'pending')
    return <Navigate to="/transferencias/procesando" replace />
  if (bank.status === 'success' && bank.lastReceipt)
    return (
      <Navigate
        to={`/transferencias/comprobante/${bank.lastReceipt.id}`}
        replace
      />
    )
  if (!bank.draft.id) return <Navigate to="/transferencias" replace />
  if (step > 1 && !bank.draft.recipient)
    return <Navigate to="/transferencias/destinatario" replace />
  if (step > 2 && amountError(bank.draft.amount, bank.account.balance))
    return <Navigate to="/transferencias/monto" replace />
  return children
}

export function Steps({ active }: { active: number }) {
  return (
    <ol className="step-indicator" aria-label="Progreso de la transferencia">
      {['Destinatario', 'Monto', 'Revisión', 'Comprobante'].map((label, i) => (
        <li
          key={label}
          className={
            i + 1 === active ? 'current' : i + 1 < active ? 'complete' : ''
          }
          aria-current={i + 1 === active ? 'step' : undefined}
        >
          <span className="step-number">
            {i + 1 < active ? <Icon name="check" size={16} /> : i + 1}
          </span>
          <span>{label}</span>
        </li>
      ))}
    </ol>
  )
}

export function TransferFrame({
  step,
  title,
  description,
  children,
}: {
  step: number
  title: string
  description: string
  children: ReactNode
}) {
  const { account, draft } = useBanking()
  const back =
    step === 1
      ? '/transferencias'
      : step === 2
        ? '/transferencias/destinatario'
        : '/transferencias/monto'
  return (
    <div className="page transfer-page">
      <Link className="back-link" to={back}>
        <Icon name="back" size={17} />
        {step === 1 ? 'Volver a transferencias' : 'Volver al paso anterior'}
      </Link>
      <div className="flow-title">
        <div className="eyebrow">NUEVA TRANSFERENCIA</div>
        <h1>Un paso más cerca.</h1>
      </div>
      <Steps active={step} />
      <div className="flow-grid">
        <section className="panel flow-panel">
          <div className="flow-panel-heading">
            <span className="step-caption">PASO {step} DE 4</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          {children}
        </section>
        <aside className="flow-aside">
          <section className="panel origin-card">
            <span className="icon-tile red-soft">
              <Icon name="wallet" />
            </span>
            <h2>Desde tu cuenta</h2>
            <strong>{account.name}</strong>
            <p>Cuenta · •••• 1024</p>
            <div className="origin-balance">
              <span>Saldo disponible</span>
              <strong>{money(account.balance)}</strong>
            </div>
            {draft.recipient && step > 1 && (
              <div className="aside-recipient">
                <span>Tu destinatario</span>
                <div>
                  <RecipientAvatar recipient={draft.recipient} small />
                  <p>
                    <strong>{draft.recipient.name}</strong>
                    <small>{draft.recipient.bank}</small>
                  </p>
                </div>
              </div>
            )}
          </section>
          <div className="flow-advice">
            <Icon name="shield" size={23} />
            <h3>Con calma y con confianza</h3>
            <p>
              Revisarás todos los datos antes de confirmar. Puedes volver al
              paso anterior cuando lo necesites.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
