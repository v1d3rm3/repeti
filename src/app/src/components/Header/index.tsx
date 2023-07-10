'use client'
import Link from 'next/link'
import { SignInButton } from '../SignInButton'
import Logo from '../Logo/index'
import { useSession } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-blue-950 justify-center items-center">
      <div className="flex flex-row max-w-screen-2xl m-auto justify-between p-3">
        <div className="flex flex-row items-center text-slate-200 justify-between">
          <Logo />
          <nav className="hidden w-3/4 font-sans text-md select-none md:block lg:block">
            {!session ? (
              <Link href="/" className="pr-10">
                Página Inicial
              </Link>
            ) : (
              <Link href="/dashboard" className="pr-10">
                Dashboard
              </Link>
            )}
            <Link href="/privacy" className="pr-10">
              Política de Privacidade
            </Link>
            <Link href="/help" className="pr-10">
              Suporte
            </Link>
            <Link href="/about">Sobre</Link>
          </nav>
        </div>
        <div className="flex justify-center items-center">
          <SignInButton />
        </div>
      </div>
    </header>
  )
}
