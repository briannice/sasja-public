import { teamLinks, youthLinks } from '@/data/teams'

const clubSublinks = [
  {
    name: 'Werking',
    href: '/club/werking',
    blank: false,
  },
  {
    name: 'Locatie',
    href: '/club/locatie',
    blank: false,
  },
  {
    name: 'Inschrijven',
    href: '/club/inschrijven',
    blank: false,
  },
  {
    name: 'Aanspreekpunt integriteit',
    href: '/club/aanspreekpunt-integriteit',
    blank: false,
  },
  {
    name: 'Ongeval',
    href: '/club/ongeval',
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
