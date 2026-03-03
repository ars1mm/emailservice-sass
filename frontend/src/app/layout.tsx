import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Providers } from './providers'
import { siteConfig } from '@/config/site'
import Navbar from '@/components/Navbar'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          data-environment="sandbox"
          data-client-token="test_"
        />
      </head>
      <body style={{ backgroundColor: '#09090b', color: '#ededed' }}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
