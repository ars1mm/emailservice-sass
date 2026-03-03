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
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                if (window.Paddle) {
                  Paddle.Environment.set('sandbox');
                  Paddle.Initialize({
                    token: 'test_5702b395030261316e4e39a2234'
                  });
                }
              });
            `
          }}
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
