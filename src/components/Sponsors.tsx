import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

export const sponsors = [
  {
    name: 'dca',
    path: '/sponsors/dca.png',
    href: 'https://www.dca.be/nl',
    aspect: 'aspect-[2/1]',
  },
  {
    name: 'umicore',
    path: '/sponsors/umicore.png',
    href: 'https://www.umicore.be/',
    aspect: 'aspect-[3/1]',
  },
  {
    name: 'kempa',
    path: '/sponsors/kempa.png',
    href: 'https://en.kempa-sports.com/en/start',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'atv',
    path: '/sponsors/atv.png',
    href: 'https://atv.be/',
    aspect: 'aspect-[10/8]',
  },
  {
    name: 'sporting a',
    path: '/sponsors/sporting-a.jpg',
    href: 'https://www.antwerpen.be/nl/overzicht/sporting-a',
    aspect: 'aspect-[1/1]',
  },
]

export default function Sponsors() {
  return (
    <div className="flex flex-wrap justify-center space-x-16">
      {sponsors.map((sponsor) => (
        <a key={sponsor.name} href={sponsor.href} target="_blank" rel="noreferrer">
          <figure className={clsx('relative h-12', sponsor.aspect)}>
            <Image src={sponsor.path} alt="Sponsor image" layout="fill" objectFit="cover" />
          </figure>
        </a>
      ))}
    </div>
  )
}
