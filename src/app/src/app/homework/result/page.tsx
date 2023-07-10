'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Result() {
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [rigthAnswers, setRigthAnswers] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchTotalizers = async () => {
      setTotalQuestions(Number.parseInt(localStorage.getItem('total-questions')!))
      setRigthAnswers(Number.parseInt(localStorage.getItem('rigth-answers')!))
    }
    fetchTotalizers()
  }, [])

  return (
    <main className="mt-2 max-w-screen-xl m-auto h-screen p-4 md:p-6 lg:p-8">
      <div className="flex flex-col items-center pt-16 h-full">
        <Image src="/result.svg" alt="Person with password" width={418} height={355} className="pb-12" />
        <div className="flex flex-col">
          <span className="text-2xl font-serif text-center">Seu resultado foi o seguinte</span>
          <span className="text-3xl font-sans font-bold text-center">
            Você acertou <span className="text-green-800">{(rigthAnswers / totalQuestions) * 100} %</span> das questões!
          </span>
        </div>
        <div className="fixed bottom-0 right-0 w-full p-4 lg:text-center lg:bottom-1/4">
          <button
            className="w-full bg-blue-950 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded lg:w-fit lg:mr-8"
            onClick={() => router.push('/dashboard')}
          >
            Voltar aos meus estudos
          </button>
        </div>
      </div>
    </main>
  )
}
