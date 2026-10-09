import { createContext, useContext } from 'react'
import type {
  Account,
  Receipt,
  Recipient,
  Transaction,
  TransferDraft,
  TransferStatus,
} from '../types/banking'

export interface BankingState {
  account: Account
  transactions: Transaction[]
  draft: TransferDraft
  status: TransferStatus
  error: string
  receipts: Receipt[]
  lastReceipt: Receipt | null
  favorites: string[]
  failNext: boolean
}

export interface BankingContextValue extends BankingState {
  beginTransfer: (recipient?: Recipient) => void
  selectRecipient: (recipient: Recipient) => void
  updateDraft: (
    changes: Partial<Pick<TransferDraft, 'amount' | 'note'>>,
  ) => void
  recordPayment: (transaction: Transaction) => void
  submitTransfer: () => Promise<void>
  toggleFavorite: (id: string) => void
  setFailNext: (value: boolean) => void
  clearFavorites: () => void
  restoreFavorites: () => void
}

export const BankingContext = createContext<BankingContextValue | null>(null)

export function useBanking() {
  const context = useContext(BankingContext)
  if (!context) throw new Error('BankingProvider is required')
  return context
}


