import clsx from 'clsx'
import Image from "next/legacy/image"
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
    name: 'jako',
    path: '/sponsors/jako.svg',
    href: 'https://www.jako.com/be-nl/',
    aspect: 'aspect-[512/146]',
  },
  {
    name: 'blackroll',
    path: '/sponsors/blackroll.svg',
    href: 'https://blackroll.com/nl',
    aspect: 'aspect-[3000/1000]',
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
    name: 'ah antwerpen centraal',
    path: '/sponsors/ah.png',
    href: 'https://www.ah.be/winkel/3159',
    aspect: 'aspect-[3/1]',
  },
  {
    name: 'schaessens sport',
    path: '/sponsors/schaessens-sport.jpg',
    href: 'https://www.schaessenssport.be/',
    aspect: 'aspect-[1266/564]',
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
