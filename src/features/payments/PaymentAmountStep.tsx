import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePayment } from './paymentContext'
import { useBanking } from '../../app/bankingContext'
import { amountError, money, parseAmount } from '../../utils/format'

export function PaymentAmountStep() {
  const { draft, updateDraft } = usePayment()
  const { account } = useBanking()
  const [amount, setAmount] = useState(draft.amount ? String(draft.amount) : '')
  const [touched, setTouched] = useState(false)
  const navigate = useNavigate()
  const error = amountError(amount, account.balance)
  return <form noValidate onSubmit={(event) => {
    event.preventDefault(); setTouched(true)
    const cents = parseAmount(amount)
    if (error || cents === null) return
    updateDraft({ amount: cents / 100 }); navigate('/pagos/revisar')
  }}>
    <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Monto del pago</h2>
    <p>Servicio: {draft.service?.name}</p>
    <p className="field-hint">Suministro: {draft.supplyNumber}</p>
    <div className="field" style={{ margin: '2rem 0' }}>
      <label htmlFor="payment-amount">Monto en soles</label>
      <input id="payment-amount" inputMode="decimal" value={amount} maxLength={12} placeholder="50.00" onBlur={() => setTouched(true)} onChange={(event) => { setAmount(event.target.value); setTouched(true) }} aria-invalid={touched && !!error} aria-describedby="payment-available payment-amount-error" required />
      <p id="payment-available" className="field-hint">Saldo disponible: {money(account.balance)}</p>
      <p id="payment-amount-error" className="field-error" aria-live="polite">{touched ? error : ''}</p>
    </div>
    <button type="submit" className="button primary full-width">Continuar</button>
  </form>
}
