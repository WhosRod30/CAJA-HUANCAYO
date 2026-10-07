export const money = (cents: number) =>
  new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
    cents / 100,
  )

export const shortDate = (date: string) =>
  new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    timeZone: 'America/Lima',
  }).format(new Date(date))

export const fullDate = (date: string) =>
  new Intl.DateTimeFormat('es-PE', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Lima',
  }).format(new Date(date))

export const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

export function parseAmount(value: string): number | null {
  const normalized = value.trim().replace(',', '.')
  if (!/^\d+(?:\.\d{0,2})?$/.test(normalized)) return null
  const [units, decimals = ''] = normalized.split('.')
  const cents = Number(units) * 100 + Number(decimals.padEnd(2, '0'))
  return Number.isSafeInteger(cents) ? cents : null
}

export function amountError(value: string, balance: number): string {
  if (!value.trim()) return 'Ingresa un monto.'
  if (/^-\d+(?:[.,]\d{0,2})?$/.test(value.trim()))
    return 'El monto debe ser mayor a S/ 0.'
  const cents = parseAmount(value)
  if (cents === null) return 'Ingresa un monto válido con hasta dos decimales.'
  if (cents <= 0) return 'El monto debe ser mayor a S/ 0.'
  if (cents > balance)
    return 'No cuentas con saldo suficiente. Ingresa un monto menor.'
  return ''
}
