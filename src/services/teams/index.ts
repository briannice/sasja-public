import fs from 'fs'
import yaml from 'js-yaml'

interface Team {
  name: string
  short: string
  logo: string
  venue: string
}

interface TeamsMap {
  [teamKey: string]: Team
}

export class TeamService {
  private readonly teamsMap: TeamsMap

  constructor(filePath: string) {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    this.teamsMap = yaml.load(fileContents) as TeamsMap
  }

  private getTeam(name: string): Team | undefined {
    return this.teamsMap[name]
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