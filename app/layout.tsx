import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Next.js 15 Todo',
  description: 'A simple Todo App using Next.js & Prisma with Postgres',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>Tasking App</h1>
          {children}
        </main>
      </body>
    </html>
  )
}
