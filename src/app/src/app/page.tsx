'use client'
import Footer from '@/components/Footer'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation';

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
    <main className="flex h-screen flex-col justify-start">
      <section className="min-h-full p-2">
        <div className="font-sans font-bold text-3xl mt-36 sm:text-4xl">
          <div className="flex flex-row justify-center">
            <div className="mr-3">Todo</div>
            <motion.div animate={{ y: [-5, 5] }} transition={{ repeat: Infinity, duration: 2 }}>
              <div className="text-sky-700 text-4xl font-bold">{user}</div>
            </motion.div>
          </div>
          <div className="text-center">tem uma aba do <b>repeti</b> aberta</div>
        </div>
        {/* colocar o botao para entrar..., caso esteja logado, redirecionar para o dashboard */}
        {/* <div className="flex items-start justify-center mt-16 w-full">
          <div className="flex w-full bg-white p-1 rounded shadow-lg md:p-4 lg:w-2/4">
            <input
              type="text"
              placeholder="Pesquisar"
              className="w-full px-4 py-3 text-md rounded-l items-start bg-slate-200 focus:outline-none"
            />
            <button className="px-1 py-2 bg-sky-700 text-white rounded-r sm:px-6">Buscar</button>
          </div>
        </div> */}
      </section>

      <Footer />
    </main>
  )
}
