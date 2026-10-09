import { Link, useNavigate } from 'react-router-dom'
import { useBanking } from '../../app/bankingContext'
import { money, parseAmount } from '../../utils/format'
import { RecipientAvatar } from '../../components/RecipientAvatar'
import { Icon } from '../../components/Icon'
import { TransferFrame } from './TransferFrame'

export function ReviewStep() {
  const bank = useBanking()
  const navigate = useNavigate()
  const recipient = bank.draft.recipient!
  const amount = parseAmount(bank.draft.amount)!
  return (
    <TransferFrame
      step={3}
      title="Revisa tu transferencia"
      description="Comprueba los datos. Si necesitas cambiar algo, todavía estás a tiempo."
    >
      <div className="review-recipient">
        <RecipientAvatar recipient={recipient} />
        <div>
          <span>Enviarás a</span>
          <h3>{recipient.name}</h3>
          <p>
            {recipient.bank} · •••• {recipient.account.slice(-4)}
          </p>
        </div>
        <Link to="/transferencias/destinatario" className="text-link">
          Cambiar<span className="sr-only"> destinatario</span>
        </Link>
      </div>
      <dl className="summary-details">
        <div>
          <dt>Desde</dt>
          <dd>
            {bank.account.name}
            <small>Cuenta · •••• 1024</small>
          </dd>
        </div>
        <div>
          <dt>Monto</dt>
          <dd>
            {money(amount)}{' '}
            <Link to="/transferencias/monto" className="text-link">
              Editar<span className="sr-only"> monto</span>
            </Link>
          </dd>
        </div>
        <div>
          <dt>Comisión</dt>
          <dd>S/ 0.00</dd>
        </div>
        {bank.draft.note && (
          <div>
            <dt>Mensaje</dt>
            <dd>{bank.draft.note}</dd>
          </div>
        )}
        <div className="summary-total">
          <dt>Total a descontar</dt>
          <dd>{money(amount)}</dd>
        </div>
        <div className="summary-remaining">
          <dt>Tu saldo después</dt>
          <dd>{money(bank.account.balance - amount)}</dd>
        </div>
      </dl>
      <div className="form-footer review-footer">
        <Link className="button secondary" to="/transferencias/monto">
          <Icon name="back" size={17} />
          Volver
        </Link>
        <button
          className="button primary"
          onClick={() => {
            void bank.submitTransfer()
            navigate('/transferencias/procesando')
          }}
        >
          <Icon name="lock" size={17} /> Confirmar transferencia
        </button>
      </div>
    </TransferFrame>
  )
}
