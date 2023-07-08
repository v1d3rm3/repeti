'use client'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

export interface AuthProps {
  children: React.ReactNode
  session: Session | null
}

export default function Auth({ children }: AuthProps) {
  return <SessionProvider>{children}</SessionProvider>
}
