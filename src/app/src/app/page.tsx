'use client'
import Footer from '@/components/Footer'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState('estudante')
  const users = [
    'professor',
    'aluno',
    'concurseiro',
    'vestibulando',
    'universitário',
    'coordenador',
    'acadêmico',
    'bibliotecário',
  ]

  // redirecionar para o dashboard
  if (session) {
    redirect('/dashboard')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(users[(Math.random() * users.length) | 0])
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <main className="min-h-full flex h-screen flex-col justify-between">
      <section className="p-2 flex justify-center items-center flex-col" style={{ height: '80vh' }}>
        <Image alt="People driking coffee" src="/home.svg" width={300} height={150} className="p-4" />
        <div className="font-sans font-bold text-3xl sm:text-4xl">
          <div className="flex flex-row justify-center">
            <div className="mr-3">Todo</div>
            <motion.div animate={{ y: [-5, 5] }} transition={{ repeat: Infinity, duration: 2 }}>
              <div className="text-sky-700 text-4xl font-bold">{user}</div>
            </motion.div>
          </div>
          <div className="text-center">
            tem uma aba do <b>repeti</b> aberta
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-2xl underline pt-4 hover:text-sky-800">
            Entrar agora
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
