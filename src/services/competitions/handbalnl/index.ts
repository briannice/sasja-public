import axios from 'axios'
import fs from 'fs'
import path from 'path'

export const RETRIEVE_LIVE_DATA = false

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
  private CACHE_DURATION = 60 * 60 * 1000 // 60 minutes (in milliseconds)
  private RATE_LIMIT_DURATION = 5 * 1000 // 5 second rate-limit (in milliseconds)

  private cache: { [key: string]: { data: ArrayBuffer; lastFetched: number } } = {}
  private lastApiCallTime = 0

  private isCacheValid(cacheKey: string): boolean {
    const cachedEntry = this.cache[cacheKey]
    if (!cachedEntry) return false

    const now = Date.now()
    return (now - cachedEntry.lastFetched) < this.CACHE_DURATION
  }

  private getTimeUntilNextApiCall(): number {
    const lastCallTime = this.lastApiCallTime
    if (lastCallTime == 0) return 0

    const now = Date.now()
    const elapsedTime = now - lastCallTime
    const remainingTime = this.RATE_LIMIT_DURATION - elapsedTime

    return Math.max(remainingTime, 0)
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private handbalNlApi = axios.create({
    baseURL: 'https://www.handbal.nl/',
    timeout: 10000,
  })

  private makeFormData(tab: string): URLSearchParams {
    const formData = new URLSearchParams()
    formData.append('getter', 'xlsx')
    formData.append('page', 'poules')
    formData.append('tab', tab)
    // if ('programma' === tab) {
    //   formData.append('filters', `{ "from": "${fromIsoDate(fromDate)}", "to": "${fromIsoDate(toDate)}", "home":[""] }`)
    // }
    formData.append('excludedClubs', 'ZV452QZ ZV452DM ZV452JS ZT814KL')
    formData.append('params[]', 'NHV Landelijk | Zaal | Heren Super Handball League | Super Handball League')
    formData.append('params[]', '37674')
    return formData
  }

  private readFromFile(tab: string): ArrayBuffer {
    const filePath = path.join(process.cwd(), `static/handbalnl/${tab}.xlsx`)
    return fs.existsSync(filePath) ? fs.readFileSync(filePath) : new ArrayBuffer(0)
  }

  public async retrieveData(tab: string): Promise<ArrayBuffer> {
    const cacheKey = `${tab}`
    if (this.isCacheValid(cacheKey)) {
      console.log(`\nCached response for handbalnl for ${tab} at ${new Date().toISOString()}`)
      return this.cache[cacheKey].data
    }
    const timeUntilNextApiCall = this.getTimeUntilNextApiCall()
    if (timeUntilNextApiCall > 0) {
      await this.delay(timeUntilNextApiCall)
    }

    const now = Date.now()
    console.log(`\nMaking call to handbalnl for ${tab} at ${new Date(now).toISOString()}`)
    this.lastApiCallTime = now
    const { data, status } = RETRIEVE_LIVE_DATA
      ? await this.handbalNlApi.post(
        'export-uitslagen',
        this.makeFormData(tab),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          responseType: 'arraybuffer',
        })
      : { data: this.readFromFile(tab), status: 200 }

    if (status === 200) {
      this.cache[cacheKey] = { data, lastFetched: now }
      return data
    }
    return new ArrayBuffer(0)
  }
}

export function lookupTeam(teamName: string) {
  if (teamName.toLowerCase().includes('aalsmeer')) return 'Aalsmeer'
  if (teamName.toLowerCase().includes('bevo')) return 'Bevo'
  if (teamName.toLowerCase().includes('bocholt')) return 'Bocholt'
  if (teamName.toLowerCase().includes('eupen')) return 'Eupen'
  if (teamName.toLowerCase().includes('houten')) return 'Houten'
  if (teamName.toLowerCase().includes('hurry-up')) return 'Hurry-up'
  if (teamName.toLowerCase().includes('pelt')) return 'Pelt'
  if (teamName.toLowerCase().includes('sasja')) return 'Sasja'
  if (teamName.toLowerCase().includes('lions')) return 'Lions'
  if (teamName.toLowerCase().includes('hubo')) return 'HUBO'
  if (teamName.toLowerCase().includes('visé')) return 'Visé'
  if (teamName.toLowerCase().includes('volendam')) return 'Volendam'
  return teamName
}

export const handbalNlService = new HandbalNlLiveService()
