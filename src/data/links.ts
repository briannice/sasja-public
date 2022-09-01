import { youthLinks } from '@/data/teams'

export const headerLinks = [
  {
    name: 'Kern',
    href: '/kern',
  },
  {
    name: 'Club',
    sublinks: [
      {
        name: 'Contact',
        href: '/club/contact',
      },
      {
        name: 'Werking',
        href: '/club/werking',
      },
      {
        name: 'Inschrijven',
        href: '/club/inschrijven',
      },
      {
        name: 'Visie',
        href: '/club/visie',
      },
      {
        name: 'Historiek',
        href: '/club/historiek',
      },
      {
        name: 'Galerij',
        href: '/club/galerij',
      },
    ],
  },
  {
    name: 'Jeugd',
    sublinks: [
      {
        name: 'Algemeen',
        href: '/jeugd',
      },
      ...youthLinks,
    ],
  },
  {
    name: 'Nieuws',
    href: '/nieuws',
  },
  {
    name: 'Tickets',
    href: '/#tickets-abbonementen',
  },
  {
    name: 'Fanshop',
    href: '/fanshop',
  },
]
