import React, { useEffect, useState } from 'react'
import { User, AlarmClock, MessagesSquare } from 'lucide-react'
import Image from 'next/image'

export interface Study {
  _id: string
  title: string
  content: string
  userName: string
  categoryName: string
  dataFormated: string
}

export interface StudyProps {
  token: string
}

export default function StudyList({ token }: StudyProps) {
  const [studies, setStudies] = useState<Study[]>([])

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
          <div key={study._id} className="bg-blue-950 text-white px-6 py-4 rounded overflow-hidden shadow-lg mb-4">
            <div className="font-bold text-xl mb-2">{study.title}</div>
            <div className="text-slate-100 text-base font-serif text-justify">
              {study.content}
              <hr className="mt-4 mb-4" />
              <div className="inline-table font-sans font-bold md:flex flex-row">
                <div className="flex col mr-4 md:mr-6">
                  <User className="text-white mr-2" size="20" />
                  {study.userName}
                </div>
                <div className="flex col mr-4">
                  <MessagesSquare className="text-white mr-2" size="20" />
                  {study.categoryName}
                </div>
                <div className="flex col">
                  <AlarmClock className="text-white mr-2" size="20" />
                  {study.dataFormated}
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }
}
