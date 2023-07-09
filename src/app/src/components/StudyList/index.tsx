import React, { useEffect, useState } from 'react'
import { BrainCircuit, Shapes, Play } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export interface Study {
  id: number
  nivelAtual: string
  categoria: {
    nome: string
  }
}

export interface StudyProps {
  token: string
}

export default function StudyList({ token }: StudyProps) {
  const [studies, setStudies] = useState<Study[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchStudies = async () => {
      const res = await fetch(`/api/study`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        cache: 'no-cache',
      })

      const data = await res.json()

      setStudies(data.body)
    }

    fetchStudies()
  }, [])

  async function handleSubmit(studyId: number) {
    toast.success('Iniciando estudo...')
    router.push('/homework/' + studyId + '/' + token)
  }

  if (!studies || studies.length === 0) {
    return (
      <>
        <div className="flex flex-col justify-center items-center pt-2 md:flex-row">
          <Image src="/studies_empty.svg" alt="Person with password" width={418} height={355} className="pb-12" />
          <div className="flex flex-col justify-center items-stretch md:pl-14">
            <span className="text-2xl font-bold">Não há estudos cadastrados.</span>
            <span className="text-xl mb-4">Siga os seguintes passos:</span>
            <ol className="ml-8 list-decimal">
              <li>Crie um novo estudo no botão criar estudo</li>
              <li>Verifique se o estudo foi adicionado ao dashboard</li>
              <li>Atualize a página</li>
              <li>Tente entrar novamente no sistema</li>
              <li>Remova os cookies</li>
              <li>Permita que a página possa usar cookies</li>
              <li>Entre em contato com o suporte técnico</li>
            </ol>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        {studies?.map(study => (
          <div key={study.id} className="bg-blue-950 text-white px-6 py-4 rounded overflow-hidden shadow-lg mb-4">
            <div className="flex flex-row max-w-screen-2xl m-auto justify-between text-slate-100">
              <div className="inline-table font-sans font-bold md:flex flex-row">
                <div className="flex col mr-4 pt-2 md:mr-6">
                  <Shapes className="text-white mr-2" size="20" />
                  {study.categoria.nome}
                </div>
                <div className="flex col mr-4 pt-2">
                  <BrainCircuit className="text-white mr-2" size="20" />
                  {study.nivelAtual}
                </div>
              </div>
              <button
                className="flex flex-row mt-auto mb-auto items-center rounded-md bg-white hover:bg-slate-400 hover:text-white border-0 p-2 box-border sm:h-1/4 md:h-8"
                type="button"
                onClick={() => handleSubmit(study.id)}
              >
                <Play className="text-blue-950 pr-3 font-bold" size={30} />
                <span className="text-blue-950 font-bold">Iniciar</span>
              </button>
            </div>
          </div>
        ))}
      </>
    )
  }
}
