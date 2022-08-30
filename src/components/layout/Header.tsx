import Link from '@/components/Link'
import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 h-20 shadow-sm laptop:h-24">
      <nav className="container flex h-full items-center justify-between">
        <Link href="/" className="relative block aspect-square h-4/5">
          <Image src="/logo.png" alt="Logo Sasja HC" layout="fill" objectFit="contain" />
        </Link>
      </nav>
    </header>
  )
}
