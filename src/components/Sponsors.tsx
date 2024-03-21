import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

type Sponsor = {
  name: string
  path: string
  href: string
  aspect: string
}

export const mainSponsors: Sponsor[] = [
  {
    name: 'biobest',
    path: '/sponsors/biobest.svg',
    href: 'https://www.biobestgroup.com/nl',
    aspect: 'aspect-[1275/521]',
  },
  {
    name: 'filter technics',
    path: '/sponsors/filter-technics.svg',
    href: 'https://www.filter-technics.be/nl',
    aspect: 'aspect-[335/88]',
  },
]

export const secondarySponsors: Sponsor[] = [
  {
    name: 'aertssen',
    path: '/sponsors/aertssen2.png',
    href: 'https://www.aertssen.be/',
    aspect: 'aspect-[283/218]',
  },
  {
    name: 'umicore',
    path: '/sponsors/umicore.png',
    href: 'https://www.umicore.be/',
    aspect: 'aspect-[1920/651]',
  },
  {
    name: 'kempa',
    path: '/sponsors/kempa.png',
    href: 'https://en.kempa-sports.com/en/start',
    aspect: 'aspect-[1772/648]',
  },
  {
    name: 'de waele',
    path: '/sponsors/dewaele.svg',
    href: 'https://www.dewaele.com/nl',
    aspect: 'aspect-[1/1]',
  },
  {
    name: 'de lindekes',
    path: '/sponsors/lindekes.png',
    href: 'https://www.delindekes.be/',
    aspect: 'aspect-[183/79]',
  },
  {
    name: 'team fashion',
    path: '/sponsors/team-fashion.png',
    href: 'https://teamfashion.be/nl/',
    aspect: 'aspect-[2619/1023]',
  },
  {
    name: 'jespo',
    path: '/sponsors/jespo.png',
    href: 'https://www.jespo.be/',
    aspect: 'aspect-[156/156]',
  },
  {
    name: 'sporting a',
    path: '/sponsors/sporting-a.png',
    href: 'https://www.antwerpen.be/nl/overzicht/sporting-a',
    aspect: 'aspect-[847/1241]',
  },
  {
    name: 'hoboken',
    path: '/sponsors/hoboken.jpg',
    href: 'https://www.antwerpen.be/nl/overzicht/district-hoboken-1/nieuws',
    aspect: 'aspect-[1500/1500]',
  },
]

export default function Sponsors() {
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {mainSponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.href}
            target="_blank"
            rel="noreferrer"
            className="mx-8 my-4 laptop:mx-12 laptop:my-6"
          >
            <figure className={clsx('relative h-12 tablet:h-16 laptop:h-20', sponsor.aspect)}>
              <Image src={sponsor.path} alt="Sponsor image" layout="fill" objectFit="cover" />
            </figure>
          </a>
        ))}
      </div>
      <div className="flex flex-wrap justify-center">
        {secondarySponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.href}
            target="_blank"
            rel="noreferrer"
            className="mx-8 my-4 laptop:mx-12 laptop:my-6"
          >
            <figure className={clsx('relative h-8 tablet:h-10 laptop:h-12', sponsor.aspect)}>
              <Image src={sponsor.path} alt="Sponsor image" layout="fill" objectFit="cover" />
            </figure>
          </a>
        ))}
      </div>
    </div>
  )
}
