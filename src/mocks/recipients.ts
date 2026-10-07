import type { Recipient } from '../types/banking'

// Fictitious examples. The prototype only recognizes these recipients.
export const demoRecipients: Recipient[] = [
  {
    id: 'maria',
    name: 'María Torres',
    bank: 'Caja Huancayo',
    account: '001000004582',
    phone: '900000101',
    initials: 'MT',
    color: 'rose',
  },
  {
    id: 'carlos',
    name: 'Carlos Mendoza',
    bank: 'BCP',
    account: '002000008120',
    phone: '900000102',
    initials: 'CM',
    color: 'blue',
  },
  {
    id: 'andrea',
    name: 'Andrea Salazar',
    bank: 'Caja Huancayo',
    account: '001000002647',
    phone: '900000103',
    initials: 'AS',
    color: 'sage',
  },
  {
    id: 'own',
    name: 'Mi otra cuenta',
    bank: 'Caja Huancayo',
    account: '001000007310',
    phone: '',
    initials: 'YO',
    color: 'sand',
    own: true,
  },
]
