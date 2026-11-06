import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export function Accessibility() {
  useEffect(() => {
    document.title = 'Accesibilidad | Caja Virtual'
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [])
  return <>
    <a className="skip-link" href="#main-content">Saltar al contenido</a>
    <main id="main-content" tabIndex={-1} className="accessibility-statement">
      <Link className="back-link" to="/inicio">Volver a la página principal</Link>
      <h1>Accesibilidad de Caja Virtual</h1>
      <p>Prototipo académico de Caja Huancayo, versión APF3. Fecha de revisión: 6 de noviembre de 2026.</p>
      <h2>Alcance de la revisión</h2>
      <p>Ingreso web, resumen de cuenta, transferencia, pago de servicios y consulta de movimientos. Incluye los estados de validación, carga, error, éxito y ausencia de resultados.</p>
      <h2>Estado de conformidad</h2>
      <p>El objetivo de la evaluación es WCAG 2.1 AA. La revisión está en curso y todavía no se ha determinado la conformidad completa.</p>
      <h2>Opciones disponibles</h2>
      <ul><li>Modo de alto contraste y texto ampliado hasta el 200 %.</li><li>Mayor separación entre líneas, letras y palabras para facilitar la lectura.</li><li>Reducción de animaciones y respeto de la preferencia de movimiento del dispositivo.</li><li>Navegación con teclado y un indicador visible del foco.</li><li>Etiquetas de formulario, instrucciones y mensajes para corregir errores.</li><li>Revisión de los datos antes de confirmar pagos o transferencias simuladas.</li></ul>
      <h2>Cómo usar el teclado</h2>
      <p>Avanza con <kbd>Tab</kbd> y vuelve con <kbd>Mayús + Tab</kbd>. Activa enlaces con <kbd>Enter</kbd> y botones con <kbd>Enter</kbd> o <kbd>Espacio</kbd>. En las opciones de destinatario o contraste, usa las flechas para cambiar la selección. <kbd>Escape</kbd> cierra las opciones de lectura. Al cambiar de paso, el foco se sitúa en su título.</p>
      <h2>Lectura y avisos</h2>
      <p>Abre Opciones de lectura y contraste para elegir el tamaño, los colores y la separación del texto. Puedes combinarlos y restablecerlos cuando quieras. También puedes ampliar la página con el zoom de tu navegador.</p>
      <p>Los errores, el procesamiento y los resultados se muestran por escrito. Puedes completar las operaciones sin escuchar sonidos. Antes de confirmar, revisa el destinatario o servicio y el monto. Los enlaces de edición permiten corregir los datos.</p>
      <h2>Limitaciones conocidas y próximos pasos</h2>
      <p>Se han registrado pruebas técnicas y recorridos guiados con teclado. Estas comprobaciones cubren casos concretos y no sustituyen la evaluación completa ni las sesiones con participantes diversos.</p>
      <p>Quedan pendientes el recorrido con un lector de pantalla, la validación con participantes diversos y la revisión completa de todos los criterios aplicables. El prototipo móvil separado y las páginas externas quedan fuera de este alcance.</p>
      <p>Las operaciones usan datos ficticios. Al recargar se reinician el saldo y los movimientos de demostración.</p>
      <h2>Comunicar una barrera</h2>
      <p>Registra la ruta de la página, el paso donde ocurrió el problema y la tecnología de apoyo utilizada. Puedes enviarlo al equipo del Grupo 06 mediante <a href="https://github.com/WhosRod30/CAJA-HUANCAYO/issues/new" target="_blank" rel="noreferrer">el formulario de incidencias de GitHub (abre otra pestaña y requiere una cuenta)</a>. Evita incluir claves o datos personales.</p>
    </main>
  </>
}
