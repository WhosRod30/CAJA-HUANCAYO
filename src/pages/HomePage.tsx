import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import type { IconName } from '../components/Icon'
import './HomePage.css'

type Category = 'todos' | 'ahorro' | 'credito'
interface Product {
  id: string
  category: Exclude<Category, 'todos'>
  icon: IconName
  label: string
  name: string
  description: string
  detail: string
  points: string[]
}

const products: Product[] = [
  {
    id: 'ahorros',
    category: 'ahorro',
    icon: 'wallet',
    label: 'PARA TUS METAS',
    name: 'Cuenta de ahorros',
    description:
      'Dale un lugar a tus planes y mantén tus movimientos a la vista.',
    detail:
      'Conoce una forma de organizar tu dinero y consultar tus operaciones desde Caja Virtual.',
    points: [
      'Consulta el saldo de tu cuenta de ejemplo.',
      'Revisa tus movimientos en un solo lugar.',
      'Explora las transferencias con datos ficticios.',
    ],
  },
  {
    id: 'negocio',
    category: 'credito',
    icon: 'users',
    label: 'PARA TU NEGOCIO',
    name: 'Créditos para crecer',
    description:
      'Encuentra información para dar el siguiente paso con tu negocio.',
    detail:
      'Encuentra la información sobre créditos para tu negocio y consulta los requisitos y condiciones en el sitio oficial.',
    points: [
      'Identifica la categoría de producto que te interesa.',
      'Consulta la información comercial en el sitio oficial.',
      'Esta demostración no recibe solicitudes ni evalúa créditos.',
    ],
  },
  {
    id: 'futuro',
    category: 'ahorro',
    icon: 'home',
    label: 'PARA LO QUE VIENE',
    name: 'Ahorra con un propósito',
    description:
      'Un viaje, un nuevo proyecto o eso que tanto quieres. Empieza por tu meta.',
    detail:
      'Explora la categoría de ahorro y conoce cómo consultar tu cuenta en la experiencia de demostración.',
    points: [
      'Visualiza el dinero disponible en tu cuenta ficticia.',
      'Consulta los ingresos y salidas de la demostración.',
      'Las condiciones de productos reales se consultan en el portal oficial.',
    ],
  },
]

const officialSite = 'https://www.cajahuancayo.com.pe/default.aspx'

export function HomePage() {
  const [category, setCategory] = useState<Category>('todos')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const visibleProducts = products.filter(
    (product) => category === 'todos' || product.category === category,
  )

  useEffect(() => {
    document.title = 'Caja Huancayo | Inicio · Prototipo académico'
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('public-main')?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal()
    if (!selected && dialog.current?.open) dialog.current.close()
  }, [selected])

  function chooseCategory(next: Category) {
    setCategory(next)
    const section = document.getElementById('productos')
    section?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
    section?.focus({ preventScroll: true })
  }

  return (
    <div className="public-site">
      <a className="skip-link" href="#public-main">
        Saltar al contenido
      </a>
      <div className="public-utility">
        <div className="public-container">
          <span>
            Personas <span aria-hidden="true">/</span> Negocios
          </span>
          <span className="public-demo-label">
            Prototipo académico — No oficial
          </span>
        </div>
      </div>
      {/* WEB-UX-001: four public categories; one persistent digital-banking entry. */}
      <header className="public-header">
        <div className="public-brand-row public-container">
          <Link
            to="/"
            className="public-logo"
            onClick={() => {
              setMenuOpen(false)
              window.scrollTo({ top: 0, behavior: 'instant' })
              document
                .getElementById('public-main')
                ?.focus({ preventScroll: true })
            }}
            aria-label="Caja Huancayo, página principal"
          >
            <img
              src="/images/caja-huancayo-logo.png"
              alt="Caja Huancayo"
              width="300"
              height="41"
            />
          </Link>
          <div className="public-header-actions">
            <span className="public-header-caption">Siempre cerca de ti.</span>
            <Link to="/caja-virtual" className="virtual-button">
              <Icon name="lock" size={18} />
              <span>Caja Virtual</span>
              <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
        <div className="public-nav-band">
          <div className="public-container public-nav-container">
            <button
              ref={menuButton}
              className="public-menu-button"
              aria-expanded={menuOpen}
              aria-controls="public-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="menu-glyph" aria-hidden="true">
                {menuOpen ? '×' : '☰'}
              </span>
              {menuOpen ? 'Cerrar menú' : 'Menú'}
            </button>
            <nav
              id="public-navigation"
              aria-label="Navegación del sitio"
              className={
                menuOpen ? 'public-navigation expanded' : 'public-navigation'
              }
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setMenuOpen(false)
                  menuButton.current?.focus()
                }
              }}
            >
              <a href="#productos" onClick={() => setMenuOpen(false)}>
                Productos y servicios
              </a>
              <a href="#nosotros" onClick={() => setMenuOpen(false)}>
                Nuestra caja
              </a>
              <a href="#canales" onClick={() => setMenuOpen(false)}>
                Canales digitales
              </a>
              <a href="#preguntas" onClick={() => setMenuOpen(false)}>
                Ayuda
              </a>
            </nav>
            <span className="public-nav-note">
              <Icon name="shield" size={15} /> Contigo en cada paso
            </span>
          </div>
        </div>
      </header>
      <main id="public-main" tabIndex={-1}>
        {/* WEB-UX-002: static hero, selectable text, no autoplay or floating promotions. */}
        <section className="public-hero" aria-labelledby="home-title">
          <div className="public-container hero-grid">
            <div className="public-hero-copy">
              <span className="public-eyebrow">
                <span /> CONTIGO, PARA SEGUIR CRECIENDO
              </span>
              <h1 id="home-title">
                Tus planes.
                <br />
                Tu esfuerzo.
                <br />
                <em>Una caja cerca de ti.</em>
              </h1>
              <p>
                Ahorra, impulsa tu negocio y haz tus operaciones del día a día.
                Encuentra aquí el camino para tu próxima meta.
              </p>
              <div className="public-hero-actions">
                <a className="public-button red" href="#productos">
                  Conoce nuestros productos <Icon name="arrow" size={18} />
                </a>
                <a className="public-inline-link" href="#canales">
                  Descubre Caja Virtual <Icon name="chevron" size={15} />
                </a>
              </div>
              <div className="hero-footnote">
                <Icon name="shield" size={17} />
                <span>Una experiencia sencilla, pensada para ti.</span>
              </div>
            </div>
            <div className="public-hero-visual">
              <div className="hero-photo-frame">
                <img
                  src="/images/caja-huancayo-cuenta-digital.jpg"
                  alt="Imagen institucional de Caja Huancayo: una mujer muestra la aplicación en su celular."
                  width="1363"
                  height="517"
                  fetchPriority="high"
                />
              </div>
              <div className="hero-photo-note">
                <span className="hero-note-icon">
                  <Icon name="users" size={24} />
                </span>
                <div>
                  <strong>
                    Detrás de cada meta,
                    <br />
                    hay una historia.
                  </strong>
                  <span>Sigamos construyendo la tuya.</span>
                </div>
              </div>
              <span className="hero-photo-accent" aria-hidden="true" />
            </div>
          </div>
        </section>
        {/* WEB-UX-003: entry points follow user intention rather than a large bank taxonomy. */}
        <div className="public-container intent-container">
          <nav className="public-intents" aria-label="¿Qué necesitas hacer?">
            <button onClick={() => chooseCategory('ahorro')}>
              <span className="intent-icon">
                <Icon name="wallet" size={25} />
              </span>
              <span>
                <strong>Quiero ahorrar</strong>
                <small>Un paso hacia mis metas</small>
              </span>
              <Icon name="chevron" size={17} />
            </button>
            <button onClick={() => chooseCategory('credito')}>
              <span className="intent-icon">
                <Icon name="users" size={25} />
              </span>
              <span>
                <strong>Quiero un crédito</strong>
                <small>Impulsar lo que tengo en mente</small>
              </span>
              <Icon name="chevron" size={17} />
            </button>
            <Link to="/caja-virtual">
              <span className="intent-icon">
                <Icon name="transfer" size={25} />
              </span>
              <span>
                <strong>Hacer mis operaciones</strong>
                <small>Entrar a Caja Virtual</small>
              </span>
              <Icon name="chevron" size={17} />
            </Link>
          </nav>
        </div>
        <section
          className="public-container public-products"
          id="productos"
          tabIndex={-1}
          aria-labelledby="products-title"
        >
          <div className="public-section-heading">
            <div>
              <span className="public-eyebrow">PRODUCTOS Y SERVICIOS</span>
              <h2 id="products-title">Estamos para ayudarte.</h2>
              <p>Elige lo que necesitas. Conoce tus opciones, a tu ritmo.</p>
            </div>
            <div
              className="product-filters"
              role="group"
              aria-label="Filtrar productos"
            >
              {(
                [
                  { id: 'todos', label: 'Todos' },
                  { id: 'ahorro', label: 'Ahorro' },
                  { id: 'credito', label: 'Créditos' },
                ] as const
              ).map((filter) => (
                <button
                  key={filter.id}
                  aria-pressed={category === filter.id}
                  onClick={() => setCategory(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <span role="status" className="sr-only">
            {visibleProducts.length}{' '}
            {visibleProducts.length === 1
              ? 'opción disponible.'
              : 'opciones disponibles.'}
          </span>
          <div className="public-product-grid">
            {visibleProducts.map((product) => (
              <article
                className="public-product"
                data-product={product.id}
                key={product.id}
              >
                <div className="product-visual">
                  <span>
                    <Icon name={product.icon} size={35} />
                  </span>
                  <span className="product-line-art" aria-hidden="true" />
                </div>
                <div className="product-body">
                  <span className="product-kicker">{product.label}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button
                    className="public-inline-link"
                    onClick={() => setSelected(product)}
                    aria-label={`Conocer más sobre ${product.name}`}
                  >
                    Conocer más <Icon name="arrow" size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          className="public-about"
          id="nosotros"
          aria-labelledby="about-title"
        >
          <div className="public-container about-grid">
            <div>
              <span className="public-eyebrow">NUESTRA CAJA</span>
              <h2 id="about-title">
                Cerca de lo que
                <br />
                <em>más te importa.</em>
              </h2>
            </div>
            <div>
              <p>
                Un negocio que empieza, una meta que toma forma o alguien a
                quien quieres ayudar. Cada paso cuenta.
              </p>
              <p>
                Por eso, encontrar información y realizar tus operaciones
                debería sentirse sencillo, desde el primer momento.
              </p>
              <a href="#canales" className="public-inline-link">
                Conoce nuestros canales digitales{' '}
                <Icon name="arrow" size={17} />
              </a>
            </div>
          </div>
        </section>
        <section
          id="canales"
          className="public-container public-digital"
          aria-labelledby="digital-title"
        >
          <div className="digital-copy">
            <span className="public-eyebrow">CAJA VIRTUAL</span>
            <h2 id="digital-title">
              Tu caja, donde estés.
              <br />Y cuando la necesites.
            </h2>
            <p>
              Consulta tus movimientos y transfiere desde una sola experiencia.
              Con pasos claros y tiempo para revisar antes de confirmar.
            </p>
            <Link className="public-button light" to="/caja-virtual">
              Ingresar a Caja Virtual <Icon name="arrow" size={18} />
            </Link>
            <small>
              <Icon name="info" size={14} /> Acceso de demostración con datos
              ficticios.
            </small>
          </div>
          <ol
            className="digital-steps"
            aria-label="Cómo transferir en Caja Virtual"
          >
            <li>
              <span>01</span>
              <div>
                <h3>Elige a quién enviar</h3>
                <p>Busca por nombre, celular o cuenta.</p>
              </div>
              <Icon name="users" size={21} />
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Indica el monto</h3>
                <p>Ten tu saldo disponible a la vista.</p>
              </div>
              <Icon name="wallet" size={21} />
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Revisa y confirma</h3>
                <p>Comprueba los datos y guarda tu comprobante.</p>
              </div>
              <Icon name="check" size={21} />
            </li>
          </ol>
        </section>
        {/* WEB-UX-004: secondary explanations disclosed only when requested. */}
        <section
          id="preguntas"
          className="public-container public-faq"
          aria-labelledby="faq-title"
        >
          <div>
            <span className="public-eyebrow">TE ACOMPAÑAMOS</span>
            <h2 id="faq-title">¿En qué podemos ayudarte?</h2>
            <p>Respuestas claras para dar el siguiente paso.</p>
          </div>
          <div className="faq-items">
            <details>
              <summary>
                ¿Cómo hago una transferencia?
                <Icon name="plus" size={18} />
              </summary>
              <p>
                Entra a Caja Virtual y selecciona «Transferir dinero». Elige uno
                de los destinatarios de ejemplo, ingresa el monto y revisa los
                datos antes de confirmar.
              </p>
              <Link to="/caja-virtual" className="public-inline-link">
                Entrar a Caja Virtual <Icon name="arrow" size={16} />
              </Link>
            </details>
            <details>
              <summary>
                ¿Necesito una cuenta real para probarlo?
                <Icon name="plus" size={18} />
              </summary>
              <p>
                No. Esta es una propuesta académica: entrarás a un perfil
                ficticio sin contraseñas, tarjetas ni datos bancarios reales.
                Las operaciones son simuladas y se reinician al recargar.
              </p>
            </details>
            <details>
              <summary>
                ¿Dónde consulto las condiciones de un producto?
                <Icon name="plus" size={18} />
              </summary>
              <p>
                La información de esta propuesta es ilustrativa. Las tasas,
                requisitos y condiciones vigentes se consultan en el sitio
                oficial de Caja Huancayo.
              </p>
              <a
                href={officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="public-inline-link"
              >
                Consultar el sitio oficial{' '}
                <span className="sr-only">(abre otra pestaña)</span>
                <Icon name="outgoing" size={16} />
              </a>
            </details>
          </div>
        </section>
      </main>
      <footer className="public-footer">
        <div className="public-container footer-grid">
          <div className="public-footer-brand">
            <img
              src="/images/caja-huancayo-logo.png"
              alt="Caja Huancayo"
              width="300"
              height="41"
            />
            <p>Siempre cerca de ti.</p>
            <span>Prototipo académico — No oficial</span>
          </div>
          <div>
            <h2>Encuentra lo que necesitas</h2>
            <a href="#productos">Productos y servicios</a>
            <a href="#nosotros">Nuestra caja</a>
            <a href="#canales">Canales digitales</a>
          </div>
          <div>
            <h2>Estamos para ayudarte</h2>
            <a href="#preguntas">Preguntas frecuentes</a>
            <Link to="/caja-virtual">Ingresar a Caja Virtual</Link>
            <a href="#public-main">Volver al inicio</a>
          </div>
        </div>
        <div className="public-container public-footer-bottom">
          <span>
            Propuesta educativa de Interacción Hombre-Máquina. Sin afiliación
            oficial con Caja Huancayo.
          </span>
          <span>
            Identidad e imagen de referencia:{' '}
            <a href={officialSite} target="_blank" rel="noopener noreferrer">
              Caja Huancayo<span className="sr-only"> (abre otra pestaña)</span>
            </a>
          </span>
        </div>
      </footer>
      <dialog
        ref={dialog}
        className="product-dialog"
        aria-labelledby="product-dialog-title"
        onClose={() => setSelected(null)}
      >
        <button
          className="dialog-close"
          onClick={() => dialog.current?.close()}
          aria-label="Cerrar información de producto"
        >
          <Icon name="close" size={22} />
        </button>
        {selected && (
          <>
            <span className="public-eyebrow">{selected.label}</span>
            <h2 id="product-dialog-title">{selected.name}</h2>
            <p>{selected.detail}</p>
            <ul>
              {selected.points.map((point) => (
                <li key={point}>
                  <Icon name="check" size={17} />
                  {point}
                </li>
              ))}
            </ul>
            <div className="product-dialog-note">
              <Icon name="info" size={18} />
              <p>
                Información ilustrativa del prototipo. No constituye una oferta
                ni una solicitud de producto.
              </p>
            </div>
            <div className="product-dialog-actions">
              <a
                className="public-inline-link"
                href={officialSite}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar información oficial{' '}
                <span className="sr-only">(abre otra pestaña)</span>
                <Icon name="outgoing" size={16} />
              </a>
              <Link
                className="public-button red"
                to="/caja-virtual"
                onClick={() => dialog.current?.close()}
              >
                Explorar Caja Virtual <Icon name="arrow" size={17} />
              </Link>
              <button
                className="public-inline-link"
                onClick={() => dialog.current?.close()}
              >
                Seguir explorando
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  )
}
