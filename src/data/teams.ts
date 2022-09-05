export const teams = [
  {
    uid: 'eerste-ploeg',
    name: 'Eerste Ploeg',
    youth: false,
  },
  {
    uid: 'beloften',
    name: 'Beloften',
    youth: false,
  },
  {
    uid: 'sasja3',
    name: 'Sasja 3',
    youth: false,
  },
  {
    uid: 'jm16',
    name: 'JM16',
    youth: true,
  },
  {
    uid: 'jm14',
    name: 'JM14',
    youth: true,
  },
  {
    uid: 'jm12-midden',
    name: 'JM12 Midden',
    youth: true,
  },
  {
    uid: 'jm12-noord',
    name: 'JM12 Noord',
    youth: true,
  },
  {
    uid: 'jm10',
    name: 'JM10',
    youth: true,
  },
  {
    uid: 'jm8',
    name: 'JM8',
    youth: true,
  },
]

export const youthLinks = teams
  .filter((team) => team.youth)
  .map((team) => ({ name: team.name, href: `/team/${team.uid}` }))
