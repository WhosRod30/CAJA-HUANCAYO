import type { Transaction } from '../types/banking'

export const demoTransactions: Transaction[] = [
  {
    id: 'initial-1',
    name: 'Depósito recibido',
    detail: 'Abono a tu cuenta de ahorros',
    amount: 180000,
    date: '2026-10-06T10:24:00-05:00',
    kind: 'incoming',
  },
  {
    id: 'initial-2',
    name: 'María Torres',
    detail: 'Transferencia · Caja Huancayo',
    amount: 8500,
    date: '2026-10-05T16:42:00-05:00',
    kind: 'outgoing',
  },
  {
    id: 'initial-3',
    name: 'Carlos Mendoza',
    detail: 'Transferencia · BCP',
    amount: 12000,
    date: '2026-10-04T09:15:00-05:00',
    kind: 'outgoing',
  },
  {
    id: 'initial-4',
    name: 'Depósito recibido',
    detail: 'Abono a tu cuenta de ahorros',
    amount: 35000,
    date: '2026-10-02T12:30:00-05:00',
    kind: 'incoming',
  },
]
