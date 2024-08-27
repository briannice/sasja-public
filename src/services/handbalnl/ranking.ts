import { handbalNlService, teamService } from '@/services/handbalnl/index'
import { RankModel } from '@/types/models'
import * as xlsx from 'xlsx'

export const getHandbalNlRanking = async () => {
  const ranking: RankModel[] = []

  const data = await handbalNlService.retrieveData('standen')

  if (data.byteLength === 0) return []

  const workbook = xlsx.read(data)
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  const handNlRanking: HandbalNlRanking[] = xlsx.utils.sheet_to_json(worksheet)
  handNlRanking.forEach((rankingRow) => {
    ranking.push({
      id: 0,
      name: teamService.getName(rankingRow.Team),
      short: teamService.getShortName(rankingRow.Team),
      logo: teamService.getLogo(rankingRow.Team),
      played: rankingRow.Gespeeld,
      wins: rankingRow.Winst,
      losses: rankingRow.Verlies,
      draws: rankingRow.Gelijk,
      scored: rankingRow.Voor,
      conceded: rankingRow.Tegen,
      difference: rankingRow.Verschil,
      points: rankingRow.Punten,
      results: [],
      position: rankingRow['#'],
    })
  })

  return ranking
}

type HandbalNlRanking = {
  Team: string,
  Gespeeld: number,
  Winst: number,
  Verlies: number,
  Gelijk: number,
  Voor: number,
  Tegen: number,
  Verschil: number,
  Punten: number,
  '#': number
}