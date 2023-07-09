'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface Props {
  params: {
    slug: [studyId: number, token: string]
  }
}

export interface Question {
  enunciado: string
  alternativas: Alternative[]
}

export interface Alternative {
  id: number
  descricao: string
  resposta: number
  questaoId: number
}

export default function Homework({ params }: Props) {
  const [question, setQuestion] = useState<Question>()
  const [answer, setAnswer] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await fetch(`/api/study/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.slug[1],
        },
        body: JSON.stringify({ studyId: params.slug[0] }),
      })

      const data = await res.json()

      setQuestion(data.body)
    }

    fetchQuestion()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    toast.success('Lista finalizada com sucesso!')
    router.push('/dashboard')
  }

  const handleSelect = (event: any) => {
    setAnswer(event.target.value)
  }

  return (
    <main className="mt-2 max-w-screen-xl m-auto h-full p-4 md:p-6 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Lista de Exercícios</h1>
        <div className="bg-white shadow-md rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">{question?.enunciado}</h2>
          <div className="flex flex-col">
            {question?.alternativas?.map(alternativa => (
              <label key={alternativa.id} className="flex items-center mb-2">
                <input type="radio" name="option" value={alternativa.id} className="mr-2" onChange={handleSelect} />
                alternativa.descricao
              </label>
            ))}
          </div>

          <div className="flex w-full justify-end">
            <button
              className="w-full bg-blue-950 hover:bg-sky-800 text-white font-semibold py-2 px-4 rounded lg:w-fit"
              onClick={handleSubmit}
            >
              Próxima questão
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
