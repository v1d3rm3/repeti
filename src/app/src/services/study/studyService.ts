import routes from '../routes'
import { NextApiResponse } from 'next'

export interface ListStudyResponse {
  status: number
  body: []
}

export async function listStudy(token: string): Promise<ListStudyResponse> {
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
