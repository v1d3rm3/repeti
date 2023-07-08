import { ListStudyResponse, listStudy } from '@/services/study/studyService'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const authHeader = headers().get('authorization')

    const response: ListStudyResponse = await listStudy(authHeader || '')

    if (response.status === 200) {
      return NextResponse.json(response, { status: response.status })
    } else {
      return NextResponse.json([], { status: 200 })
    }
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}
