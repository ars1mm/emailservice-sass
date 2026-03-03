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
  const paddleEnv = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'sandbox'
  const paddleToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'test_'
  
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          dangerouslySetInnerHTML={{
            __html: `
              window.Paddle = window.Paddle || {};
              Paddle.Environment = { set: function(env) { this.environment = env; } };
              Paddle.Initialize({ 
                environment: '${paddleEnv}',
                token: '${paddleToken}'
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
