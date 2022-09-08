import { EventModel } from '@/types/models'
import Image from 'next/image'
import React from 'react'

type Props = {
  events: EventModel[]
}

export default function Hero({}: Props) {
  return (
    <section className="grid grid-cols-3">
      <h2 className="sr-only">Hero</h2>

      <section className="col-span-2">
        <h3>Evenementen</h3>
      </section>

      <section className="relative aspect-square">
        <figure className="relative aspect-square">
          <Image src="/handball-field.jpg" alt="Handball veld." layout="fill" objectFit="cover" />
        </figure>
        <div className="absolute inset-0 bg-black bg-opacity-75 p-8">
          <h2 className="text-center text-4xl font-bold text-white">Volgende wedstrijden</h2>
        </div>
      </section>
    </section>
  )
}
