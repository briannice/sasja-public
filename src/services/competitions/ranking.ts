import { TeamCompetition } from '@/types/models'
import { getBENELeagueRanking } from '@/services/bnl/ranking'
import { getHandballBelgiumRanking } from '@/services/hb/ranking'

export const getCompetitionRanking = async (competition: TeamCompetition) => {
  if (false) // (competition.name == 'BENE-League')
    return getBENELeagueRanking()
  return getHandballBelgiumRanking(competition.serieId)
}