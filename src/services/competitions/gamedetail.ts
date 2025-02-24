import { GameModel } from '@/types/models'

import { HBCompetitionIntegration } from '@/services/competitions/hb/integration'

const HB_INTEGRATION = new HBCompetitionIntegration()

export type GamedetailIntegration = Gamedetail

export interface Gamedetail {
  getGameDetail(game: GameModel, isAuthenticated: boolean): Promise<GameModel>
}

class AggregatingGameDetailService implements Gamedetail {
  public async getGameDetail(game: GameModel, isAuthenticated: boolean): Promise<GameModel> {
    if (!game.has_detail)
      return await HB_INTEGRATION.getGameDetail(game, isAuthenticated)
    return game
  }
}

export const gameDetailService = new AggregatingGameDetailService()
