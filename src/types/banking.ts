export interface Account {
  id: string
  name: string
  number: string
  balance: number
}

export interface Recipient {
  id: string
  name: string
  bank: string
  account: string
  phone: string
  initials: string
  color: string
  own?: boolean
}

export interface Transaction {
  id: string
  name: string
  detail: string
  amount: number
  date: string
  kind: 'incoming' | 'outgoing'
}

export interface TransferDraft {
  id: string
  recipient: Recipient | null
  amount: string
  note: string
}

export interface Receipt {
  id: string
  operation: string
  recipient: Recipient
  amount: number
  note: string
  date: string
}

export type TransferStatus = 'idle' | 'pending' | 'success' | 'error'
