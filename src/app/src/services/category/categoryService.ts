import routes from '../routes'

export interface ListCategoryResponse {
  status: number
  body: []
}

export async function listCategory(token: string): Promise<ListCategoryResponse> {
  try {
    const response = await fetch(routes.listCategory, {
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
