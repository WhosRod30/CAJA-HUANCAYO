import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBanking } from '../../app/bankingContext'
import { amountError, money, parseAmount } from '../../utils/format'
import { Icon } from '../../components/Icon'
import { TransferFrame } from './TransferFrame'

export function AmountStep() {
  const bank = useBanking()
  const navigate = useNavigate()
  const [touched, setTouched] = useState(false)
  const error = amountError(bank.draft.amount, bank.account.balance)
  const amount = parseAmount(bank.draft.amount) ?? 0
  return (
    <TransferFrame
      step={2}
      title="¿Cuánto quieres enviar?"
      description={`Ingresa el monto que recibirá ${bank.draft.recipient?.name ?? 'tu destinatario'}.`}
    >
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          setTouched(true)
          if (!error) navigate('/transferencias/revisar')
        }}
      >
        <div className="field amount-field">
          <label htmlFor="transfer-amount">
            Monto a transferir{' '}
            <span className="required-label">Obligatorio</span>
          </label>
          <div className={`amount-input ${touched && error ? 'invalid' : ''}`}>
            <span aria-hidden="true">S/</span>
            <input
              id="transfer-amount"
              required
              inputMode="decimal"
              autoComplete="off"
              placeholder="0.00"
              value={bank.draft.amount}
              maxLength={12}
              onBlur={() => setTouched(true)}
              onChange={(e) => {
                bank.updateDraft({ amount: e.target.value })
                setTouched(true)
              }}
              aria-invalid={touched && !!error}
              aria-describedby={
                touched && error ? 'amount-error amount-hint' : 'amount-hint'
              }
            />
          </div>
          <span id="amount-hint" className="field-hint">
            Disponible: {money(bank.account.balance)} · Solo soles (PEN)
          </span>
          <div className="error-slot" aria-live="polite">
            {touched && error && (
              <p id="amount-error" className="field-error">
                <Icon name="info" size={15} />
                {error}
              </p>
            )}
          </div>
        </div>
        <div className="amount-presets" aria-label="Montos sugeridos">
          {[50, 100, 200, 500].map((value) => (
            <button
              type="button"
              key={value}
              className={amount === value * 100 ? 'chosen' : ''}
              disabled={value * 100 > bank.account.balance}
              onClick={() => {
                bank.updateDraft({ amount: String(value) })
                setTouched(true)
              }}
            >
              S/ {value}
            </button>
          ))}
        </div>
        <div className="field note-field">
          <label htmlFor="transfer-note">
            Mensaje <span className="optional">Opcional</span>
          </label>
          <input
            id="transfer-note"
            value={bank.draft.note}
            onChange={(e) => bank.updateDraft({ note: e.target.value })}
            maxLength={70}
            placeholder="Por ejemplo: almuerzo del sábado"
            aria-describedby="note-hint"
          />
          <span className="field-hint" id="note-hint">
            No incluyas información sensible.{' '}
            <span>{bank.draft.note.length}/70</span>
          </span>
        </div>
        <div className="cost-summary">
          <div>
            <span>Comisión</span>
            <strong>S/ 0.00</strong>
          </div>
          <div>
            <span>Total a descontar</span>
            <strong>{!error ? money(amount) : 'S/ 0.00'}</strong>
          </div>
        </div>
        <div className="form-footer">
          <span className="footer-security">
            <Icon name="shield" size={16} /> Revisarás todo antes de confirmar
          </span>
          <button className="button primary" disabled={!!error}>
            Revisar transferencia <Icon name="arrow" size={18} />
          </button>
        </div>
      </form>
    </TransferFrame>
  )
}
