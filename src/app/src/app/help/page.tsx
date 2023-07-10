export default function Help() {
  const problems = [
    {
      id: 1,
      title: 'Problema de Login',
      description: 'Não consigo fazer login na minha conta. Recebo uma mensagem de erro de credenciais inválidas.',
      resolution:
        'Certifique-se de inserir as credenciais corretas. Verifique se a tecla Caps Lock está desligada. Se você esqueceu sua senha, clique em "Esqueci minha senha" para redefini-la.',
    },
    {
      id: 2,
      title: 'Problema de Carregamento',
      description: 'As páginas do site estão carregando lentamente ou apresentando erros de carregamento.',
      resolution:
        'Verifique sua conexão de internet. Limpe o cache do navegador ou tente usar um navegador diferente. Se o problema persistir, entre em contato com nosso suporte técnico para obter assistência adicional.',
    },
    {
      id: 3,
      title: 'Problema de Submissão de Questão',
      description:
        'Estou tendo dificuldades para fazer uma lista ou a minha lista não está sendo processado corretamente.',
      resolution:
        'Certifique-se de que todas as respostas estão sendo inseridas corretamente. Verifique se você está conectado na sua conta. Se o problema persistir, entre em contato com seu provedor de serviços de pagamento ou nosso suporte para obter assistência adicional.',
    },
    {
      id: 4,
      title: 'Problema ao criar a conta',
      description: 'Não consigo criar na minha conta. Recebo uma mensagem de erro de error ao conectar ao servidor.',
      resolution:
        'Certifique-se de inserir as credenciais corretas. Verifique se a tecla Caps Lock está desligada. Se você esqueceu sua senha, clique em "Esqueci minha senha" para redefini-la.',
    },
    {
      id: 5,
      title: 'Problema ao avaliar questão',
      description: 'Não consigo avaliar uma questão. Recebo uma mensagem de erro de error ao conectar ao servidor.',
      resolution:
        'Certifique-se de está conectado à internet. Verifique se a tecla Caps Lock está desligada. Se você esqueceu sua senha, clique em "Esqueci minha senha" para redefini-la.',
    },
    {
      id: 6,
      title: 'Problema ao visualizar questões',
      description: 'Não consigo visualizar uma questão. Recebo uma mensagem de erro de error ao conectar ao servidor.',
      resolution:
        'Certifique-se de está conectado à internet. Verifique se a tecla Caps Lock está desligada. Se você esqueceu sua senha, clique em "Esqueci minha senha" para redefini-la.',
    },
  ]

  return (
    <main className="flex h-screen flex-col justify-start">
      <section className="min-h-full p-2">
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">Principais Problemas dos Usuários</h1>
          {problems.map(problem => (
            <div key={problem.id} className="bg-white shadow-md rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
              <p>Problema: {problem.description}</p>
              <p>Resolução: {problem.resolution}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
