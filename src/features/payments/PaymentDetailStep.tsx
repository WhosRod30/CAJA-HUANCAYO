import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from './paymentContext';

export function PaymentDetailStep() {
  const { draft, updateDraft } = usePayment();
  const [supply, setSupply] = useState(draft.supplyNumber);
  const [touched, setTouched] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const valid = /^\d{5,20}$/.test(supply.trim());
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) { input.current?.focus(); return; }
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
    <form noValidate onSubmit={handleNext}>


      <div style={{ marginBottom: '2rem' }}>
        <h2 data-step-heading style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{draft.service?.name}</h2>
        <p style={{ color: '#64748b' }}>Ingresa el número de suministro o identificador para consultar la deuda.</p>
      </div>

      <div className="field-group" style={{ marginBottom: '2rem' }}>
        <label htmlFor="supplyNumber" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          Número de Suministro / DNI
        </label>
        <input
          ref={input}
          id="supplyNumber"
          type="text"
          inputMode="numeric"
          maxLength={20}
          aria-invalid={touched && !valid}
          aria-describedby="supply-hint supply-error"
          required
          className="text-input"
          style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
          value={supply}
          onChange={(e) => { setSupply(e.target.value); setTouched(true); }}
          onBlur={() => setTouched(true)}
          placeholder="Ej: 12345678"
        />
        <p id="supply-hint" className="field-hint">Obligatorio. Escribe entre 5 y 20 números, sin letras ni espacios.</p>
        <p id="supply-error" className="field-error" aria-live="polite">{touched && !valid ? 'No podemos continuar: el suministro debe tener de 5 a 20 dígitos. Revisa el número de tu recibo y vuelve a intentarlo.' : ''}</p>
      </div>

      <button
        type="submit"
        className="button primary full-width"
      >
        Continuar
      </button>
    </form>
  );
}


