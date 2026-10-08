import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { usePayment } from '../features/payments/PaymentProvider';
import type { ServiceItem } from '../features/payments/PaymentProvider';

const DEMO_SERVICES: ServiceItem[] = [
  { id: '1', name: 'Luz del Sur', category: 'Luz', icon: 'star', requiresAmount: false },
  { id: '2', name: 'Enel', category: 'Luz', icon: 'star', requiresAmount: false },
  { id: '3', name: 'Sedapal', category: 'Agua', icon: 'star', requiresAmount: false },
  { id: '4', name: 'Claro - Móvil', category: 'Telefonía', icon: 'star', requiresAmount: true },
  { id: '5', name: 'Movistar - Internet', category: 'Internet', icon: 'star', requiresAmount: true },
  { id: '6', name: 'Universidad de Lima', category: 'Educación', icon: 'star', requiresAmount: true },
];

export function Payments() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { startPayment } = usePayment();

  const filtered = DEMO_SERVICES.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (service: ServiceItem) => {
    startPayment(service);
    navigate('/pagos/detalle');
  };

  return (
    <div className="page payments">
      <div className="page-heading">
        <h1>Pago de Servicios</h1>
        <p>Encuentra y paga tus servicios al instante.</p>
      </div>

      <div className="apf-improvement-panel" style={{ backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', borderLeft: '4px solid #0ea5e9' }}>
        <strong>✨ Mejora UX (APF2):</strong>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#0369a1' }}>
          Se reemplazó la navegación fragmentada por categorías (agua, luz, recargas, etc.) por un <strong>Buscador Universal</strong>.
          Esto reduce la carga cognitiva (Heurística 8) permitiendo al usuario encontrar directamente lo que busca sin adivinar la categoría institucional.
        </p>
      </div>

      <div className="search-container" style={{ position: 'relative', marginBottom: '2rem' }}>
        <Icon name="search" size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
        <input
          type="search"
          className="text-input"
          style={{ width: '100%', paddingLeft: '3rem', height: '3.5rem', fontSize: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}
          placeholder="Buscar empresa, servicio o institución..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="services-list">
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          {query ? 'Resultados de búsqueda' : 'Servicios frecuentes'}
        </h2>
        {filtered.length > 0 ? (
          <div className="shortcut-grid" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {filtered.map((service) => (
              <button
                key={service.id}
                className="favorite-row"
                style={{ display: 'flex', alignItems: 'center', padding: '1rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                onClick={() => handleSelect(service)}
              >
                <div className="icon-tile neutral" style={{ marginRight: '1rem' }}>
                  <Icon name="receipt" />
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', fontSize: '1rem' }}>{service.name}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{service.category}</span>
                </div>
                <Icon name="chevron" size={16} />
              </button>
            ))}
          </div>
        ) : (
          <div className="compact-empty" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
            <Icon name="search" size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No se encontraron resultados para "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
