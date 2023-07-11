'use client'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import BuscaCategoria from '../../components/BuscaCategoria'

function MostraComboCategoria({ token, setCategoriaOpcao }: any) {
  if (token)  
    return <BuscaCategoria token={token} setCategoriaOpcao={setCategoriaOpcao} />
  return <>Carregando categorias...</>
}

export default function Category() {
  const [categories, setCategory] = useState([])
  const [categorySelected, setCategorySelected] = useState<any>()
  const router = useRouter()
  const { data: session } = useSession()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/study', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session?.user?.name,
        },
        method: 'POST',
        body: JSON.stringify({ categoriaId: categorySelected?.id }),
      })

      if (response?.status === 200) {
        toast.info('Estudo criado com sucesso!')
        router.push('/dashboard', {
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
        })
      } else {
        toast.error('Não foi possível criar o estudo', {
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
        })
      }
    } catch (error) {
      toast.error('Não foi possível criar o estudo')
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/category`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session?.user?.name,
        },
        cache: 'force-cache',
      })

      const data = await res.json()

      setCategory(data.body)
    }

    fetchCategories()
  }, [])

  return (
    <main>
      <main className="mt-2 max-w-screen-xl m-auto h-full p-4 md:p-6 lg:p-8">
        <div className="text-center font-bold text-4xl mb-4 mt-8 sm:mb-4 md:mb-6">
          <p>
            Selecione <span className="text-yellow">uma categoria </span>
            <span className="hidden md:inline">
              ou <span className="text-yellow">retorne</span> a sua lista
            </span>
          </p>
        </div>
        <div className="flex items-start justify-between">
          <div className="hidden lg:flex justify-center w-full leading-none lg:pl-16">
            <Image
              src="/category.svg"
              alt="Teacher speaking about one topic to another two students"
              width={800}
              height={800}
              className="select-none mt-4 text-center"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full mb-6 md:w-2/3 lg:w-5/6">
              <h2 className="flex items-start mb-2 font-medium">Antes de Começar Revise o Seguinte:</h2>
              <ol className="ml-8 list-decimal">
                <li>
                  Defina objetivos claros: Antes de começar o estudo, identifique claramente quais são seus objetivos de
                  aprendizado. Isso ajudará você a se concentrar nos tópicos relevantes e a aproveitar ao máximo cada
                  exercício.
                </li>
                <li>
                  Estabeleça um ambiente adequado: Certifique-se de estar em um ambiente tranquilo e livre de distrações
                  antes de começar. Desligue notificações de dispositivos móveis e outras fontes de interrupção para
                  manter o foco total nos exercícios.
                </li>
              </ol>
            </div>
            <form id="form-login" onSubmit={handleSubmit} className="w-full md:w-2/3 lg:w-5/6">
              <div className="mb-4">
                <label htmlFor="category" className="block mb-3 font-medium text-xl">
                  Categoria
                </label>
                <MostraComboCategoria token={session?.user?.name} setCategoriaOpcao={setCategorySelected} />
                {/* <select
                  id="category"
                  value={categorySelected}
                  className="w-full px-3 py-2 bg-white text-black border rounded-md focus:outline-none ring-2 ring-black"
                  onChange={e => setCategorySelected(e.target.value)}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories?.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.nome}
                    </option>
                  ))}
                </select> */}
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-950 hover:bg-sky-800 text-white hover:bg-orange text-withe font-bold rounded"
              >
                Criar estudo
              </button>
            </form>
            <div className="flex flex-col items-center">
              <div className="text-xl pt-4">
                <p>ou</p>
              </div>
              <div className="text-xl underline pt-4 ">
                <Link href="/dashboard" className="hover:text-sky-800">
                  Retorna aos meus estudos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  )
}
