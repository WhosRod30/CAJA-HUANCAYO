import { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { usePayment, PaymentProvider } from '../../features/payments/PaymentProvider';
import type { ServiceItem } from '../../features/payments/PaymentProvider';
import { money } from '../../utils/format';

const DEMO_SERVICES: ServiceItem[] = [
  { id: '1', name: 'Luz del Sur', category: 'Electricidad', icon: 'star', requiresAmount: false },
  { id: '2', name: 'Enel', category: 'Electricidad', icon: 'star', requiresAmount: false },
  { id: '3', name: 'Sedapal', category: 'Agua', icon: 'star', requiresAmount: false },
  { id: '4', name: 'Claro', category: 'Telefonía', icon: 'star', requiresAmount: true },
  { id: '5', name: 'Movistar', category: 'Telefonía e Internet', icon: 'star', requiresAmount: true },
];

function MobilePaymentsSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { startPayment } = usePayment();

  const filtered = DEMO_SERVICES.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="bg-[#0B0F19] pt-12 pb-8 px-6 rounded-b-[2rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/20 rounded-full mix-blend-screen filter blur-[60px] translate-x-1/3 -translate-y-1/2"></div>
        <div className="relative z-10">
          <button onClick={() => navigate('/mobile/inicio')} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white mb-6 backdrop-blur-md border border-white/10">
            <Icon name="back" size={20} />
          </button>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Pago de Servicios</h1>
          <p className="text-gray-400 text-sm">Encuentra y paga al instante</p>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-20 mb-8">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-2 flex items-center gap-3 border border-gray-100 focus-within:ring-2 focus-within:ring-rose-500 transition-shadow">
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 ml-1">
            <Icon name="search" size={20} />
          </div>
          <input
            type="search"
            placeholder="Ej: Sedapal, Luz del Sur..."
            className="w-full py-3 pr-4 outline-none text-gray-900 bg-transparent text-[15px] font-medium placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="px-6 pb-8">
        <h2 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
          {query ? 'Resultados' : 'Servicios Populares'}
        </h2>
        <div className="flex flex-col gap-3">
          {filtered.length > 0 ? (
            filtered.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  startPayment(service);
                  navigate('/mobile/pagos/detalle');
                }}
                className="bg-white rounded-[1.5rem] p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 flex items-center justify-between active:scale-95 transition-transform group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-rose-50 flex items-center justify-center text-gray-900 group-hover:text-rose-600 transition-colors border border-gray-100">
                    <Icon name="receipt" size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 text-[15px]">{service.name}</h3>
                    <p className="text-xs font-medium text-gray-400 mt-0.5">{service.category}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <Icon name="chevron" size={16} />
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4">
                <Icon name="search" size={24} />
              </div>
              <p className="text-gray-500 font-medium">No se encontraron servicios</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MobilePaymentDetail() {
  const { draft, updateDraft } = usePayment();
  const [supply, setSupply] = useState('');
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
          <Icon name="back" size={20} />
        </button>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="px-6 flex-1 flex flex-col">
        <div className="mb-10 mt-2">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
            <Icon name="receipt" size={28} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">{draft.service?.name}</h2>
          <p className="text-gray-500 font-medium">Ingresa tu número de suministro para consultar la deuda.</p>
        </div>

        <div className="mb-8 relative">
          <input
            type="text"
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 text-xl font-bold text-gray-900 outline-none focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/10 transition-all placeholder-gray-300 tracking-wider"
            placeholder="12345678"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            autoFocus
          />
        </div>

        <div className="mt-auto pb-8">
          <button
            className={`w-full py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 ${
              supply.length > 4 
                ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-[0_8px_20px_rgba(225,29,72,0.3)] active:scale-95' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={supply.length <= 4}
            onClick={() => {
              updateDraft({ supplyNumber: supply });
              if (draft.service?.requiresAmount) navigate('/mobile/pagos/monto');
              else {
                updateDraft({ amount: 45.50 });
                navigate('/mobile/pagos/revisar');
              }
            }}
          >
            Verificar Identidad
          </button>
        </div>
      </div>
    </div>
  );
}

function MobilePaymentAmount() {
  const { draft, updateDraft } = usePayment();
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
          <Icon name="back" size={20} />
        </button>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-600"></div>
          <div className="w-2 h-2 rounded-full bg-rose-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="px-6 flex-1 flex flex-col">
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-4 mb-10">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <Icon name="check" size={20} />
          </div>
          <div>
            <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">Identidad verificada</p>
            <p className="text-emerald-900 font-bold">Juan Pérez</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">¿Cuánto deseas pagar?</h2>
        </div>

        <div className="flex justify-center items-center gap-2 mb-12">
          <span className="text-4xl font-semibold text-gray-300">S/</span>
          <input
            type="number"
            className="w-48 text-6xl font-extrabold text-gray-900 outline-none text-center bg-transparent tracking-tight placeholder-gray-200"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            autoFocus
          />
        </div>

        <div className="mt-auto pb-8">
          <button
            className={`w-full py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 ${
              parseFloat(amount) > 0 
                ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-[0_8px_20px_rgba(225,29,72,0.3)] active:scale-95' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!parseFloat(amount) || parseFloat(amount) <= 0}
            onClick={() => {
              updateDraft({ amount: parseFloat(amount) });
              navigate('/mobile/pagos/revisar');
            }}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

function MobilePaymentReview() {
  const { draft, submitPayment } = usePayment();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-white flex items-center justify-between px-6 py-6 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
          <Icon name="back" size={20} />
        </button>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-600"></div>
          <div className="w-2 h-2 rounded-full bg-rose-600"></div>
          <div className="w-2 h-2 rounded-full bg-rose-600"></div>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="px-6 flex-1 flex flex-col pt-8 pb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Confirma tu pago</h2>

        <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
          <div className="text-center mb-8 pb-8 border-b border-gray-100 border-dashed">
            <p className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Monto a pagar</p>
            <p className="text-5xl font-extrabold text-gray-900 tracking-tight">{money(draft.amount)}</p>
          </div>
          
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-[15px] text-gray-500 font-medium">Servicio</span>
              <span className="text-[15px] font-bold text-gray-900">{draft.service?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[15px] text-gray-500 font-medium">Suministro</span>
              <span className="text-[15px] font-bold text-gray-900">{draft.supplyNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[15px] text-gray-500 font-medium">Titular</span>
              <span className="text-[15px] font-bold text-gray-900">J*** P***</span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <button
            className="w-full py-4 rounded-2xl font-bold text-[15px] text-white bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_8px_20px_rgba(225,29,72,0.3)] active:scale-95 transition-transform"
            onClick={async () => {
              navigate('/mobile/pagos/procesando');
              await submitPayment();
              navigate('/mobile/pagos/comprobante', { replace: true });
            }}
          >
            Confirmar y Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

function MobilePaymentProcessing() {
  return (
    <div className="bg-[#0B0F19] min-h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-rose-600/20 rounded-full mix-blend-screen filter blur-[60px] -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 border-4 border-white/10 border-t-rose-500 rounded-full animate-spin mb-8"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Procesando pago...</h2>
        <p className="text-gray-400 text-sm font-medium">Asegurando la transacción</p>
      </div>
    </div>
  );
}

function MobilePaymentReceipt() {
  const { draft, receiptId, resetPayment } = usePayment();
  const navigate = useNavigate();

  return (
    <div className="bg-emerald-500 min-h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 rounded-full mix-blend-screen filter blur-[40px] opacity-50 translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="px-6 flex flex-col items-center pt-20 pb-12 text-white relative z-10">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-emerald-500 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
          <Icon name="check" size={48} />
        </div>
        <h1 className="text-3xl font-extrabold mb-1">¡Pago Exitoso!</h1>
        <p className="text-emerald-100 font-medium text-[15px]">{draft.service?.name}</p>
      </div>

      <div className="bg-white flex-1 rounded-t-[2.5rem] px-8 py-10 flex flex-col relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="text-center mb-10 pb-8 border-b border-gray-100 border-dashed">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Monto Pagado</p>
          <p className="text-5xl font-extrabold text-gray-900 tracking-tight">{money(draft.amount)}</p>
        </div>

        <div className="space-y-6 mb-10">
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-500 font-medium">Suministro</span>
            <span className="text-[15px] font-bold text-gray-900">{draft.supplyNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-500 font-medium">N° de Operación</span>
            <span className="text-[15px] font-bold text-gray-900">{receiptId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-500 font-medium">Fecha</span>
            <span className="text-[15px] font-bold text-gray-900">{new Date().toLocaleDateString('es-PE')}</span>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <button className="w-full py-4 rounded-2xl font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors">
            Compartir constancia
          </button>
          <button
            className="w-full py-4 rounded-2xl font-bold text-white bg-gray-900 hover:bg-black shadow-[0_8px_20px_rgba(0,0,0,0.2)] active:scale-95 transition-transform"
            onClick={() => {
              resetPayment();
              navigate('/mobile/inicio', { replace: true });
            }}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export function MobilePayments() {
  return (
    <PaymentProvider>
      <Routes>
        <Route path="/" element={<MobilePaymentsSearch />} />
        <Route path="/detalle" element={<MobilePaymentDetail />} />
        <Route path="/monto" element={<MobilePaymentAmount />} />
        <Route path="/revisar" element={<MobilePaymentReview />} />
        <Route path="/procesando" element={<MobilePaymentProcessing />} />
        <Route path="/comprobante" element={<MobilePaymentReceipt />} />
      </Routes>
    </PaymentProvider>
  );
}
