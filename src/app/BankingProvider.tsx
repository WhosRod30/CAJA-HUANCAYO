import { useReducer, useRef } from 'react'
import type { ReactNode } from 'react'
import { BankingContext } from './bankingContext'
import type { BankingState } from './bankingContext'
import { demoAccount } from '../mocks/accounts'
import { demoTransactions } from '../mocks/transactions'
import { sendMockTransfer } from '../services/mockBanking'
import type { Receipt, Recipient, TransferDraft, Transaction } from '../types/banking'

type Action =
  | { type: 'payment'; transaction: Transaction }
  | { type: 'begin'; draft: TransferDraft }
  | { type: 'recipient'; recipient: Recipient }
  | { type: 'draft'; changes: Partial<Pick<TransferDraft, 'amount' | 'note'>> }
  | { type: 'pending' }
  | { type: 'success'; receipt: Receipt }
  | { type: 'error'; message: string }
  | { type: 'favorite'; id: string }
  | { type: 'favorites'; ids: string[] }
  | { type: 'failNext'; value: boolean }

const initial: BankingState = {
  account: demoAccount,
  transactions: demoTransactions,
  draft: { id: '', recipient: null, amount: '', note: '' },
  status: 'idle',
  error: '',
  receipts: [],
  lastReceipt: null,
  favorites: ['maria', 'carlos', 'andrea'],
  failNext: false,
}

function reducer(state: BankingState, action: Action): BankingState {
  switch (action.type) {
    case 'payment':
      if (state.transactions.some((item) => item.id === action.transaction.id)) return state
      return { ...state, account: { ...state.account, balance: state.account.balance - action.transaction.amount }, transactions: [action.transaction, ...state.transactions] }
    case 'begin':
      return {
        ...state,
        draft: action.draft,
        status: 'idle',
        error: '',
        lastReceipt: null,
      }
    case 'recipient':
      return {
        ...state,
        draft: { ...state.draft, recipient: action.recipient },
      }
    case 'draft':
      return { ...state, draft: { ...state.draft, ...action.changes } }
    case 'pending':
      return { ...state, status: 'pending', error: '', failNext: false }
    case 'success': {
      if (state.receipts.some((r) => r.id === action.receipt.id))
        return { ...state, status: 'success', lastReceipt: action.receipt }
      const receipt = action.receipt
      return {
        ...state,
        status: 'success',
        lastReceipt: receipt,
        receipts: [receipt, ...state.receipts],
        account: {
          ...state.account,
          balance: state.account.balance - receipt.amount,
        },
        transactions: [
          {
            id: receipt.id,
            name: receipt.recipient.name,
            detail: `Transferencia · ${receipt.recipient.bank}`,
            amount: receipt.amount,
            date: receipt.date,
            kind: 'outgoing',
          },
          ...state.transactions,
        ],
      }
    }
    case 'error':
      return { ...state, status: 'error', error: action.message }
    case 'favorite':
      return {
        ...state,
        favorites: state.favorites.includes(action.id)
          ? state.favorites.filter((id) => id !== action.id)
          : [...state.favorites, action.id],
      }
    case 'favorites':
      return { ...state, favorites: action.ids }
    case 'failNext':
      return { ...state, failNext: action.value }
  }
}

export function BankingProvider({ children }: { children: ReactNode }) {
  const [state, reactDispatch] = useReducer(reducer, initial)
  const stateRef = useRef(initial)
  function dispatch(action: Action) {
    stateRef.current = reducer(stateRef.current, action)
    reactDispatch(action)
  }
  const inFlight = useRef<Promise<void> | null>(null)

  function beginTransfer(recipient?: Recipient) {
    if (inFlight.current) return
    dispatch({
      type: 'begin',
      draft: {
        id: crypto.randomUUID(),
        recipient: recipient ?? null,
        amount: '',
        note: '',
      },
    })
  }

  function submitTransfer(): Promise<void> {
    if (inFlight.current) return inFlight.current
    dispatch({ type: 'pending' })
    const operation = sendMockTransfer(
      state.draft,
      state.account.balance,
      state.failNext,
    )
      .then((receipt) => dispatch({ type: 'success', receipt }))
      .catch((error: unknown) =>
        dispatch({
          type: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'No pudimos completar la operación. Inténtalo nuevamente.',
        }),
      )
      .finally(() => {
        inFlight.current = null
      })
    inFlight.current = operation
    return operation
  }

  return (
    <BankingContext.Provider
      value={{
        ...state,
        beginTransfer,
        submitTransfer,
        recordPayment: (transaction) => {
          if (stateRef.current.transactions.some((item) => item.id === transaction.id)) return
          if (inFlight.current) throw new Error('Espera a que termine la transferencia antes de pagar. Tu saldo no cambió.')
          if (!Number.isSafeInteger(transaction.amount) || transaction.amount <= 0 || transaction.amount > stateRef.current.account.balance) throw new Error('No cuentas con saldo suficiente para este pago. Tu saldo no cambió.')
          dispatch({ type: 'payment', transaction })
        },
        selectRecipient: (recipient) =>
          dispatch({ type: 'recipient', recipient }),
        updateDraft: (changes) => dispatch({ type: 'draft', changes }),
        toggleFavorite: (id) => dispatch({ type: 'favorite', id }),
        setFailNext: (value) => dispatch({ type: 'failNext', value }),
        clearFavorites: () => dispatch({ type: 'favorites', ids: [] }),
        restoreFavorites: () =>
          dispatch({ type: 'favorites', ids: ['maria', 'carlos', 'andrea'] }),
      }}
    >
      {children}
    </BankingContext.Provider>
  )
}


