import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Order Confirmation Agent - India',
  description: 'Multilingual order confirmation agent for Indian customers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
