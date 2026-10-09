import { Link, Navigate } from 'react-router-dom'
import { usePayment } from './paymentContext'
export function PaymentProcessingStep() {
  const { status, error, submitPayment } = usePayment()
  if (status === 'success') return <Navigate to="/pagos/comprobante" replace />
  if (status === 'idle') return <Navigate to="/pagos/revisar" replace />
  return <section style={{ minHeight: '40vh', textAlign: 'center', padding: '2rem 0' }} aria-busy={status === 'pending'}>
    {status === 'error' ? <>
      <h2>No se completó el pago</h2>
      <p role="alert" className="field-error" style={{ margin: '1rem 0' }}>{error}</p>
      <p className="field-hint">No se registró un cargo por esta operación.</p>
      <div className="processing-actions"><button className="button primary" onClick={() => void submitPayment()}>Intentar nuevamente</button><Link className="button secondary" to="/pagos/revisar">Revisar datos</Link></div>
    </> : <div role="status"><span className="spinner" aria-hidden="true" /><h2 style={{ marginTop: '1.5rem' }}>Procesando pago…</h2><p className="field-hint">Espera un momento. No necesitas volver a confirmar.</p></div>}
  </section>
}
