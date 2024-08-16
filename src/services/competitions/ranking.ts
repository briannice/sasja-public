import { TeamCompetition } from '@/types/models'
import { getHandballBelgiumRanking } from '@/services/hb/ranking'
import { getFileBasedRanking } from '@/services/filebased/ranking'
import { FILE_BASED_COMPETITIONS } from '@/services/filebased/competitions'

export const getCompetitionRanking = async (competition: TeamCompetition) => {
  if (competition.name in FILE_BASED_COMPETITIONS)
    return getFileBasedRanking(competition)
  return getHandballBelgiumRanking(competition.serieId)
}