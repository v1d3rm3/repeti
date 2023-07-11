'use client'
import BuscaCategoria from '../../components/BuscaCategoria'
import Questao from '../../components/Questao'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Test() {
  const [resposta, setResposta] = useState('')
  const { data: session, status } = useSession()

  const myHandlerClick = (e: any) => {
    console.log(resposta)
  }

  if (session?.user?.name)
    return (
      <div className="mt-2 max-w-screen-xl m-auto h-screen p-4 md:p-6 lg:p-8">
        <BuscaCategoria token={session?.user?.name} />

        <Questao
          questao={questaoExemplo}
          responderHandler={myHandlerClick}
          resposta={resposta}
          setResposta={setResposta}
        />
      </div>
    )
        
  return (
    <div className="mt-2 max-w-screen-xl m-auto h-screen p-4 md:p-6 lg:p-8">
      <Questao
        questao={questaoExemplo}
        responderHandler={myHandlerClick}
        resposta={resposta}
        setResposta={setResposta}
      />
    </div>
  )
}

const questaoExemplo = {
  id: 115779,
  enunciado: 'Blanditiis ullam ullam.',
  nivel: 'MuitoFacil',
  qualidade: 'Ruim',
  elaboradorId: 1,
  categoriaId: 547,
  elaborador: {
    id: 1,
    nome: 'Fulano',
    sobrenome: 'De Tal',
    email: 'fulano@domain.com',
  },
  categoria: {
    id: 547,
    nome: 'Saepe.',
  },
  alternativas: [
    {
      id: 463113,
      descricao: 'Porro minus.',
      resposta: 1,
      questaoId: 115779,
    },
    {
      id: 463114,
      descricao: 'Maxime.',
      resposta: 0,
      questaoId: 115779,
    },
    {
      id: 463115,
      descricao: 'Ipsam maxime fuga.',
      resposta: 0,
      questaoId: 115779,
    },
    {
      id: 463116,
      descricao: 'Nam fuga.',
      resposta: 0,
      questaoId: 115779,
    },
  ],
}
