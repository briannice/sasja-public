import React, { ReactNode } from 'react'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="no-scrollbar flex min-h-screen flex-col pt-20 laptop:pt-24">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
