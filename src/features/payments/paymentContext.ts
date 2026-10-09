import { createContext, useContext } from 'react'
export interface ServiceItem { id: string; name: string; category: string; icon?: string; requiresAmount?: boolean }
// La entrada se conserva en soles; el estado bancario usa céntimos.
export interface PaymentDraft { service: ServiceItem | null; supplyNumber: string; amount: number }
export interface PaymentReceipt { id: string; service: ServiceItem; supplyNumber: string; amountCents: number; date: string }
export interface PaymentContextValue {
  draft: PaymentDraft
  status: 'idle' | 'pending' | 'success' | 'error'
  error: string
  receipt: PaymentReceipt | null
  receiptId: string | null
  updateDraft: (changes: Partial<PaymentDraft>) => void
  startPayment: (service: ServiceItem) => void
  submitPayment: () => Promise<string>
  resetPayment: () => void
}
export const PaymentContext = createContext<PaymentContextValue | null>(null)
export function usePayment() {
  const context = useContext(PaymentContext)
  if (!context) throw new Error('PaymentProvider requerido')
  return context
}
