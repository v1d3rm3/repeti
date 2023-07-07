/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Facebook, GraduationCap } from "lucide-react";
import QuestionList, { Question } from "@/components/QuestionList";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// async function getSuggestions() {
//   const data = await fetch(process.env.API_URL + "/suggestion");

//   if (!data.ok) {
//     return [];
//   }

//   const suggestions = await data.json();

//   const suggestionsFormated = await Promise.all(
//     suggestions.suggestions.map(async (suggestion: any) => {
//       const userName = await getUserName(suggestion.authorId);
//       const categoryName = await getCategoryName(suggestion.categoryId);

//       return {
//         ...suggestion,
//         userName: userName,
//         categoryName: categoryName,
//         dataFormated: new Date(suggestion.createdAt).toLocaleDateString(
//           "pt-BR",
//           {
//             day: "2-digit",
//             month: "long",
//             year: "numeric",
//           }
//         ),
//       };
//     })
//   );

//   return suggestionsFormated;
// }

// async function getUserName(authorId: string) {
//   const data = await fetch(process.env.API_URL + "/user/" + authorId);
//   const user = await data.json();
//   return user.data.name;
// }

// async function getCategoryName(categoryId: string) {
//   const data = await fetch(process.env.API_URL + "/category/" + categoryId);
//   const category = await data.json();
//   return category.data.name;
// }

export default function Suggestions() {
  const router = useRouter();

  const handleStartStudy = async (e: any) => {
    toast.info("Selecione uma categoria");
    router.push("/category");
  };

  const data: Question[] = [
    {
      _id: "8bea4b96-8d9c-4a23-b33f-f80d6620d8c3",
      title: "Normalização de banco de dados",
      content:
        "Explique o conceito de normalização de banco de dados e discuta suas principais vantagens. Cite os diferentes níveis de normalização e forneça exemplos de como aplicá-los em um contexto prático.",
      userName: "Frank",
      categoryName: "Banco de Dados",
      dataFormated: "05 de julho de 2023",
    },
    {
      _id: "9729a6a5-550f-495a-b948-9613bfb525c6",
      title: "Chave primária e chave estrangeira",
      content:
        "Explique o conceito de chave primária e chave estrangeira em um banco de dados relacional. Discuta a importância desses conceitos na garantia da integridade dos dados e na definição de relacionamentos entre tabelas. Dê exemplos de como usar chaves primárias e chaves estrangeiras em um esquema de banco de dados.",
      userName: "Frank",
      categoryName: "Banco de Dados",
      dataFormated: "05 de julho de 2023",
    },
    {
      _id: "e785d4a7-934d-4d2a-b3a8-cc857d39e6e8",
      title: "Transações em bancos de dados",
      content:
        "Descreva o conceito de transações em bancos de dados e explique sua importância para garantir a consistência e a integridade dos dados. Discuta as propriedades ACID (Atomicidade, Consistência, Isolamento e Durabilidade) e explique como elas são aplicadas no contexto das transações. Forneça exemplos de situações em que as transações são usadas para manter a consistência dos dados.",
      userName: "Frank",
      categoryName: "Banco de Dados",
      dataFormated: "05 de julho de 2023",
    },
  ];

  return (
    <main className="mt-2 max-w-screen-xl m-auto h-screen p-4 md:p-6 lg:p-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col font-sans font-bold text-xl md:flex lg:text-2xl">
          <p>Olá, Frank!</p>
          <p className="hidden md:flex">
            Acompanhe as suas últimas listas de exercícios.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="flex flex-row items-center align-middle rounded-md bg-blue-950 hover:bg-sky-800 border-0 p-2 box-border h-8 md:w-fit m-0"
            type="button"
            onClick={handleStartStudy}
          >
            <GraduationCap className="pr-3 text-white" size={40} />
            <span className="font-sans font-bold text-white">
              INICIAR ESTUDO
            </span>
          </button>
        </div>
      </div>
      <div className="pt-12 pb-12">
        <QuestionList questions={data} />
      </div>
    </main>
  );
}
