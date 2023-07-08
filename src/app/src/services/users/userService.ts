import routes from '../routes'

export async function login(email: string, password: string) {
  try {
    const response = await fetch(routes.authenticate, {
      body: JSON.stringify({
        email: email,
        senha: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (response?.status === 200) {
      return await response.json()
    } else {
      throw new Error('Could not possibly retrieve the user information')
    }
  } catch (error) {
    throw new Error('Unable to retrieve the user information')
  }
}

export async function createAccount(name: string, sobrenome: string, email: string, password: string) {
  try {
    const response = await fetch(routes.createUser, {
      body: JSON.stringify({
        nome: name,
        sobrenome: sobrenome,
        email: email,
        senha: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const data = await response.json()

    if (response?.status === 200) {
      return new Response(data, {
        status: 200,
      })
    } else {
      return new Response(data, {
        status: 400,
      })
    }
  } catch (error) {
    return new Response('Unexpected error ocurred', {
      status: 500,
    })
  }
}
