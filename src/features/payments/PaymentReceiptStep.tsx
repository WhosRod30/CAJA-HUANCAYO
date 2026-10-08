import { useNavigate } from 'react-router-dom';
import { usePayment } from './PaymentProvider';
import { Icon } from '../../components/Icon';
import { money } from '../../utils/format';

export function PaymentReceiptStep() {
  const { draft, receiptId, resetPayment } = usePayment();
  const navigate = useNavigate();

  const handleFinish = () => {
    resetPayment();
    navigate('/pagos', { replace: true });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: '64px', height: '64px', background: '#10b981', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <Icon name="check" size={32} />
      </div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>¡Pago Exitoso!</h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Tu pago se ha procesado correctamente.</p>

      <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ color: '#64748b' }}>Monto pagado</span>
          <strong style={{ fontSize: '1.1rem' }}>{money(draft.amount)}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ color: '#64748b' }}>Servicio</span>
          <strong>{draft.service?.name}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ color: '#64748b' }}>Suministro</span>
          <strong>{draft.supplyNumber}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748b' }}>N° Operación</span>
          <strong>{receiptId}</strong>
        </div>
      </div>

      <button
        onClick={handleFinish}
        className="button primary full-width"
        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: 'none', background: '#f1f5f9', color: '#0f172a', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1rem' }}
      >
        Realizar otro pago
      </button>
      <button
        onClick={() => navigate('/caja-virtual')}
        className="button secondary full-width"
        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'transparent', color: '#64748b', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer' }}
      >
        Ir a Inicio
      </button>
    </div>
  );
}
