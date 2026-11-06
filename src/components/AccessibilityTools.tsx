import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const key = 'caja-accessibility-v3'
const sizes = ['100', '125', '150', '200'] as const
type Preferences = { contrast: 'standard' | 'high'; size: (typeof sizes)[number]; spacing: boolean; reducedMotion: boolean }
const defaults: Preferences = { contrast: 'standard', size: '100', spacing: false, reducedMotion: false }
function readPreferences(): Preferences {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(key) ?? 'null')
    if (!saved || typeof saved !== 'object') return defaults
    const value = saved as Record<string, unknown>
    return { contrast: value.contrast === 'high' ? 'high' : 'standard', size: sizes.find(size => size === value.size) ?? '100', spacing: value.spacing === true, reducedMotion: value.reducedMotion === true }
  } catch { return defaults }
}

export function AccessibilityTools() {
  const [preferences, setPreferences] = useState(readPreferences)
  const [message, setMessage] = useState('')
  const { pathname } = useLocation()
  const isMobilePrototype = pathname.startsWith('/mobile')
  useEffect(() => {
    const active = isMobilePrototype ? defaults : preferences
    document.documentElement.dataset.contrast = active.contrast
    document.documentElement.dataset.textSize = active.size
    document.documentElement.dataset.textSpacing = active.spacing ? 'wide' : 'standard'
    document.documentElement.dataset.reducedMotion = String(active.reducedMotion)
    document.documentElement.style.setProperty('--reading-scale', String(Number(active.size) / 100))
    try { localStorage.setItem(key, JSON.stringify(preferences)) } catch { /* Se conservan durante esta visita. */ }
  }, [preferences, isMobilePrototype])
  if (isMobilePrototype) return null
  return <section className="accessibility-tools" aria-label="Opciones de accesibilidad">
    <details onKeyDown={event => {
      if (event.key === 'Escape' && event.currentTarget.open) {
        event.preventDefault()
        event.currentTarget.open = false
        event.currentTarget.querySelector('summary')?.focus()
      }
    }}>
      <summary>Opciones de lectura y contraste</summary>
      <p className="reading-help">Adapta la lectura a tus necesidades. Tus opciones se conservan en este navegador.</p>
      <div className="reading-options">
        <fieldset><legend>Contraste de la página</legend>
          {([['standard', 'Estándar'], ['high', 'Alto contraste']] as const).map(([value, label]) => <label key={value}><input type="radio" name="contrast" value={value} checked={preferences.contrast === value} onChange={() => { setPreferences(p => ({ ...p, contrast: value })); setMessage(`Contraste: ${label}.`) }} />{label}</label>)}
        </fieldset>
        <div className="field"><label htmlFor="reading-size">Tamaño del texto</label><select id="reading-size" value={preferences.size} onChange={e => { const size = sizes.find(size => size === e.target.value) ?? '100'; setPreferences(p => ({ ...p, size })); setMessage(`Tamaño del texto: ${size} por ciento.`) }}>{sizes.map(size => <option key={size} value={size}>{size} %</option>)}</select></div>
        <fieldset><legend>Comodidad de lectura</legend>
          <label><input type="checkbox" checked={preferences.spacing} onChange={event => {
            const spacing = event.target.checked
            setPreferences(current => ({ ...current, spacing }))
            setMessage(spacing ? 'Mayor separación entre líneas, letras y palabras.' : 'Separación de texto estándar.')
          }} />Separar líneas y palabras</label>
          <label><input type="checkbox" checked={preferences.reducedMotion} onChange={event => {
            const reducedMotion = event.target.checked
            setPreferences(current => ({ ...current, reducedMotion }))
            setMessage(reducedMotion ? 'Animaciones reducidas.' : 'Se respeta la preferencia de movimiento de tu dispositivo.')
          }} />Reducir animaciones</label>
        </fieldset>
        <button type="button" onClick={() => { setPreferences(defaults); setMessage('Opciones restablecidas. Se respeta la preferencia de movimiento de tu dispositivo.') }}>Restablecer opciones</button>
      </div>
      <p className="reading-feedback" role="status" aria-atomic="true">{message}</p>
      <p className="reading-help">Usa Tab para avanzar, Mayús + Tab para volver y Enter o Espacio para activar controles. Escape cierra estas opciones.</p>
    </details>
    <Link to="/accesibilidad">Ayuda y declaración de accesibilidad</Link>
  </section>
}
