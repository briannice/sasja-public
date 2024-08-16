import { TeamCompetition } from '@/types/models'
import { getHandballBelgiumRanking } from '@/services/hb/ranking'
import { getFileBasedRanking } from '@/services/filebased/ranking'

export const getCompetitionRanking = async (competition: TeamCompetition) => {
  if (competition.name == 'Super Handball League')
    return getFileBasedRanking(competition)
  return getHandballBelgiumRanking(competition.serieId)
}