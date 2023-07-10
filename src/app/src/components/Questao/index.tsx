export default function Questao({ questao } : any) {
  return (
    <div>
      <h1>{questao?.enunciado}</h1>
      <span>{questao?.elaborador?.nome}</span>
    </div>
  )
}