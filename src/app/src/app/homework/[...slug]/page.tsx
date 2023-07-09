'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface Props {
  params: {
    slug: number
  }
}

export default function Homework({ params }: Props) {
  const [answer, setAnswer] = useState('')
  const router = useRouter()

  useEffect(() => {
    alert('Estudo selecionado é com o id: ' + params.slug)
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    toast.success('Lista finalizada com sucesso!')
    router.push('/dashboard')
  }

  return (
    <main className="mt-2 max-w-screen-xl m-auto h-full p-4 md:p-6 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Lista de Exercícios Sobre Grafos</h1>

        <div className="bg-white shadow-md rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">
            O que é um caminho mais curto em um grafo e como pode ser encontrado?
          </h2>
          <p className="mb-4 text-justify">
            Defina o conceito de caminho mais curto em um grafo e explique a importância dessa métrica em problemas de
            otimização. Discuta algoritmos clássicos, como o algoritmo de Dijkstra e o algoritmo de Bellman-Ford, que
            são usados para encontrar caminhos mais curtos em grafos ponderados.
          </p>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 font-medium">
              Resposta
            </label>
            <textarea
              id="description"
              rows={2}
              className="flex items-start w-full px-3 py-4 text-black border rounded-md focus:outline-none ring-2 ring-black"
              value={answer}
              placeholder="Escreva aqui a sua resposta..."
              onChange={e => setAnswer(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Quais são as aplicações práticas dos grafos na vida real?</h2>
          <p className="mb-4 text-justify">
            Explique algumas áreas onde os grafos são amplamente utilizados e fornecem soluções eficientes. Discuta
            exemplos de aplicação de grafos em problemas do mundo real, como redes sociais, roteamento de transporte,
            planejamento de cronograma e otimização de rotas.
          </p>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 font-medium">
              Resposta
            </label>
            <textarea
              id="description"
              rows={2}
              className="flex items-start w-full px-3 py-4 text-black border rounded-md focus:outline-none ring-2 ring-black"
              value={answer}
              placeholder="Escreva aqui a sua resposta..."
              onChange={e => setAnswer(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-full justify-end">
          <button
            className="w-full bg-blue-950 hover:bg-sky-800 text-white font-semibold py-2 px-4 rounded lg:w-fit"
            onClick={handleSubmit}
          >
            Clique aqui para encerrar a sua lista
          </button>
        </div>
      </div>
    </main>
  )
}
function useClient(): [any, any] {
  throw new Error('Function not implemented.')
}
