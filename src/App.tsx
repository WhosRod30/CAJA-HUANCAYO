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
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <BankingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="inicio" element={<HomePage />} />
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
            <Route path="movimientos" element={<Movements />} />
            <Route path="destinatarios" element={<Recipients />} />
            <Route path="ayuda" element={<Help />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BankingProvider>
    </BrowserRouter>
  )
}

export default App
