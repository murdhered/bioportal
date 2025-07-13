import { Inter } from 'next/font/google'
import '../../globals.css'


const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex items-center justify-center min-h-screen p-4">
          {children}
        </main>
      </body>
    </html>
  )
}