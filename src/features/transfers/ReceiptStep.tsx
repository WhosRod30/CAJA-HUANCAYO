import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useBanking } from '../../app/bankingContext'
import { fullDate, money } from '../../utils/format'
import { Icon } from '../../components/Icon'
import { Steps } from './TransferFrame'

export function ReceiptStep() {
  const { id } = useParams()
  const bank = useBanking()
  const navigate = useNavigate()
  const [downloaded, setDownloaded] = useState(false)
  const receipt = bank.receipts.find((item) => item.id === id)
  if (!receipt)
    return (
      <div className="page">
        <section className="panel empty-state">
          <Icon name="receipt" size={36} />
          <h1>Este comprobante ya no está disponible</h1>
          <p>
            Los comprobantes se guardan durante esta sesión de demostración.
            Puedes realizar una nueva transferencia ficticia.
          </p>
          <Link to="/transferencias" className="button primary">
            Ir a transferencias
          </Link>
        </section>
      </div>
    )

  function download() {
    if (!receipt) return
    const text = [
      'CAJA HUANCAYO — PROTOTIPO ACADÉMICO — NO OFICIAL',
      'COMPROBANTE DE TRANSFERENCIA SIMULADA',
      '',
      `Operación: ${receipt.operation}`,
      `Fecha: ${fullDate(receipt.date)}`,
      `Destinatario ficticio: ${receipt.recipient.name}`,
      `Banco de ejemplo: ${receipt.recipient.bank}`,
      `Cuenta de ejemplo: ${receipt.recipient.account}`,
      `Monto: ${money(receipt.amount)}`,
      'Comisión de demostración: S/ 0.00',
      `Total: ${money(receipt.amount)}`,
      receipt.note ? `Mensaje: ${receipt.note}` : '',
      '',
      'Sin valor bancario. No acredita un movimiento de dinero real.',
    ].join('\n')
    const url = URL.createObjectURL(
      new Blob(['\uFEFF' + text], { type: 'text/plain;charset=utf-8' }),
    )
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `comprobante-${receipt.operation}.txt`
    anchor.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setDownloaded(true)
  }

  return (
    <div className="page receipt-page">
      <Steps active={4} />
      <section className="panel receipt-panel">
        <div className="receipt-header">
          <span className="result-icon success">
            <Icon name="check" size={34} />
          </span>
          <span className="eyebrow">¡TODO LISTO!</span>
          <h1>
            Transferencia realizada
            <br />
            correctamente.
          </h1>
          <p>Tu transferencia de demostración se completó.</p>
          <div className="receipt-amount">{money(receipt.amount)}</div>
          <span className="success-pill">
            <span /> Operación simulada exitosa
          </span>
        </div>
        <dl className="summary-details receipt-details">
          <div>
            <dt>Destinatario</dt>
            <dd>
              {receipt.recipient.name}
              <small>
                {receipt.recipient.bank} · ••••{' '}
                {receipt.recipient.account.slice(-4)}
              </small>
            </dd>
          </div>
          <div>
            <dt>Cuenta de origen</dt>
            <dd>Cuenta de Ahorros · •••• 1024</dd>
          </div>
          <div>
            <dt>Fecha y hora (Perú)</dt>
            <dd>{fullDate(receipt.date)}</dd>
          </div>
          <div>
            <dt>N.º de operación</dt>
            <dd className="operation-id">{receipt.operation}</dd>
          </div>
          <div>
            <dt>Comisión de demostración</dt>
            <dd>S/ 0.00</dd>
          </div>
          {receipt.note && (
            <div>
              <dt>Mensaje</dt>
              <dd>{receipt.note}</dd>
            </div>
          )}
          <div className="summary-total">
            <dt>Total transferido</dt>
            <dd>{money(receipt.amount)}</dd>
          </div>
        </dl>
        <div className="receipt-actions">
          <button className="button secondary full-width" onClick={download}>
            <Icon name="download" size={18} />
            Descargar comprobante
          </button>
          <p className="download-status" role="status">
            {downloaded
              ? 'La descarga del comprobante de ejemplo está preparada.'
              : 'Comprobante de ejemplo · Sin valor bancario'}
          </p>
        </div>
      </section>
      <div className="receipt-next">
        <button
          className="button primary"
          onClick={() => {
            bank.beginTransfer()
            navigate('/transferencias/destinatario')
          }}
        >
          Hacer otra transferencia <Icon name="plus" size={17} />
        </button>
        <Link to="/caja-virtual" className="text-link">
          Volver al inicio <Icon name="arrow" size={16} />
        </Link>
      </div>
    </div>
  )
}
