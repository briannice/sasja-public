import { HandballBelgiumApi } from '@/services/hb'
import { RankModel } from '@/types/models'

export const getHandballBelgiumRanking = async (serie_id: number) => {
  const { data, status } = await HandballBelgiumApi.get(
    `ng/ranking?serie_id=${serie_id}&sort=position`
  )

  if (status !== 200) return []

  const ranking: RankModel[] = data.elements.map((e: any) => ({
    id: e.id,
    name: e.team_name,
    short: e.team_short_name,
    logo: e.club_logo_img_url,
    played: e.played,
    wins: e.wins,
    losses: e.losses,
    draws: e.draws,
    scored: e.score_for,
    conceded: e.score_against,
    difference: e.score_for - e.score_against,
    points: e.points,
    results: e.result_sequence.replaceAll(/\"|\[|\]/g, '').split(','),
    position: e.position,
  }))

  return ranking
}
