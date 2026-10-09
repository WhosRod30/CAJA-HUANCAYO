import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { PaymentContext } from './paymentContext'
import type { PaymentContextValue, PaymentDraft, PaymentReceipt, ServiceItem } from './paymentContext'
import { useBanking } from '../../app/bankingContext'
import { amountError, parseAmount } from '../../utils/format'

const emptyDraft: PaymentDraft = { service: null, supplyNumber: '', amount: 0 }
export function PaymentProvider({ children, webPayments = false }: { children: ReactNode; webPayments?: boolean }) {
  const bank = useBanking()
  const [draft, setDraft] = useState<PaymentDraft>(emptyDraft)
  const [status, setStatus] = useState<PaymentContextValue['status']>('idle')
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null)
  const inFlight = useRef<Promise<string> | null>(null)
  const completed = useRef<PaymentReceipt | null>(null)
  function updateDraft(changes: Partial<PaymentDraft>) {
    if (inFlight.current || completed.current) return
    setDraft((previous) => ({ ...previous, ...changes }))
    setError('')
    setStatus('idle')
  }
  function startPayment(service: ServiceItem) {
    if (inFlight.current) return
    completed.current = null
    setDraft({ ...emptyDraft, service }); setStatus('idle'); setError(''); setReceipt(null)
  }
  function resetPayment() {
    if (inFlight.current) return
    completed.current = null
    setDraft(emptyDraft); setStatus('idle'); setError(''); setReceipt(null)
  }
  function submitPayment(): Promise<string> {
    if (inFlight.current) return inFlight.current
    if (completed.current) return Promise.resolve(completed.current.id)
    const cents = parseAmount(String(draft.amount))
    const validation = !draft.service ? 'Selecciona un servicio.'
      : !/^\d{5,20}$/.test(draft.supplyNumber.trim()) ? 'Ingresa un suministro de 5 a 20 dígitos.'
      : amountError(String(draft.amount), webPayments ? bank.account.balance : Number.MAX_SAFE_INTEGER)
    if (validation || cents === null) {
      setStatus('error'); setError(validation || 'Ingresa un monto válido.'); return Promise.resolve('')
    }
    const payment: PaymentReceipt = { id: `PAG-${crypto.randomUUID()}`, service: draft.service!, supplyNumber: draft.supplyNumber.trim(), amountCents: cents, date: '' }
    setStatus('pending'); setError('')
    const operation = new Promise<void>((resolve) => window.setTimeout(resolve, 1600))
      .then(() => {
        payment.date = new Date().toISOString()
        if (webPayments) bank.recordPayment({ id: payment.id, name: payment.service.name, detail: `Pago de servicio · ${payment.supplyNumber}`, amount: payment.amountCents, date: payment.date, kind: 'outgoing' })
        completed.current = payment
        setReceipt(payment); setStatus('success')
        return payment.id
      })
      .catch((failure: unknown) => {
        setStatus('error')
        setError(failure instanceof Error ? failure.message : 'No se completó el pago. Tu saldo no cambió. Intenta nuevamente.')
        return ''
      })
      .finally(() => { inFlight.current = null })
    inFlight.current = operation
    return operation
  }
  return <PaymentContext.Provider value={{ draft, status, error, receipt, receiptId: receipt?.id ?? null, updateDraft, startPayment, submitPayment, resetPayment }}>{children}</PaymentContext.Provider>
}

