import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Providers } from './providers'
import { siteConfig } from '@/config/site'

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
      <body style={{ backgroundColor: '#09090b', color: '#ededed' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
