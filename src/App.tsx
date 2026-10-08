import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BankingProvider } from './app/BankingProvider'
import { AppLayout } from './layouts/AppLayout'
import { HomePage } from './pages/HomePage'
import { Dashboard } from './pages/Dashboard'
import { Transfers } from './pages/Transfers'
import { Movements } from './pages/Movements'
import { Recipients } from './pages/Recipients'
import { Help } from './pages/Help'
import { TransferGuard } from './features/transfers/TransferFrame'
import { RecipientStep } from './features/transfers/RecipientStep'
import { AmountStep } from './features/transfers/AmountStep'
import { ReviewStep } from './features/transfers/ReviewStep'
import { ProcessingStep } from './features/transfers/ProcessingStep'
import { ReceiptStep } from './features/transfers/ReceiptStep'
import { Payments } from './pages/Payments'
import { PaymentProvider } from './features/payments/PaymentProvider'
import { PaymentFrame } from './features/payments/PaymentFrame'
import { PaymentDetailStep } from './features/payments/PaymentDetailStep'
import { PaymentAmountStep } from './features/payments/PaymentAmountStep'
import { PaymentReviewStep } from './features/payments/PaymentReviewStep'
import { PaymentProcessingStep } from './features/payments/PaymentProcessingStep'
import { PaymentReceiptStep } from './features/payments/PaymentReceiptStep'

// Mobile Imports
import { MobileLayout } from './layouts/mobile/MobileLayout'
import { MobileDashboard } from './pages/mobile/MobileDashboard'
import { MobileLogin } from './pages/mobile/MobileLogin'
import { MobileQRScanner } from './pages/mobile/MobileQRScanner'
import { MobilePayments } from './pages/mobile/MobilePayments'
import { MobileTransfers } from './pages/mobile/MobileTransfers'
import { MobileLoans } from './pages/mobile/MobileLoans'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <BankingProvider>
        <PaymentProvider>
          <Routes>
          <Route path="/" element={<Navigate to="/mobile/login" replace />} />
          <Route path="inicio" element={<HomePage />} />
          
          {/* RUTAS MOBILE (EXCLUSIVO PARA REDISEÑO MOBILE APF2) */}
          <Route path="mobile" element={<MobileLayout />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<MobileLogin />} />
            <Route path="inicio" element={<MobileDashboard />} />
            <Route path="qr" element={<MobileQRScanner />} />
            <Route path="pagos/*" element={<MobilePayments />} />
            <Route path="transferencias/*" element={<MobileTransfers />} />
            <Route path="prestamos" element={<MobileLoans />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route path="caja-virtual" element={<Dashboard />} />
            <Route path="transferencias" element={<Transfers />} />
            <Route
              path="transferencias/destinatario"
              element={
                <TransferGuard step={1}>
                  <RecipientStep />
                </TransferGuard>
              }
            />
            <Route
              path="transferencias/monto"
              element={
                <TransferGuard step={2}>
                  <AmountStep />
                </TransferGuard>
              }
            />
            <Route
              path="transferencias/revisar"
              element={
                <TransferGuard step={3}>
                  <ReviewStep />
                </TransferGuard>
              }
            />
            <Route
              path="transferencias/procesando"
              element={<ProcessingStep />}
            />
            <Route
              path="transferencias/comprobante/:id"
              element={<ReceiptStep />}
            />

            {/* RUTAS DE PAGOS (APF2) */}
            <Route path="pagos" element={<Payments />} />
            <Route path="pagos/detalle" element={<PaymentFrame step={1}><PaymentDetailStep /></PaymentFrame>} />
            <Route path="pagos/monto" element={<PaymentFrame step={2}><PaymentAmountStep /></PaymentFrame>} />
            <Route path="pagos/revisar" element={<PaymentFrame step={3}><PaymentReviewStep /></PaymentFrame>} />
            <Route path="pagos/procesando" element={<PaymentFrame step={4}><PaymentProcessingStep /></PaymentFrame>} />
            <Route path="pagos/comprobante" element={<PaymentFrame step={5}><PaymentReceiptStep /></PaymentFrame>} />

            <Route path="movimientos" element={<Movements />} />
            <Route path="destinatarios" element={<Recipients />} />
            <Route path="ayuda" element={<Help />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        </PaymentProvider>
      </BankingProvider>
    </BrowserRouter>
  )
}

export default App
