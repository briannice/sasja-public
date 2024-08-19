import { TeamCompetition } from '@/types/models'
import { getHandballBelgiumRanking } from '@/services/hb/ranking'
import { getFileBasedRanking } from '@/services/filebased/ranking'
import { getHandbalNlRanking } from '@/services/handbalnl/ranking'
import { FILE_BASED_COMPETITIONS } from '@/services/filebased/competitions'
import { HANDBALNL_BASED_COMPETITIONS } from '@/services/handbalnl/competitions'

export const getCompetitionRanking = async (competition: TeamCompetition) => {
  return (FILE_BASED_COMPETITIONS.some(other => other.name === competition.name)) ?
    getFileBasedRanking(competition) :
    (HANDBALNL_BASED_COMPETITIONS.some(other => other.name === competition.name)) ?
      getHandbalNlRanking() :
      getHandballBelgiumRanking(competition.serieId)
}