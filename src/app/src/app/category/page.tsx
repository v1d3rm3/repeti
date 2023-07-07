"use client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Category() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [categories, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState<string>();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    toast.info("Iniciando lista de exercício...");
    router.push("/homework");
  };

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
              <h2 className="flex items-start mb-2 font-medium">
                Antes de Começar Revise o Seguinte:
              </h2>
              <ol className="ml-8 list-decimal">
                <li>
                  Defina objetivos claros: Antes de começar a lista de
                  exercícios, identifique claramente quais são seus objetivos de
                  aprendizado. Isso ajudará você a se concentrar nos tópicos
                  relevantes e a aproveitar ao máximo cada exercício.
                </li>
                <li>
                  Estabeleça um ambiente adequado: Certifique-se de estar em um
                  ambiente tranquilo e livre de distrações antes de começar.
                  Desligue notificações de dispositivos móveis e outras fontes
                  de interrupção para manter o foco total nos exercícios.
                </li>
              </ol>
            </div>
            <form
              id="form-login"
              onSubmit={handleSubmit}
              className="w-full md:w-2/3 lg:w-5/6"
            >
              <div className="mb-4">
                <label htmlFor="category" className="block mb-2 font-medium">
                  Categoria
                </label>
                <select
                  id="category"
                  value={categorySelected}
                  className="w-full px-3 py-2 bg-white text-black border rounded-md focus:outline-none ring-2 ring-black"
                  onChange={(e) => setCategorySelected(e.target.value)}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Banco de Dados">Banco de Dados</option>
                  <option value="Testes de Software">Testes de Software</option>
                  <option value="Segurança da Informação">
                    Segurança da Informação
                  </option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-950 hover:bg-sky-800 text-white hover:bg-orange text-withe font-bold rounded"
              >
                Iniciar
              </button>
            </form>
            <div className="flex flex-col items-center">
              <div className="text-xl pt-4">
                <p>ou</p>
              </div>
              <div className="text-xl underline pt-4 ">
                <Link href="/dashboard" className="hover:text-sky-800">
                  Retorna aos meus exercícios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
