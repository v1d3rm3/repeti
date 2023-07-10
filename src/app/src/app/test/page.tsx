import Questao from '../../components/Questao'

const questaoExemplo = {
  id: 48920,
  enunciado:
    'O trabalho educativo com imagens de obras de arte permite ampliar o repertório visual dos estudantes e pode ser realizado com a metodologia Image Watching, (olhando imagens), elaborada por Robert William Ott na década de 1980 para desenvolver a relação do apreciador com a obra de arte, em museus, escolas ou em espaços comuns da vida cotidiana. Esse sistema de análise se desdobra em cinco etapas consecutivas: Descrevendo, Analisando, Interpretando, Fundamentando e Revelando. A respeito dessa metodologia para educar a percepção estética, assinale a afirmativa que caracteriza a etapa de culminância Revelando.',
  nivel: 'Medio',
  qualidade: 'Boa',
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
}

export default function Test() {
  return (
    <div>
      <Questao questao={questaoExemplo} />
    </div>
  )
}
