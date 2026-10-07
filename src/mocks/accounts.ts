import type { Account } from '../types/banking'

// All amounts are integer céntimos, to avoid rounding errors.
export const demoAccount: Account = {
  id: 'demo-savings',
  name: 'Cuenta de Ahorros',
  number: 'DEMO-1024',
  balance: 245080,
}
