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
  const response = JSON.parse('{"user":"", "age":30, "city":"New York"}')
  const session = response.user

  return Object.keys(cookie).length > 0 ? session : null
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
