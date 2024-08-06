import { BENELeagueApi } from '@/services/bnl'
import * as cheerio from 'cheerio';
import { RankModel } from '@/types/models'


export const getBENELeagueRanking = async () => {
  const { data, status } = await BENELeagueApi.get(
    `ranking/`
  )

  if (status !== 200) return []

  const findLogo = (rankingPage: cheerio.CheerioAPI, row:  cheerio.Element):string => {
    const img = rankingPage("img", row)
    if (img) {
      const src = img.attr("src")
      return src ? src.trim() : ""
    }
    return ""
  }

  const ranking: RankModel[] = [];
  const rankingPage = cheerio.load(data)

  rankingPage("table>tbody>tr").each((_, row) => {
    const rankingRow: string[] = []
    rankingPage("td,th", row).each((index, td) => {
      rankingRow.push(rankingPage(td).text().trim())
    })
    ranking.push({
      id: 0,
      name: rankingRow[1],
      short: rankingRow[1],
      logo: findLogo(rankingPage, row),
      played: Number(rankingRow[2]),
      wins: Number(rankingRow[3]),
      losses: Number(rankingRow[4]),
      draws: Number(rankingRow[5]),
      scored: Number(rankingRow[6]),
      conceded: Number(rankingRow[7]),
      difference: Number(rankingRow[6])-Number(rankingRow[7]),
      points: Number(rankingRow[8]),
      results: [],
      position: Number(rankingRow[0]),
    });

  })

  return ranking;
}

