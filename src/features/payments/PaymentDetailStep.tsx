import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from './paymentContext';

export function PaymentDetailStep() {
  const { draft, updateDraft } = usePayment();
  const [supply, setSupply] = useState(draft.supplyNumber);
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5,20}$/.test(supply.trim())) return;
    updateDraft({ supplyNumber: supply.trim() });
    if (draft.service?.requiresAmount) {
      navigate('/pagos/monto');
    } else {
      // Si no requiere monto, saltamos a revisar con monto fijo
      updateDraft({ amount: 50.0 }); // Monto simulado
      navigate('/pagos/revisar');
    }
  };

  return (
    <form onSubmit={handleNext}>


      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{draft.service?.name}</h2>
        <p style={{ color: '#64748b' }}>Ingresa el número de suministro o identificador para consultar la deuda.</p>
      </div>

      <div className="field-group" style={{ marginBottom: '2rem' }}>
        <label htmlFor="supplyNumber" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          Número de Suministro / DNI
        </label>
        <input
          id="supplyNumber"
          type="text"
          inputMode="numeric"
          maxLength={20}
          className="text-input"
          style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
          value={supply}
          onChange={(e) => setSupply(e.target.value)}
          placeholder="Ej: 12345678"
          autoFocus
        />
      </div>

      <button
        type="submit"
        className="button primary full-width"
        disabled={!/^\d{5,20}$/.test(supply.trim())}
        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: 'none', background: '#e11d48', color: 'white', fontSize: '1rem', fontWeight: 600, cursor: supply.length >= 5 ? 'pointer' : 'not-allowed', opacity: supply.length >= 5 ? 1 : 0.5 }}
      >
        Continuar
      </button>
    </form>
  );
}


