import { headers } from 'next/headers'
import { api } from '../api'
import routes from '../routes'

export interface Response {
  status: number
  body: []
}

export async function listStudy(token: string): Promise<Response> {
  try {
    const response = await fetch(routes.listStudy, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: 'GET',
    })

    const data = await response.json()

    if (response?.status === 200) {
      return {
        status: response.status,
        body: data,
      }
    } else {
      return {
        status: response.status,
        body: [],
      }
    }
  } catch (error) {
    return {
      status: 500,
      body: [],
    }
  }
}

export async function create(token: string, categoriaId: number): Promise<Response> {
  try {
    const response = await fetch(routes.createStudy, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ categoriaId: categoriaId }),
      method: 'POST',
    })

    const data = await response.json()

    if (response?.status === 200) {
      return {
        status: response.status,
        body: data,
      }
    } else {
      return {
        status: response.status,
        body: [],
      }
    }
  } catch (error) {
    return {
      status: 500,
      body: [],
    }
  }
}

export async function nextQuestion(token: string, studyId: number): Promise<Response> {
  try {
    const response = await fetch(routes.nextQuestion + studyId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: 'GET',
    })

    const data = await response.json()

    console.log(data)

    if (response?.status === 200) {
      return {
        status: response.status,
        body: data,
      }
    } else {
      return {
        status: response.status,
        body: data,
      }
    }
  } catch (error) {
    return {
      status: 500,
      body: [],
    }
  }
}

export interface AnswerProps {
  token: string
  estudoId: number
  questaoId: number
  alternativaId: number
}

export async function answerQuestion(token: string, estudoId: string, questaoId: number, alternativaId: string) {
  try {
    const response = await fetch(routes.answerQuestion, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: 'POST',
      body: JSON.stringify({
        estudoId: Number.parseInt(estudoId),
        questaoId: questaoId,
        alternativaId: Number.parseInt(alternativaId),
      }),
    })

    const data = await response.json()

    return {
      status: response.status,
      body: data,
    }
  } catch (error) {
    return {
      status: 500,
      body: error,
    }
  }
}
