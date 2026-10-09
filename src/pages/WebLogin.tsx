import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useWebSession } from '../app/webSessionContext'
import { Icon } from '../components/Icon'
import './WebLogin.css'

const demoCodes = ['CAJA27', 'SOL438', 'ROJO62']
export function WebLogin() {
  const { signedIn, signIn } = useWebSession()
  const navigate = useNavigate()
  const [document, setDocument] = useState('')
  const [documentType, setDocumentType] = useState('DNI')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const [codeIndex, setCodeIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const feedback = useRef<HTMLParagraphElement>(null)
  const code = demoCodes[codeIndex]
  const demoDocument = documentType === 'DNI' ? '12345678' : '123456789'
  function showError(message: string) {
    setError(message)
    requestAnimationFrame(() => feedback.current?.focus())
  }
  useEffect(() => { window.document.title = 'Ingresar | Caja Virtual' }, [])
  if (signedIn) return <Navigate to="/caja-virtual" replace />
  return (
    <div className="web-login">
      <header className="web-login-header">
        <Link to="/inicio" aria-label="Caja Huancayo, página principal"><img src="/images/caja-huancayo-logo.png" alt="Caja Huancayo" /></Link>
        <Link to="/inicio">Volver a la página principal</Link>
      </header>
      <main className="web-login-grid">
        <section className="web-login-intro">
          <span className="web-login-kicker">BIENVENIDO A TU CAJA VIRTUAL</span>
          <h1>Tu dinero,<br />más cerca de ti.</h1>
          <p>Consulta tus movimientos, transfiere y paga tus servicios desde un solo lugar.</p>
          <figure className="web-login-brand-image"><img src="/images/caja-huancayo-cuenta-digital.jpg" alt="Una clienta muestra la banca móvil de Caja Huancayo. Abre tu cuenta digital." width="1363" height="517" /><figcaption>Cuenta Digital · Imagen de referencia de Caja Huancayo</figcaption></figure>
          <div className="web-login-advice"><Icon name="shield" size={28} /><div><h2>Evita el phishing</h2><p>No compartas tu clave web ni tus códigos de verificación por llamadas, correo o mensajes.</p></div></div>
          <div id="demo-credentials" className="web-login-demo"><strong>Datos de acceso</strong><span>DNI: <code>12345678</code> · CE: <code>123456789</code></span><span>Clave web: <code>246810</code></span></div>
        </section>
        <section className="web-login-card" aria-labelledby="login-title">
          <span className="web-login-lock"><Icon name="lock" size={24} /></span>
          <h2 id="login-title">Ingresa a tu Caja Virtual</h2>
          <p>Identifica tu tarjeta e ingresa tus datos.</p>
          <form noValidate onSubmit={(event) => {
            event.preventDefault()
            if (document.trim() !== demoDocument) { showError(`Usa el ${documentType} de acceso: ${demoDocument}.`); return }
            if (!/^\d{6}$/.test(password)) { showError('Ingresa la clave web de 6 dígitos.'); return }
            if (answer.trim().toUpperCase() !== code) { showError('El código no coincide. Copia los caracteres mostrados en la verificación.'); return }
            if (!signIn(document, password)) { showError('La clave no coincide. Usa la clave de acceso: 246810.'); return }
            navigate('/caja-virtual', { replace: true })
          }}>
            <label htmlFor="web-alias">Alias asociado</label>
            <select id="web-alias" aria-describedby="demo-credentials"><option>Valeria</option></select>
            <dl className="web-login-card-info"><div><dt>Tipo de tarjeta</dt><dd>RAPICARD VISA</dd></div><div><dt>Número de tarjeta</dt><dd>•••• •••• •••• 1024</dd></div></dl>
            <div className="web-login-document-row">
              <div><label htmlFor="web-document-type">Tipo de documento</label><select id="web-document-type" value={documentType} onChange={(e) => { setDocumentType(e.target.value); setDocument(''); setError('') }}><option value="DNI">DNI</option><option value="CE">Carné de extranjería</option></select></div>
              <div><label htmlFor="web-document">Número de documento</label><input id="web-document" inputMode="numeric" autoComplete="off" maxLength={documentType === 'DNI' ? 8 : 9} value={document} onChange={(e) => { setDocument(e.target.value.replace(/\D/g, '')); setError('') }} aria-describedby="demo-credentials login-feedback" required /></div>
            </div>
            <label htmlFor="web-password">Clave web</label>
            <div className="web-login-password">
              <input id="web-password" type={visible ? 'text' : 'password'} inputMode="numeric" maxLength={6} autoComplete="off" value={password} onChange={(e) => { setPassword(e.target.value.replace(/\D/g, '')); setError('') }} aria-describedby="web-key-hint login-feedback" required />
              <button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? 'Ocultar clave' : 'Mostrar clave'} aria-pressed={visible}><Icon name={visible ? 'eyeOff' : 'eye'} size={20} /></button>
            </div>
            <p id="web-key-hint" className="web-login-hint">6 dígitos. Puedes escribirlos o usar el teclado virtual.</p>
            <div className="web-login-key-actions"><button type="button" aria-expanded={keyboardOpen} aria-controls="web-keyboard" onClick={() => setKeyboardOpen(!keyboardOpen)}>{keyboardOpen ? 'Ocultar teclado virtual' : 'Usar teclado virtual'}</button><button type="button" onClick={() => { setPassword(''); setError('') }}>Borrar clave</button></div>
            {keyboardOpen && <div id="web-keyboard" className="web-login-keyboard" role="group" aria-label="Teclado virtual para la clave web">{['1','2','3','4','5','6','7','8','9','0'].map((digit) => <button key={digit} type="button" disabled={password.length >= 6} aria-label={`Agregar dígito ${digit}`} onClick={() => { setPassword((value) => (value + digit).slice(0, 6)); setError('') }}>{digit}</button>)}<button type="button" className="web-key-delete" onClick={() => setPassword((value) => value.slice(0, -1))}>Borrar último</button></div>}
            <fieldset className="web-login-verification"><legend>Verificación</legend><p className="web-login-hint">Copia el código mostrado.</p><div className="web-login-code-row"><output aria-label={`Código: ${code.split('').join(' ')}`} aria-live="polite">{code}</output><button type="button" onClick={() => { setCodeIndex((value) => (value + 1) % demoCodes.length); setAnswer(''); setError('') }}>Cambiar código</button></div><label htmlFor="web-code">Código mostrado</label><input id="web-code" value={answer} maxLength={6} autoComplete="off" spellCheck={false} onChange={(e) => { setAnswer(e.target.value); setError('') }} aria-describedby="login-feedback" required /></fieldset>
            <p ref={feedback} id="login-feedback" className="web-login-error" role="alert" tabIndex={-1}>{error}</p>
            <button type="submit" className="button primary full-width">Ingresar <Icon name="arrow" size={18} /></button>
          </form>
          <details className="web-login-help"><summary>¿Olvidaste tu clave o necesitas ayuda?</summary><p>La clave de acceso es <strong>246810</strong>. Para asistencia con tu cuenta, utiliza los canales oficiales de Caja Huancayo.</p></details>
        </section>
      </main>
    </div>
  )
}

