import { teamLinks, youthLinks } from '@/data/teams'

const clubSublinks = [
  {
    name: 'Contact',
    href: '/club/contact',
    blank: false,
  },
  {
    name: 'Werking',
    href: '/club/werking',
    blank: false,
  },
  {
    name: 'Inschrijven',
    href: '/club/inschrijven',
    blank: false,
  },
  {
    name: 'Visie',
    href: '/club/visie',
    blank: false,
  },
  {
    name: 'Historiek',
    href: '/club/historiek',
    blank: false,
  },
  {
    name: 'Galerij',
    href: '/club/galerij',
    blank: false,
  },
]

const teamSublinks = [
  ...teamLinks,
  {
    name: 'Spelers',
    href: '/kern/spelers',
    blank: false,
  },
]

const youthSublinks = [
  {
    name: 'Info',
    href: '/jeugd',
    blank: false,
  },
  ...youthLinks,
]

export const headerLinks = [
  {
    name: 'Kern',
    sublinks: teamSublinks,
  },
  {
    name: 'Jeugd',
    sublinks: youthSublinks,
  },
  {
    name: 'Club',
    sublinks: clubSublinks,
  },
  {
    name: 'Nieuws',
    href: '/nieuws',
    blank: false,
  },
  {
    name: 'Tickets',
    href: '/#tickets-abbonementen',
    blank: false,
  },
  {
    name: 'Fanshop',
    href: '/fanshop',
    blank: true,
  },
]

const createFooterLinks = () => {
  const links = headerLinks.filter((link) => link.href)
  const result = [{ name: 'Links', links: links }]

  headerLinks.forEach((link) => {
    if (link.sublinks) {
      result.push({ name: link.name, links: link.sublinks })
    }
  })

  return result
}

export const footerLinks = createFooterLinks()
