import { HandbalNlApi, teamService } from '@/services/handbalnl/index'
import { RankModel } from '@/types/models'
import * as xlsx from 'xlsx'

export const getHandbalNlRanking = async () => {
  const ranking: RankModel[] = []

  const formData = new URLSearchParams()
  formData.append('getter', 'xlsx')
  formData.append('page', 'poules')
  formData.append('tab', 'standen')
  formData.append('excludedClubs', 'ZV452QZ ZV452DM ZV452JS ZT814KL')
  formData.append('params[]', 'NHV Landelijk | Zaal | Heren Super Handball League | Super Handball League')
  formData.append('params[]', '37674')

  const { data, status } = await HandbalNlApi.post(
    'export-uitslagen',
    formData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      responseType: 'arraybuffer',
    },
  )

  if (status !== 200) return []

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