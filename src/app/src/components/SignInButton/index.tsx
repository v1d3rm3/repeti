'use client'
import { Fingerprint, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loading } from '../Loading'

export function SignInButton() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <Loading size={20} style="text-white" />
  }

  return session ? (
    <button
      className="flex flex-row items-center align-middle rounded-full bg-white border-0 box-border h-8 p-2"
      type="button"
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      <LogOut className="text-blue-950 pr-3" size={35} />
      <span className="font-sans">Sair</span>
    </button>
  ) : (
    <button
      className="flex flex-row items-center align-middle rounded-full bg-white border-0 box-border h-8 p-2"
      type="button"
      onClick={() => router.push('/login')}
    >
      <Fingerprint className="text-blue-950 pr-3" size={30} />
      <span className="font-sans">Entrar</span>
    </button>
  )
}
