import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from './PaymentProvider';

export function PaymentProcessingStep() {
  const { status } = usePayment();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') {
      navigate('/pagos/comprobante', { replace: true });
    } else if (status === 'error') {
      navigate('/pagos', { replace: true });
    }
  }, [status, navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <div className="spinner" style={{ width: '48px', height: '48px', border: '4px solid #f1f5f9', borderTopColor: '#e11d48', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1.5rem' }}></div>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Procesando pago...</h2>
      <p style={{ color: '#64748b' }}>Por favor, no cierres esta pantalla.</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
