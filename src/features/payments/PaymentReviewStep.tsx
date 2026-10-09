import { useNavigate } from 'react-router-dom';
import { usePayment } from './paymentContext';
import { useBanking } from '../../app/bankingContext';
import { money, amountError } from '../../utils/format';

export function PaymentReviewStep() {
  const { draft, submitPayment, status } = usePayment();
  const navigate = useNavigate();
  const { account } = useBanking();
  const validation = amountError(String(draft.amount), account.balance);

  const handleConfirm = () => {
    if (validation) return;
    void submitPayment();
    navigate('/pagos/procesando');
  };

  return (
    <div>


      <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Revisa tu pago</h2>

      <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ color: '#64748b' }}>Servicio</span>
          <strong style={{ textAlign: 'right' }}>{draft.service?.name}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ color: '#64748b' }}>Suministro</span>
          <strong style={{ textAlign: 'right' }}>{draft.supplyNumber}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ color: '#64748b' }}>Titular</span>
          <strong style={{ textAlign: 'right' }}>J*** P***</strong>
        </div>
        <div style={{ height: '1px', background: '#e2e8f0', margin: '1rem 0' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#64748b', fontSize: '1.1rem' }}>Monto a pagar</span>
          <strong style={{ fontSize: '1.5rem', color: '#0f172a' }}>{money(Math.round(draft.amount * 100))}</strong>
        </div>
      </div>

      <p className="field-error" role="alert">{validation}</p>
      <p className="field-hint" style={{ marginBottom: '1rem' }}>Saldo disponible: {money(account.balance)}</p>
      <button
        disabled={status === 'pending' || !!validation}
        onClick={handleConfirm}
        className="button primary full-width"
        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: 'none', background: '#e11d48', color: 'white', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer' }}
      >
        Confirmar Pago
      </button>
    </div>
  );
}




