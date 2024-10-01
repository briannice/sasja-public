import { TeamCompetition } from '@/types/models'

export type FlashScoreGame = {
  id: string
  dateTime: string,
  homeTeam: string,
  awayTeam: string,
  homeScore: number,
  awayScore: number,
}

export class FlashScoreService {
  private getLeague(competition: TeamCompetition) {
    if (competition.name === 'Super Handball League')
      return 'super-handball-league'
    throw new Error('Wrong competition name')
  }

  public async getGames(competition: TeamCompetition, page: string): Promise<FlashScoreGame[]> {
    let browser = null;
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      // running on the Vercel platform.
      const chromium = require('@sparticuz/chromium-min')
      const puppeteer = require('puppeteer-core')
      browser = await puppeteer.launch({
        args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(
          `https://github.com/Sparticuz/chromium/releases/download/v127.0.0/chromium-v127.0.0-pack.tar`
        ),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    } else {
      // running locally.
      const puppeteer = require('puppeteer')
      browser = await puppeteer.launch()
    }

    const browserPage = await browser.newPage()
    await browserPage.goto(`https://www.flashscore.com/handball/europe/${this.getLeague(competition)}/${page}/`)
    const games = await browserPage.evaluate(() => {
      return Array.from(document.querySelectorAll(
        '.event__match.event__match--static.event__match--twoLine',
      )).map((game) => {
        return {
          id: game?.id.replace("g_7_", ""),
          dateTime: game?.querySelector('.event__time')?.textContent?.replace("FRO", ""),
          homeTeam: game?.querySelector('.event__participant--home')?.textContent,
          awayTeam: game?.querySelector('.event__participant--away')?.textContent,
          homeScore: Number(game.querySelector('.event__score--home')?.textContent?.replace("-", "0")),
          awayScore: Number(game.querySelector('.event__score--away')?.textContent?.replace("-", "0")),
        } as FlashScoreGame
      })
    })
    await browserPage.close()
    await browser.close()
    return games
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