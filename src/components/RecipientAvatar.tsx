import type { Recipient } from '../types/banking'
export function RecipientAvatar({
  recipient,
  small = false,
}: {
  recipient: Recipient
  small?: boolean
}) {
  return (
    <span
      aria-hidden="true"
      className={`avatar ${recipient.color} ${small ? 'avatar-small' : ''}`}
    >
      {recipient.initials}
    </span>
  )
}
