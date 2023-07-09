import { createAccount } from '@/services/users/userService'

export async function POST(request: Request) {
  try {
    const { nome, sobrenome, email, senha } = await request.json()
    const response = await createAccount(nome, sobrenome, email, senha)

    if (response.status === 200) {
      return new Response('User created with success', {
        status: 200,
      })
    } else {
      return new Response('Could not create a new user', {
        status: 400,
      })
    }
  } catch (error) {
    return new Response('Unexpected error ocurred', {
      status: 500,
    })
  }
}
