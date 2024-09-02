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