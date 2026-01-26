import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Head from 'next/head'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: '1st WMR-XXII Tangub City Eagles Club Pickleball Tournament',
  description: 'Register now! Feb 27-28, 2026 at Podlike Pickleball Court.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          property="og:title"
          content="1st WMR-XXII Tangub City Eagles Club Pickleball Tournament"
        />
        <meta
          property="og:description"
          content="Register now! Feb 27-28, 2026 at Podlike Pickleball Court."
        />
        <meta
          property="og:image"
          content="https://pickle-registrations.vercel.app/banner.png"
        />
        <meta
          property="og:url"
          content="https://pickle-registrations.vercel.app"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://pickle-registrations.vercel.app/banner.png"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
