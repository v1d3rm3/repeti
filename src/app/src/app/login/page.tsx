'use client'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { setCookie } from 'typescript-cookie'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { data: session } = useSession()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const response = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (!response?.error) {
      setCookie('token', session?.user?.name)
      toast.success('Login realizado com sucesso!')
      router.push('/dashboard')
    } else {
      toast.error('Não foi possível realizar o login')
    }
  }

  return (
    <main className="mt-2 max-w-screen-xl m-auto h-full p-4 md:p-6 lg:p-8">
      <div className="text-center font-bold text-4xl mb-4 mt-8 sm:mb-4 md:mb-6">
        <p>
          Faça <span className="text-yellow">login </span>
          <span className="hidden md:inline">
            ou <span className="text-yellow">crie</span> sua conta
          </span>
        </p>
        <p className="md:hidden">
          ou <span className="text-yellow">crie</span> sua conta
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="hidden md:flex justify-center w-full leading-none lg:pl-16">
          <Image
            src="/login.svg"
            alt="Person with password"
            width={418}
            height={355}
            className="select-none mt-4 text-center"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full sm:mt-20">
          <form id="form-login" onSubmit={handleSubmit} className="w-full md:w-2/3 lg:w-5/6">
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                E-mail:
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 text-black border rounded-md focus:outline-none ring-2 ring-black"
                value={email}
                placeholder="email@example.com"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 font-medium">
                Senha:
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 text-black border rounded-md focus:outline-none ring-2 ring-black"
                value={password}
                placeholder="Digite sua senha..."
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-950 text-white hover:bg-orange text-withe font-bold rounded hover:bg-sky-800"
            >
              Login
            </button>
          </form>
          <div className="flex flex-col items-center">
            <div className="text-xl pt-4">
              <p>ou</p>
            </div>
            <div className="text-xl underline pt-4">
              <Link href="/account" className="hover:text-sky-800">
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
