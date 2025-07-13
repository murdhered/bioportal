import Header from "@/components/Header";
import {Lato} from 'next/font/google'
import '../globals.css'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'BioPortal',
  description: 'All in one link.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main className="flex flex-col min-h-screen"> {/* Ensure main fills the screen vertically */}
          <Header /> 
          <div className="flex-1 w-full relative"> {/* flex-1 makes it take remaining vertical space */}
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}