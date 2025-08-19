interface Team {
  name: string
  short: string
  logo: string
  venue: string
}

export const TEAMS_MAP: TeamsMap = {
  'Aalsmeer': {
    name: 'Green Park Aalsmeer',
    short: 'Aalsmeer',
    logo: '/clubs/aalsmeer.png',
    venue: '',
  },
  'Bevo': {
    name: 'Herpertz Bevo',
    short: 'Bevo',
    logo: '/clubs/bevo.png',
    venue: '',
  },
  'Bocholt': {
    name: 'Sezoens Achilles Bocholt',
    short: 'Bocholt',
    logo: 'uploads/club48/logo.png',
    venue: '',
  },
  'Eupen': {
    name: 'KTSV Eupen',
    short: 'Eupen',
    logo: 'uploads/club119/ktsv-eupen-1.jpg',
    venue: '',
  },
  'Houten': {
    name: 'Handbal Houten',
    short: 'Houten',
    logo: '/clubs/houten.png',
    venue: '',
  },
  'Hurry-up': {
    name: 'Hurry-up',
    short: 'Hurry-up',
    logo: '/clubs/hurry-up.png',
    venue: '',
  },
  'Pelt': {
    name: 'Sporting Pelt',
    short: 'Pelt',
    logo: 'uploads/club14/112-sporting-pelt.png',
    venue: '',
  },
  'Sasja': {
    name: 'BioBest Sasja HC',
    short: 'Sasja HC',
    logo: 'uploads/club24/sasja-goud-png.png',
    venue: '',
  },
  'Lions': {
    name: 'Limburg Lions Sittardia',
    short: 'Lions',
    logo: '/clubs/lions.png',
    venue: '',
  },
  'HUBO': {
    name: 'Hubo Handbal',
    short: 'Hubo',
    logo: 'uploads/club16/image001.jpg',
    venue: '',
  },
  'Visé': {
    name: 'HC Visé BM',
    short: 'Visé',
    logo: 'uploads/club94/hc-vis-bm.jpg',
    venue: '',
  },
  'Volendam': {
    name: 'Kras Volendam',
    short: 'Volendam',
    logo: '/clubs/volendam.png',
    venue: '',
  },
}

interface TeamsMap {
  [teamKey: string]: Team
}

export class TeamService {

  private getTeam(name: string): Team | undefined {
    return TEAMS_MAP[name]
  }

  private cleanName(name: string): string {
    if (name) {
      return name.replaceAll(' HS1', '').trim()
    }
    return name
  }

  public getShortName(name: string): string {
    const team = this.getTeam(name)
    return team ? team.short : this.cleanName(name)
  }

  public getName(name: string): string {
    const team = this.getTeam(name)
    return team ? team.name : this.cleanName(name)
  }

  public getLogo(name: string): string {
    const team = this.getTeam(name)
    return team ? team.logo : ''
  }

  public getVenue(name: string): string {
    const team = this.getTeam(name)
    return team ? team.venue : ''
  }
}