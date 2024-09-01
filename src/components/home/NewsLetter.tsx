import React from 'react'

import Link from '@/components/Link'

export default function NewsLetter() {
  return (
    <section className="mt-16 py-8">
      <div className="container flex flex-col items-center space-y-4">
        <h2 className="title1">Nieuwsbrief</h2>
        <Link blank href="/nieuwsbrief" className="btn btn-text-icon btn-primary">
          <span>Inschrijven voor de nieuwsbrief</span>
        </Link>
      </div>
    </section>
  )
}
