import { Header } from '@/components/Header'
import { headers } from 'next/headers'
import './globals.css'
import Auth from './auth'
import { Session } from 'next-auth'
import { ToastContainer } from 'react-toastify'

export const metadata = {
  title: 'Repetir',
  description: 'Project to learn with repetition',
}

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  })

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession(headers().get('cookie') ?? '')
  return (
    <html>
      <body>
        <Auth session={session}>
          <Header />
          <ToastContainer />
          {children}
        </Auth>
      </body>
    </html>
  )
}
