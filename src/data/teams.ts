export const teams = [
  {
    id: 'eerste-ploeg',
    name: 'Eerste Ploeg',
    youth: false,
  },
  {
    id: 'beloften',
    name: 'Beloften',
    youth: false,
  },
  {
    id: 'u18',
    name: 'U18',
    youth: true,
  },
  {
    id: 'jm16',
    name: 'JM16',
    youth: true,
  },
  {
    id: 'jm14',
    name: 'JM14',
    youth: true,
  },
  {
    id: 'm13',
    name: 'M13',
    youth: true,
  },
  {
    id: 'jm12',
    name: 'JM12',
    youth: true,
  },
  {
    id: 'jm10',
    name: 'JM10',
    youth: true,
  },
  {
    id: 'jm8',
    name: 'JM8',
    youth: true,
  },
]

export const youthLinks = teams
  .filter((team) => team.youth)
  .map((team) => ({ name: team.name, href: `/teams/${team.id}` }))
