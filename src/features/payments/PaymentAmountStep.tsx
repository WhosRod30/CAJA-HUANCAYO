import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from './PaymentProvider';

export function PaymentAmountStep() {
  const { draft, updateDraft } = usePayment();
  const [amount, setAmount] = useState(draft.amount ? draft.amount.toString() : '');
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    updateDraft({ amount: num });
    navigate('/pagos/revisar');
  };

  return (
    <form onSubmit={handleNext}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Titular consultado:</p>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Juan Pérez (Suministro {draft.supplyNumber})</h2>
        <p style={{ color: '#0ea5e9', fontSize: '0.9rem', fontWeight: 500 }}>Identidad verificada exitosamente.</p>
      </div>

      <div className="field-group" style={{ marginBottom: '2rem' }}>
        <label htmlFor="amount" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, textAlign: 'center' }}>
          ¿Cuánto deseas pagar?
        </label>
        <div style={{ position: 'relative', maxWidth: '200px', margin: '0 auto' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: '#64748b' }}>S/</span>
          <input
            id="amount"
            type="number"
            step="0.01"
            style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', fontSize: '1.5rem', borderRadius: '12px', border: '2px solid #cbd5e1', textAlign: 'center', fontWeight: 600 }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            autoFocus
          />
        </div>
      </div>

      <button
        type="submit"
        className="button primary full-width"
        disabled={!amount || parseFloat(amount) <= 0}
        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: 'none', background: '#e11d48', color: 'white', fontSize: '1rem', fontWeight: 600, cursor: parseFloat(amount) > 0 ? 'pointer' : 'not-allowed', opacity: parseFloat(amount) > 0 ? 1 : 0.5 }}
      >
        Continuar
      </button>
    </form>
  );
}
