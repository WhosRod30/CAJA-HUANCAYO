import { createContext, useContext } from 'react'

export interface WebSession {
  signedIn: boolean
  signIn: (document: string, password: string) => boolean
  signOut: () => void
}
export const WebSessionContext = createContext<WebSession | null>(null)
export function useWebSession() {
  const session = useContext(WebSessionContext)
  if (!session) throw new Error('WebSessionProvider requerido')
  return session
}
