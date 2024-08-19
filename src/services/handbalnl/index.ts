import axios from 'axios'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export const HandbalNlApi = axios.create({
  baseURL: 'https://www.handbal.nl/',
  timeout: 10000,
})

interface Team {
  name: string;
  short: string;
  logo: string;
}

interface TeamsMap {
  [teamKey: string]: Team;
}

class TeamService {
  private readonly teamsMap: TeamsMap

  constructor() {
    const filePath = path.join(process.cwd(), 'static/handbalnl/teams.yaml')
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
}

export const teamService = new TeamService()

interface Venue {
  name: string
  short: string
  city: string
  street: string
  zip: string
}

interface VenuesMap {
  [venueKey: string]: Venue;
}

class VenueService {
  private readonly venuesMap: VenuesMap

  constructor() {
    const filePath = path.join(process.cwd(), 'static/handbalnl/venues.yaml')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    this.venuesMap = yaml.load(fileContents) as VenuesMap
  }

  private getVenue(name: string): Venue | undefined {
    return this.venuesMap[name]
  }

  public getShortName(name: string): string {
    const venue = this.getVenue(name)
    return venue ? venue.short : name
  }

  public getName(name: string): string {
    const venue = this.getVenue(name)
    return venue ? venue.name : name
  }

  public getStreet(name: string): string {
    const venue = this.getVenue(name)
    return venue ? venue.street : ''
  }

  public getCity(name: string): string {
    const venue = this.getVenue(name)
    return venue ? venue.city : ''
  }

  public getZip(name: string): string {
    const venue = this.getVenue(name)
    return venue ? venue.zip : ''
  }
}

export const venueService = new VenueService()