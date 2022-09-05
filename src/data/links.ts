import { teamLinks, youthLinks } from '@/data/teams'

const clubSublinks = [
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
]

const teamSublinks = [
  {
    name: 'Algemeen',
    href: '/jeugd',
  },
  ...teamLinks,
]

const youthSublinks = [
  {
    name: 'Algemeen',
    href: '/jeugd',
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
