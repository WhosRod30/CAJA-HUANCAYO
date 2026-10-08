import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { useBanking } from '../../app/bankingContext';
import { demoRecipients } from '../../mocks/recipients';

// Utility for money that respects currency
function formatCurrency(amount: number, currency: 'PEN' | 'USD') {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

function MobileTransfersSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { beginTransfer, selectRecipient } = useBanking();

  const filtered = demoRecipients.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.account.includes(query) ||
      (r.phone && r.phone.includes(query))
  );

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="bg-[#0B0F19] pt-12 pb-8 px-6 rounded-b-[2rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/20 rounded-full mix-blend-screen filter blur-[60px] translate-x-1/3 -translate-y-1/2"></div>
        <div className="relative z-10">
          <button onClick={() => navigate('/mobile/inicio')} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white mb-6 backdrop-blur-md border border-white/10">
            <Icon name="back" size={20} />
          </button>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Transferir</h1>
          <p className="text-gray-400 text-sm">Envía dinero en segundos</p>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-20 mb-8">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-2 flex items-center gap-3 border border-gray-100 focus-within:ring-2 focus-within:ring-rose-500 transition-shadow">
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 ml-1">
            <Icon name="search" size={20} />
          </div>
          <input
            type="search"
            placeholder="Nombre, celular o cuenta..."
            className="w-full py-3 pr-4 outline-none text-gray-900 bg-transparent text-[15px] font-medium placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="px-6 pb-8">
        <h2 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
          {query ? 'Resultados' : 'Contactos Frecuentes'}
        </h2>
        <div className="flex flex-col gap-3">
          {filtered.length > 0 ? (
            filtered.map((recipient) => (
              <button
                key={recipient.id}
                onClick={() => {
                  beginTransfer();
                  selectRecipient(recipient);
                  navigate('/mobile/transferencias/monto');
                }}
                className="bg-white rounded-[1.5rem] p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 flex items-center justify-between active:scale-95 transition-transform group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center text-rose-700 font-bold text-lg border border-rose-100">
                    {recipient.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 text-[15px]">{recipient.name}</h3>
                    <p className="text-xs font-medium text-gray-400 mt-0.5">{recipient.bank} • {recipient.account.slice(-4)}</p>
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
              <p className="text-gray-500 font-medium">No se encontraron contactos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileTransfersAmount() {
  const { draft, updateDraft } = useBanking();
  const [amountStr, setAmountStr] = useState(draft.amount ? draft.amount.toString() : '');
  const [currency, setCurrency] = useState<'PEN' | 'USD'>('PEN');
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
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
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-4 mb-8 mt-6">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <Icon name="check" size={20} />
          </div>
          <div>
            <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">Identidad verificada</p>
            <p className="text-emerald-900 font-bold">{draft.recipient?.name}</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">¿Cuánto enviarás?</h2>
          <p className="text-sm text-gray-500 font-medium">
            Saldo disponible: {formatCurrency(currency === 'PEN' ? 1500.00 : 450.00, currency)}
          </p>
        </div>

        {/* Selector de Moneda */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-full flex gap-1">
            <button
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                currency === 'PEN' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
              onClick={() => setCurrency('PEN')}
            >
              Soles (S/)
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                currency === 'USD' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
              onClick={() => setCurrency('USD')}
            >
              Dólares ($)
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 mb-12">
          <span className="text-4xl font-semibold text-gray-300">{currency === 'PEN' ? 'S/' : '$'}</span>
          <input
            type="number"
            className="w-48 text-6xl font-extrabold text-gray-900 outline-none text-center bg-transparent tracking-tight placeholder-gray-200"
            placeholder="0"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            autoFocus
          />
        </div>

        <div className="mt-auto pb-8">
          <button
            className={`w-full py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 ${
              parseFloat(amountStr) > 0 
                ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-[0_8px_20px_rgba(225,29,72,0.3)] active:scale-95' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!parseFloat(amountStr) || parseFloat(amountStr) <= 0}
            onClick={() => {
              updateDraft({ amount: parseFloat(amountStr) });
              navigate('/mobile/transferencias/revisar', { state: { currency } });
            }}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileTransfersReview() {
  const { draft, submitTransfer } = useBanking();
  const navigate = useNavigate();
  const location = useLocation();
  const currency = location.state?.currency || 'PEN';

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
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Confirma tu envío</h2>

        <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
          <div className="text-center mb-8 pb-8 border-b border-gray-100 border-dashed">
            <p className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Monto a enviar</p>
            <p className="text-5xl font-extrabold text-gray-900 tracking-tight">{formatCurrency(draft.amount || 0, currency)}</p>
          </div>
          
          <div className="space-y-5">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <span className="text-[15px] text-gray-500 font-medium">Destinatario</span>
              <span className="text-[15px] font-bold text-gray-900">{draft.recipient?.name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <span className="text-[15px] text-gray-500 font-medium">Banco</span>
              <span className="text-[15px] font-bold text-gray-900">{draft.recipient?.bank}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[15px] text-gray-500 font-medium">Cuenta</span>
              <span className="text-[15px] font-bold text-gray-900">•••• {draft.recipient?.account?.slice(-4)}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <button
            className="w-full py-4 rounded-2xl font-bold text-[15px] text-white bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_8px_20px_rgba(225,29,72,0.3)] active:scale-95 transition-transform"
            onClick={async () => {
              navigate('/mobile/transferencias/procesando', { state: { currency } });
            }}
          >
            Transferir ahora
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileTransfersProcessing() {
  const navigate = useNavigate();
  const { submitTransfer } = useBanking();
  const location = useLocation();
  const currency = location.state?.currency || 'PEN';

  useEffect(() => {
    // Artificial delay to show the loader, then execute actual submission
    const processTransfer = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      await submitTransfer();
      navigate('/mobile/transferencias/comprobante', { replace: true, state: { currency } });
    };
    processTransfer();
  }, [navigate, submitTransfer, currency]);

  return (
    <div className="bg-[#0B0F19] min-h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-rose-600/20 rounded-full mix-blend-screen filter blur-[60px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 border-4 border-white/10 border-t-rose-500 rounded-full animate-spin mb-8"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Procesando...</h2>
        <p className="text-gray-400 text-sm font-medium">Conectando de forma segura</p>
      </div>
    </div>
  );
}

function MobileTransfersReceipt() {
  const { draft } = useBanking();
  const navigate = useNavigate();
  const location = useLocation();
  const currency = location.state?.currency || 'PEN';

  return (
    <div className="bg-emerald-500 min-h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 rounded-full mix-blend-screen filter blur-[40px] opacity-50 translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="px-6 flex flex-col items-center pt-20 pb-12 text-white relative z-10">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-emerald-500 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
          <Icon name="check" size={48} />
        </div>
        <h1 className="text-3xl font-extrabold mb-1">¡Transferencia Exitosa!</h1>
        <p className="text-emerald-100 font-medium text-[15px]">A {draft.recipient?.name}</p>
      </div>

      <div className="bg-white flex-1 rounded-t-[2.5rem] px-8 py-10 flex flex-col relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="text-center mb-10 pb-8 border-b border-gray-100 border-dashed">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Monto Enviado</p>
          <p className="text-5xl font-extrabold text-gray-900 tracking-tight">{formatCurrency(draft.amount || 0, currency)}</p>
        </div>

        <div className="space-y-6 mb-10">
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-500 font-medium">Cuenta Destino</span>
            <span className="text-[15px] font-bold text-gray-900">•••• {draft.recipient?.account?.slice(-4)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-500 font-medium">N° de Operación</span>
            <span className="text-[15px] font-bold text-gray-900">TRX-{Math.floor(Math.random() * 1000000)}</span>
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
            onClick={() => navigate('/mobile/inicio', { replace: true })}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export function MobileTransfers() {
  return (
    <Routes>
      <Route path="/" element={<MobileTransfersSearch />} />
      <Route path="/monto" element={<MobileTransfersAmount />} />
      <Route path="/revisar" element={<MobileTransfersReview />} />
      <Route path="/procesando" element={<MobileTransfersProcessing />} />
      <Route path="/comprobante" element={<MobileTransfersReceipt />} />
    </Routes>
  );
}
