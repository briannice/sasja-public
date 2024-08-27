import axios from 'axios'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { RETRIEVE_LIVE_DATA } from '@/services/competitions/handbalnl/competitions'

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

export function toIsoDate(dateString: string): string {
  if (dateString && dateString.includes('-')) {
    const [day, month, year] = dateString.split('-')
    return `${year}-${month}-${day}`
  }
  return ''
}

export function fromIsoDate(dateString: string): string {
  if (dateString && dateString.includes('-')) {
    const [year, month, day] = dateString.split('-')
    return `${day}-${month}-${year}`
  }
  return ''
}

interface HandbalNlService {
  retrieveData(tab: string, fromDate: string, toDate: string): Promise<ArrayBuffer>
}

class HandbalNlLiveService implements HandbalNlService {
  private handbalNlApi = axios.create({
    baseURL: 'https://www.handbal.nl/',
    timeout: 10000,
  })

  public async retrieveData(tab: string, fromDate = '', toDate = '') {
    const formData = new URLSearchParams()
    formData.append('getter', 'xlsx')
    formData.append('page', 'poules')
    formData.append('tab', 'programma')
    if ('programma' === tab) {
      formData.append('filters', `{ "from": "${fromIsoDate(fromDate)}", "to": "${fromIsoDate(toDate)}", "home":[""] }`)
    }
    formData.append('excludedClubs', 'ZV452QZ ZV452DM ZV452JS ZT814KL')
    formData.append('params[]', 'NHV Landelijk | Zaal | Heren Super Handball League | Super Handball League')
    formData.append('params[]', '37674')

    const { data, status } = await this.handbalNlApi.post(
      'export-uitslagen',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        responseType: 'arraybuffer',
      },
    )

    return status === 200 ? data : new ArrayBuffer(0)
  }
}

class HandbalNlFileService implements HandbalNlService {
  public async retrieveData(tab: string) {
    const filePath = path.join(process.cwd(), `static/handbalnl/${tab}.xlsx`)
    return fs.existsSync(filePath) ? fs.readFileSync(filePath) : new ArrayBuffer(0)
  }
}

export const handbalNlService = RETRIEVE_LIVE_DATA ? new HandbalNlLiveService() : new HandbalNlFileService()