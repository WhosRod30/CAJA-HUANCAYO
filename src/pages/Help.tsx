import { useBanking } from '../app/bankingContext'
import { Icon } from '../components/Icon'
import { Link } from 'react-router-dom'

export function Help() {
  const bank = useBanking()
  return (
    <div className="page help-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">TE ACOMPAÑAMOS</div>
          <h1>Centro de ayuda</h1>
          <p>Todo lo que necesitas para explorar esta experiencia.</p>
        </div>
      </div>
      <section className="panel help-panel">
        <h2>Una transferencia, paso a paso</h2>
        <ol className="help-steps">
          <li>
            <strong>Elige a quién enviar.</strong> Busca por nombre, celular o
            cuenta de ejemplo.
          </li>
          <li>
            <strong>Ingresa el monto.</strong> El saldo disponible te ayudará a
            decidir.
          </li>
          <li>
            <strong>Revisa y confirma.</strong> Puedes volver y corregir
            cualquier dato.
          </li>
          <li>
            <strong>Guarda tu comprobante.</strong> Al finalizar, podrás
            descargarlo.
          </li>
        </ol>
        <Link to="/transferencias" className="text-link">
          Ir a transferencias <Icon name="arrow" size={16} />
        </Link>
      </section>
      <section className="panel help-panel">
        <h2>Sobre este prototipo</h2>
        <p>
          Propuesta académica para el curso de Interacción Hombre-Máquina. No es
          una página oficial ni está afiliada a Caja Huancayo. Todas las
          personas, cuentas y operaciones mostradas son ficticias.
        </p>
        <p>
          Los cambios duran mientras esta pestaña permanezca abierta. Si
          recargas, la demostración vuelve a sus datos iniciales. Nunca ingreses
          información bancaria real.
        </p>
      </section>
      <section className="panel help-panel">
        <h2>Escenarios para explorar</h2>
        <p>
          Estos controles permiten probar cómo responde la interfaz ante
          distintas situaciones.
        </p>
        <label className="check-option">
          <input
            type="checkbox"
            checked={bank.failNext}
            onChange={(e) => bank.setFailNext(e.target.checked)}
            disabled={bank.status === 'pending'}
          />
          <span>
            <strong>Simular una interrupción</strong>
            <small>
              La próxima transferencia fallará una vez. Podrás reintentar sin
              perder los datos.
            </small>
          </span>
        </label>
        <div className="help-actions">
          <button className="button secondary" onClick={bank.clearFavorites}>
            Vaciar frecuentes
          </button>
          <button className="button secondary" onClick={bank.restoreFavorites}>
            Restaurar frecuentes
          </button>
        </div>
        <p className="field-hint" role="status">
          {bank.favorites.length} destinatarios frecuentes.{' '}
          {bank.failNext
            ? 'La próxima transferencia simulará un error.'
            : 'Las transferencias se procesarán normalmente.'}
        </p>
      </section>
    </div>
  )
}
