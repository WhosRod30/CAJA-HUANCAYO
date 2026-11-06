import type { ReactNode } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { usePayment } from './paymentContext';
import { parseAmount } from '../../utils/format';
import { Icon } from '../../components/Icon';

export function PaymentFrame({ children, step }: { children: ReactNode; step: number }) {
  const { draft, status, receipt } = usePayment();

  if (status === 'pending' && step !== 4) return <Navigate to="/pagos/procesando" replace />;
  if (status === 'success' && receipt && step !== 5) return <Navigate to="/pagos/comprobante" replace />;
  if (!draft.service) return <Navigate to="/pagos" replace />;
  if (step > 1 && !/^\d{5,20}$/.test(draft.supplyNumber.trim())) return <Navigate to="/pagos/detalle" replace />;
  if (step > 2 && (parseAmount(String(draft.amount)) ?? 0) <= 0) return <Navigate to={draft.service.requiresAmount ? '/pagos/monto' : '/pagos/detalle'} replace />;
  if (step === 4 && status === 'idle') return <Navigate to="/pagos/revisar" replace />;
  if (step === 5 && (status !== 'success' || !receipt)) return <Navigate to={status === 'error' ? '/pagos/procesando' : '/pagos/revisar'} replace />;
  return (
    <div className="payment-flow">
      <header className="flow-header" style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
        {status !== 'success' && status !== 'pending' && (
          <Link to={step === 1 ? '/pagos' : step === 2 || !draft.service.requiresAmount ? '/pagos/detalle' : '/pagos/monto'} className="icon-button" aria-label="Volver">
            <Icon name="back" size={24} />
          </Link>
        )}
        <h1 style={{ margin: '0 auto', fontSize: '1.1rem', fontWeight: 600 }}>Pago de Servicio</h1>
        {status !== 'success' && status !== 'pending' && <div style={{ width: 44 }}></div>}
      </header>

      <ol className="step-indicator" aria-label="Progreso del pago">{(draft.service.requiresAmount ? ['Suministro', 'Monto', 'Revisión', 'Comprobante'] : ['Suministro', 'Revisión', 'Comprobante']).map((label, index) => {
        const active = step === 1 ? 'Suministro' : step === 2 ? 'Monto' : step < 5 ? 'Revisión' : 'Comprobante';
        return <li key={label} className={label === active ? 'current' : ''} aria-current={label === active ? 'step' : undefined}><span className="step-number" aria-hidden="true">{index + 1}</span><span>{label}</span></li>;
      })}</ol>

      <section aria-label="Datos del pago">
        {children}
      </section>
    </div>
  );
}


