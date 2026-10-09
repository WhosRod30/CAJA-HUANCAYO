import { useState } from 'react'
import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { WebSessionContext, useWebSession } from './webSessionContext'

const storageKey = 'caja-web-demo-session'
function readSession() {
  try { return sessionStorage.getItem(storageKey) === 'active' } catch { return false }
}
export function WebSessionProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(readSession)
  function signIn(document: string, password: string) {
    if (!['12345678', '123456789'].includes(document.trim()) || password !== '246810') return false
    try { sessionStorage.setItem(storageKey, 'active') } catch { /* Sesión en memoria */ }
    setSignedIn(true)
    return true
  }
  function signOut() {
    try { sessionStorage.removeItem(storageKey) } catch { /* Sesión en memoria */ }
    setSignedIn(false)
  }
  return <WebSessionContext.Provider value={{ signedIn, signIn, signOut }}>{children}</WebSessionContext.Provider>
}
export function RequireWebSession() {
  const { signedIn } = useWebSession()
  const location = useLocation()
  return signedIn ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />
}

