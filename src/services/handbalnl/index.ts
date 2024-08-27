import axios from 'axios'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { RETRIEVE_LIVE_DATA } from '@/services/handbalnl/competitions'

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
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'cookie': 'CookieConsent={stamp:%27DOEwNIZxHaIPetfdGHMZAMo3rURsGOxsGs9Grg1K98kcdMpyF4GiRw==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1722245151437%2Cregion:%27be%27}; sbjs_migrations=1418474375998%3D1; sbjs_current_add=fd%3D2024-08-27%2013%3A03%3A32%7C%7C%7Cep%3Dhttps%3A%2F%2Fwww.handbal.nl%2F%7C%7C%7Crf%3D%28none%29; sbjs_first_add=fd%3D2024-08-27%2013%3A03%3A32%7C%7C%7Cep%3Dhttps%3A%2F%2Fwww.handbal.nl%2F%7C%7C%7Crf%3D%28none%29; sbjs_current=typ%3Dtypein%7C%7C%7Csrc%3D%28direct%29%7C%7C%7Cmdm%3D%28none%29%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29%7C%7C%7Cid%3D%28none%29%7C%7C%7Cplt%3D%28none%29%7C%7C%7Cfmt%3D%28none%29%7C%7C%7Ctct%3D%28none%29; sbjs_first=typ%3Dtypein%7C%7C%7Csrc%3D%28direct%29%7C%7C%7Cmdm%3D%28none%29%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29%7C%7C%7Cid%3D%28none%29%7C%7C%7Cplt%3D%28none%29%7C%7C%7Cfmt%3D%28none%29%7C%7C%7Ctct%3D%28none%29; sbjs_udata=vst%3D1%7C%7C%7Cuip%3D%28none%29%7C%7C%7Cuag%3DMozilla%2F5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F127.0.0.0%20Safari%2F537.36; sbjs_session=pgs%3D2%7C%7C%7Ccpg%3Dhttps%3A%2F%2Fwww.handbal.nl%2Fuitslagen-standen%2F',
          'origin': 'https://www.handbal.nl',
          'priority': 'u=1, i',
          'referer': 'https://www.handbal.nl/uitslagen-standen/',
          'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
          'x-requested-with': 'XMLHttpRequest',
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