import { Response, create, listStudy } from '@/services/study/studyService'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const authHeader = headers().get('authorization')

    const response: Response = await listStudy(authHeader || '')

    if (response.status === 200) {
      return NextResponse.json(response, { status: response.status })
    } else {
      return NextResponse.json([], { status: 200 })
    }
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = headers().get('authorization')
    const { categoriaId } = await request.json()

    const response: Response = await create(authHeader || '', categoriaId)

    if (response.status === 200) {
      return NextResponse.json(response, { status: response.status })
    } else {
      return NextResponse.json(response, { status: response.status })
    }
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}
