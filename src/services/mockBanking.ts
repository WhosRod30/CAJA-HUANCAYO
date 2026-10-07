import type { Receipt, TransferDraft } from '../types/banking'
import { amountError, parseAmount } from '../utils/format'

const completed = new Map<string, Receipt>()

export async function sendMockTransfer(
  draft: TransferDraft,
  balance: number,
  simulateFailure: boolean,
): Promise<Receipt> {
  const existing = completed.get(draft.id)
  if (existing) return existing
  if (!draft.recipient) throw new Error('Selecciona un destinatario.')
  const error = amountError(draft.amount, balance)
  if (error) throw new Error(error)
  await new Promise<void>((resolve) => window.setTimeout(resolve, 1600))
  if (simulateFailure)
    throw new Error(
      'No pudimos completar la operación. Tu saldo no cambió. Inténtalo nuevamente.',
    )
  const receipt: Receipt = {
    id: draft.id,
    operation: `DEMO-${draft.id.slice(0, 8).toUpperCase()}`,
    recipient: draft.recipient,
    amount: parseAmount(draft.amount)!,
    note: draft.note.trim(),
    date: new Date().toISOString(),
  }
  completed.set(draft.id, receipt)
  return receipt
}
