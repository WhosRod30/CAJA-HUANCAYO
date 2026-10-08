import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from './PaymentProvider';

export function PaymentDetailStep() {
  const { draft, updateDraft } = usePayment();
  const [supply, setSupply] = useState(draft.supplyNumber);
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supply) return;
    updateDraft({ supplyNumber: supply });
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
      <div className="apf-improvement-panel" style={{ backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', borderLeft: '4px solid #0ea5e9' }}>
        <strong>✨ Mejora UX (APF2):</strong>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#0369a1' }}>
          <strong>Validación Progresiva:</strong> En lugar de pedir todos los datos de una vez, solicitamos primero el número de suministro para verificar la identidad antes de pedir el monto. Previene el error de equivocarse de cuenta (Heurística 5).
        </p>
      </div>

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
        disabled={!supply || supply.length < 5}
        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: 'none', background: '#e11d48', color: 'white', fontSize: '1rem', fontWeight: 600, cursor: supply.length >= 5 ? 'pointer' : 'not-allowed', opacity: supply.length >= 5 ? 1 : 0.5 }}
      >
        Continuar
      </button>
    </form>
  );
}
