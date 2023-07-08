/* eslint-disable @next/next/no-async-client-component */
'use client'
import { GraduationCap } from 'lucide-react'
import { QuestionList } from '@/components/QuestionList'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Loading } from '@/components/Loading'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const token = session?.user?.name || ''
  const router = useRouter()

  console.log(token)

  if (status === 'loading') {
    return <Loading size={20} />
  }

  const handleStartStudy = async (e: any) => {
    toast.info('Selecione uma categoria')
    router.push('/category')
  }

  return (
    <main className="mt-2 max-w-screen-xl m-auto h-screen p-4 md:p-6 lg:p-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col font-sans font-bold text-xl md:flex lg:text-2xl">
          <p>Olá, Frank!</p>
          <p className="hidden md:flex">Acompanhe as suas últimas listas de exercícios.</p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="flex flex-row items-center align-middle rounded-md bg-blue-950 hover:bg-sky-800 border-0 p-2 box-border h-8 md:w-fit m-0"
            type="button"
            onClick={handleStartStudy}
          >
            <GraduationCap className="pr-3 text-white" size={40} />
            <span className="font-sans font-bold text-white">INICIAR ESTUDO</span>
          </button>
        </div>
      </div>
      <div className="pt-12 pb-12">
        <QuestionList token={token} />
      </div>
    </main>
  )
}
