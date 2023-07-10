'use client'
import { Fingerprint, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export function SignInButton() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = (event: any) => {
    toast.success('Saindo do sistema...', {
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
    })
    signOut({ callbackUrl: '/login' })
  }

  return session ? (
    <button
      className="flex flex-row items-center pr-2 pl-2 align-middle rounded bg-white border-0 box-border hover:bg-slate-200 "
      type="button"
      onClick={handleSignOut}
    >
      <LogOut className="text-blue-950 pr-3" size={35} />
      <span className="font-sans">Sair</span>
    </button>
  ) : (
    <button
      className="flex flex-row items-center pr-2 pl-2 align-middle rounded bg-white border-0 box-border hover:bg-slate-200 "
      type="button"
      onClick={() => router.push('/login')}
    >
      <Fingerprint className="text-blue-950 pr-3" size={30} />
      <span className="font-sans">Entrar</span>
    </button>
  )
}
