import { ReactNode } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { usePayment } from './PaymentProvider';
import { Icon } from '../../components/Icon';

export function PaymentFrame({ children, step }: { children: ReactNode; step: number }) {
  const { draft, status } = usePayment();

  if (!draft.service && status !== 'success') {
    return <Navigate to="/pagos" replace />;
  }

  return (
    <div className="flow-frame" style={{ maxWidth: '480px', margin: '0 auto', background: 'white', minHeight: '100vh' }}>
      <header className="flow-header" style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
        {status !== 'success' && status !== 'pending' && (
          <Link to={step === 1 ? '/pagos' : step === 2 ? '/pagos/detalle' : '/pagos/monto'} className="icon-button" aria-label="Volver">
            <Icon name="back" size={24} />
          </Link>
        )}
        <h1 style={{ margin: '0 auto', fontSize: '1.1rem', fontWeight: 600 }}>Pago de Servicio</h1>
        {status !== 'success' && status !== 'pending' && <div style={{ width: 44 }}></div>}
      </header>

      {status !== 'success' && status !== 'pending' && (
        <div className="progress-bar" style={{ height: '4px', background: '#f1f5f9', width: '100%' }}>
          <div
            className="progress-fill"
            style={{ height: '100%', background: '#e11d48', width: `${(step / 3) * 100}%`, transition: 'width 0.3s ease' }}
          />
        </div>
      )}

      <main style={{ padding: '1.5rem' }}>
        {children}
      </main>
    </div>
  );
}
