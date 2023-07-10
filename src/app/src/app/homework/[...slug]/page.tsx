'use client'

import { Loading } from '@/components/Loading'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface Props {
  params: {
    slug: [studyId: number, token: string]
  }
}

export interface Question {
  id: number
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
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleUpdateCounters() {
    let totalQuestions: number
    let rigthAnswers: number

    if (localStorage.getItem('total-questions')) {
      totalQuestions = parseInt(localStorage.getItem('total-questions')!)
    } else {
      totalQuestions = 0
    }

    if (localStorage.getItem('rigth-answers')) {
      rigthAnswers = parseInt(localStorage.getItem('rigth-answers')!)
    } else {
      rigthAnswers = 0
    }

    if (selectedAnswer) {
      let updateTotal = totalQuestions + 1
      let answer = await JSON.parse(selectedAnswer).resposta
      let updateAnswer = rigthAnswers + answer

      localStorage.setItem('total-questions', updateTotal.toString())
      localStorage.setItem('rigth-answers', updateAnswer.toString())

      console.log('Total questions: ' + localStorage.getItem('total-questions'))
      console.log('Respotas certas: ' + localStorage.getItem('rigth-answers'))
    }
  }

  useEffect(() => {
    setLoading(true)
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
      setLoading(false)
    }

    fetchQuestion()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setLoading(true)

    if (selectedAnswer) {
      const res = await fetch(`/api/study/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.slug[1],
        },
        body: JSON.stringify({
          studyId: params.slug[0],
          questionId: question?.id,
          answerId: JSON.parse(selectedAnswer).id,
        }),
      })

      const data = await res.json()

      setLoading(false)
      await handleUpdateCounters()

      if (data.status === 200 || data.status === 201) {
        toast.success('Resposta submetida com sucesso!', {
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
        })
      } else {
        toast.error('Houve um problema ao submter a resposta', {
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
        })
      }

      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }

    setLoading(false)
  }

  const handleSelect = (event: any) => {
    setSelectedAnswer(event.target.value)
  }

  const handleFinish = (event: any) => {
    toast.success('Estudo finalizado!', {
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
    })
    router.push('/homework/result')
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
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Lista de Exercícios</h1>
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-md rounded-lg mb-4">
            <h2 className="text-2xl font-semibold mb-2">{question?.enunciado}</h2>
            <div className="flex flex-col">
              {question?.alternativas?.map(alternativa => (
                <label key={alternativa.id} className="flex items-center mb-2 text-xl">
                  <input
                    type="radio"
                    name="option"
                    value={JSON.stringify(alternativa)}
                    className="mr-2"
                    onChange={handleSelect}
                  />
                  {alternativa.descricao}
                </label>
              ))}
            </div>

            <div className="fixed bottom-0 right-0 w-full p-4 lg:max-w-screen-2xl lg:m-auto lg:bottom-auto lg:top-auto lg:right-auto lg:flex justify-end">
              <button className="w-full bg-blue-950 mb-2 hover:bg-blue-500 text-white font-semibold lg:m-0 lg:mr-2 py-2 px-4 rounded lg:w-fit">
                Próxima questão
              </button>
              <button
                className="w-full bg-blue-950 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded lg:w-fit lg:mr-8"
                onClick={handleFinish}
              >
                Finalizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
