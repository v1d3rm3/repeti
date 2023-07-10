import { Response, answerQuestion } from '@/services/study/studyService'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const authHeader = headers().get('authorization')
    const { studyId, questionId, answerId } = await request.json()

    const response: Response = await answerQuestion(authHeader || '', studyId, questionId, answerId)

    return NextResponse.json(response, { status: response.status })
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}
