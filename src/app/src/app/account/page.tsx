'use client'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { api } from '@/services/api'
import { Loading } from '@/components/Loading'
import { useState } from 'react'

interface Inputs {
  nome: String
  sobrenome: String
  email: String
  senha: String
}

export default function Account() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    setLoading(true)

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      setLoading(false)

      if (response?.status === 200) {
        toast.success('Conta criada com sucesso!', {
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
        })
        router.push('/login')
      } else {
        toast.error('Não foi possível criar a conta', {
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
        })
      }
    } catch (error) {
      toast.error('Não foi possível criar a conta', {
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
      })
    }
  }

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loading size={100} style="text-black" />
        </div>
      </main>
    )
  }

  return (
    <main className="mt-2 max-w-screen-xl m-auto h-full p-4 md:p-6 lg:p-8">
      <div className="text-center font-bold text-4xl mb-4 mt-8 sm:mb-4 md:mb-6">
        <p>Crie sua conta e comece a praticar</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="hidden md:flex justify-center w-full leading-none lg:pl-16">
          <Image
            src="/account.svg"
            alt="Person with a security code"
            width={418}
            height={355}
            className="select-none mt-4 text-center"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full sm:mt-20">
          <form id="form-login" onSubmit={handleSubmit(onSubmit)} className="w-full md:w-2/3 lg:w-5/6">
            <div className="mb-4">
              <label htmlFor="nome" className="block mb-2 font-medium">
                Nome:
              </label>
              <input
                type="nome"
                id="nome"
                className="w-full px-3 py-2 text-black border rounded-md focus:outline-none ring-2 ring-black"
                placeholder="John"
                {...register('nome', { required: true })}
              />
              {errors.nome && <span>Este campo é obrigatório</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="sobrenome" className="block mb-2 font-medium">
                Sobrenome:
              </label>
              <input
                type="sobrenome"
                id="sobrenome"
                className="w-full px-3 py-2 text-black border rounded-md focus:outline-none ring-2 ring-black"
                placeholder="Doe"
                {...register('sobrenome', { required: true })}
              />
              {errors.sobrenome && <span>Este campo é obrigatório</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                E-mail:
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 text-black border rounded-md focus:outline-none ring-2 ring-black"
                placeholder="email@example.com"
                {...register('email', { required: true })}
              />
              {errors.email && <span>Insira um e-mail válido</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 font-medium">
                Senha:
              </label>
              <input
                type="password"
                id="senha"
                className="w-full px-3 py-2 text-black border rounded-md focus:outline-none ring-2 ring-black"
                placeholder="Digite sua senha..."
                {...register('senha', { required: true })}
              />

              {errors.senha && <span>Este campo é obrigatório</span>}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-950 text-white hover:bg-orange text-withe font-bold rounded hover:bg-sky-800"
            >
              Criar conta
            </button>
          </form>
          <div className="flex flex-col items-center">
            <div className="text-xl pt-4">
              <p>ou</p>
            </div>
            <div className="text-xl underline pt-4">
              <Link href="/login" className="hover:text-sky-800">
                Retornar ao login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
