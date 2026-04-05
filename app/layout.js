import { Inter, Montserrat, Manrope } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import FloatingChat from '@/components/FloatingChat'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata = {
  title: 'Trippy Go - Premium Travel & Cab Booking',
  description: 'Book cabs, travel packages, and fleet vehicles with Trippy Go. Best prices, instant booking, and premium service.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${manrope.variable}`}>
      <body className={inter.className}>
        {children}
        <FloatingChat />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
