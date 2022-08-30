import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
