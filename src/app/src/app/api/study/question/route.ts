import { Response, nextQuestion } from '@/services/study/studyService'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const authHeader = headers().get('authorization')
    const { studyId } = await request.json()

    const response: Response = await nextQuestion(authHeader || '', studyId)
    if (response.status === 200) {
      return NextResponse.json(response, { status: response.status })
    } else {
      return NextResponse.json([], { status: 200 })
    }
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}
