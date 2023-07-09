/* eslint-disable @next/next/no-async-client-component */
'use client'
import { GraduationCap } from 'lucide-react'
import QuestionList from '@/components/StudyList'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Loading } from '@/components/Loading'
import StudyList from '@/components/StudyList'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleStartStudy = async (e: any) => {
    toast.info('Selecione uma categoria')
    router.push('/category')
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
      <div className="flex flex-row justify-between">
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
      <div className="pt-12 pb-12">
        <StudyList token={token} />
      </div>
    </main>
  )
}
