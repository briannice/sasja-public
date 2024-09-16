import axios from 'axios'
import path from 'path'
import fs from 'fs'

export const RETRIEVE_LIVE_DATA = false

export enum Page {
  RANKING="/general/api/sportsuite/pool-standing/37674",
  FUTURE_GAMES="general/api/sportsuite/match-program/ALL/37674",
  PLAYED_GAMES="general/api/sportsuite/match-result/ALL/37674"
}

class ShlService {
  private shlApi = axios.create({
    baseURL: 'https://api.superhandballeague.com/',
    timeout: 10000,
    headers: {
      accept: 'application/json'
    }
  })

  private readFromFile(tab: Page): any {
    const file = tab === Page.RANKING ? "stand.json" : (tab === Page.FUTURE_GAMES ? "programma.json" : "uitslagen.json")
    const filePath = path.join(process.cwd(), `static/shl/${file}`)
    return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : []
  }

  public async retrieveData(page: Page): Promise<any> {
    const { data, status } = RETRIEVE_LIVE_DATA
      ? await this.shlApi.get(page)
      : { data: this.readFromFile(page), status: 200 }
      if (status === 200) {
        return data
      }
      return []
  }
}

export function lookupTeam(teamName: string) {
  const lowerTeam = teamName.toLowerCase()
  for (const [k,v] of teamMapping) {
    if (lowerTeam.includes(k)) {
      return v
    }
  }
  return teamName
}

export const teamMapping = new Map([
  ["aalsmeer","Green Park/Handbal Aalsmeer HS1"],
  ["bevo","Herpertz/Bevo HC HS1"],
  ["bocholt","Sezoens Achilles Bocholt HS1"],
  ["eupen","KTSV Eupen (B) HS1"],
  ["houten","LvanRaak Milieu/Handbal Houten HS1"],
  ["hurry-up","JD Techniek/ Hurry-up HS1"],
  ["pelt","Sporting Pelt HS1"],
  ["sasja","Biobest/ Sasja HC HS1"],
  ["lions","KEMBIT-LIONS/Sittardia HS1"],
  ["hubo","HUBO Handbal HS1"],
  ["visé","HC Visé BM HS1"],
  ["volendam","KRAS/Volendam HS1"]
])


export const shlService = new ShlService()
