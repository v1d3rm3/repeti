/* eslint-disable @next/next/no-async-client-component */
'use client'
import { GraduationCap } from 'lucide-react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Loading } from '@/components/Loading'
import StudyList from '@/components/StudyList'
import Estudos from './estudos'
import { Button } from '@mui/material'
import BuscaCategoria from '../../components/BuscaCategoria'
import Questao from '../../components/Questao'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleStartStudy = async (e: any) => {
    toast.info('Selecione uma categoria')
    router.push('/category', {
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
    })
  }

  if (status === 'loading') {
    return (
      <main className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loading size={100} style="text-black" />
        </div>
      </main>
    )
  }

  const token = session?.user?.name || ''

  return (
    <main className="mt-2 max-w-screen-xl m-auto h-screen p-4 md:p-6 lg:p-8">
      <h1 className="font-bold font-sans text-2xl mb-3">Seja bem vindo!</h1>
      <div className="flex gap-3 items-center">
        <h1 className="font-sans text-xl">Meus Estudos</h1>
        {/* <Button variant="outlined" size="small" onClick={handleStartStudy}>
          Novo Estudo
        </Button> */}
        <button
            className="flex flex-row items-center align-middle rounded-md bg-blue-950 hover:bg-sky-800 border-0 p-2 box-border h-8 md:w-fit m-0"
            type="button"
            onClick={handleStartStudy}
          >
            <GraduationCap className="pr-3 text-white" size={40} />
            <span className="font-sans font-bold text-white">CRIAR ESTUDO</span>
          </button>
      </div>
      <Estudos token={token} className="mt-3 block" />

      <h1 className="font-bolid font-sans text-xl mt-6 mb-3">Pratique sem Compromisso</h1>

      <div className='flex mb-4 gap-3 p-3 bg-gray-50 rounded justify-center'>
        <div style={{width: 400}}>
        <MostraComboCategoria token={token}  />
        </div>
        <Button variant="outlined" size="small">
          Praticar
        </Button>
      </div>

      <div className='flex items-center justify-center'>
        <Questao
          questao={questaoExemplo}

        />
      </div>
      
      {/* <div className="flex flex-row justify-between">
        <div className="flex flex-col font-sans font-bold text-xl md:flex lg:text-2xl">
          <p>Seja bem vindo!</p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="flex flex-row items-center align-middle rounded-md bg-blue-950 hover:bg-sky-800 border-0 p-2 box-border h-8 md:w-fit m-0"
            type="button"
            onClick={handleStartStudy}
          >
            <GraduationCap className="pr-3 text-white" size={40} />
            <span className="font-sans font-bold text-white">CRIAR ESTUDO</span>
          </button>
        </div>
      </div>
      <div className="pt-2 pb-12">
        <StudyList token={token} />
      </div> */}
    </main>
  )
}

function MostraComboCategoria({ token, setCategoriaOpcao }: any) {
  if (token)  
    return <BuscaCategoria token={token} setCategoriaOpcao={setCategoriaOpcao} />
  return <>Carregando categorias...</>
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
