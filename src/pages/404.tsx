import Link from '@/components/Link'
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

export default function PageNotFoundPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-3xl">Deze pagina lijkt niet te bestaan...</h1>
        <div>
          <Link href="/" className="btn btn-primary btn-text-icon">
            <span>Startpagina</span>
            <RiArrowRightSLine />
          </Link>
        </div>
      </div>
    </main>
  )
}
