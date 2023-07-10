'use client'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
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
      <section className="flex flex-col justify-center items-center min-h-full p-2 ">
        <div className="font-sans font-bold text-3xl mb-16 sm:text-4xl">
          <div className="flex flex-row justify-center">
            <div className="mr-3">Todo</div>
            <motion.div animate={{ y: [-5, 5] }} transition={{ repeat: Infinity, duration: 2 }}>
              <div className="text-sky-700">{user}</div>
            </motion.div>
          </div>
          <div className="text-center">tem uma aba do repetir aberta</div>
        </div>
        <Image alt="People driking coffee" src="/home.svg" width={600} height={600} className="p-4" />
      </section>

      <Footer />
    </main>
  )
}
