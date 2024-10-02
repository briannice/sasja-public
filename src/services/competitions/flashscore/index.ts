import { TeamCompetition } from '@/types/models'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium-min'

export type FlashScoreGame = {
  id: string
  dateTime: string,
  homeTeam: string,
  awayTeam: string,
  homeScore: number,
  awayScore: number,
}

// https://gist.github.com/kettanaito/56861aff96e6debc575d522dd03e5725
// https://github.com/hehehai/headless-try/tree/main
const localExecutablePath =
  process.platform === 'win32'
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
      ? '/usr/bin/google-chrome'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const remoteExecutablePath =
  'https://github.com/Sparticuz/chromium/releases/download/v127.0.0/chromium-v127.0.0-pack.tar'

const puppeteerLocal = process.env.PUPPETEER_LOCATION === 'LOCAL'


export class FlashScoreService {
  private async getBrowser() {
    return await puppeteer.launch({
      ignoreDefaultArgs: ['--enable-automation'],
      args: puppeteerLocal
        ? [
          '--disable-blink-features=AutomationControlled',
          '--disable-features=site-per-process',
          '-disable-site-isolation-trials',
        ]
        : [...chromium.args, '--disable-blink-features=AutomationControlled'],
      executablePath: puppeteerLocal
        ? localExecutablePath
        : await chromium.executablePath(remoteExecutablePath),
      headless: chromium.headless,
    })
  }

  private getLeague(competition: TeamCompetition) {
    if (competition.name === 'Super Handball League')
      return 'super-handball-league'
    throw new Error('Wrong competition name')
  }

  public async getGames(competition: TeamCompetition, page: string): Promise<FlashScoreGame[]> {
    const browser = await this.getBrowser()
    try {
      const browserPage = await browser.newPage()
      try {
        await browserPage.goto(`https://www.flashscore.com/handball/europe/${this.getLeague(competition)}/${page}/`, {
          waitUntil: "networkidle2",
          timeout: 60000,
        })
        return await browserPage.evaluate(() => {
          return Array.from(document.querySelectorAll(
            '.event__match.event__match--static.event__match--twoLine',
          )).map((game) => {
            return {
              id: game?.id.replace('g_7_', ''),
              dateTime: game?.querySelector('.event__time')?.textContent?.replace('FRO', ''),
              homeTeam: game?.querySelector('.event__participant--home')?.textContent,
              awayTeam: game?.querySelector('.event__participant--away')?.textContent,
              homeScore: Number(game.querySelector('.event__score--home')?.textContent?.replace('-', '0')),
              awayScore: Number(game.querySelector('.event__score--away')?.textContent?.replace('-', '0')),
            } as FlashScoreGame
          })
        })
      } finally {
        await browserPage.close()
      }
    } finally {
      await browser.close()
    }
  }
}

export function lookupTeam(teamName: string) {
  const lowerTeam = teamName.toLowerCase()
  for (const [k, v] of teamMapping) {
    if (lowerTeam.includes(k)) {
      return v
    }
  }
  return teamName
}

export const teamMapping = new Map([
  ['aalsmeer', 'Aalsmeer'],
  ['bevo', 'Bevo HC'],
  ['bocholt', 'Bocholt'],
  ['eupen', 'Eupen'],
  ['houten', 'Houten'],
  ['hurry-up', 'Hurry-Up'],
  ['pelt', 'Sporting Pelt'],
  ['sasja', 'Sasja KV'],
  ['lions', 'Limburg Lions'],
  ['hubo', 'Hubo Handbal'],
  ['visé', 'Vise'],
  ['volendam', 'KRAS/Volendam'],
])