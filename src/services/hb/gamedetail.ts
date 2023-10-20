import {HandballBelgiumApi} from "@/services/hb/index";
import {GameDetailModel, Referee} from "@/types/models";

export const getHandballBelgiumGameDetail = async (gameId: number, referees: Referee[]) => {
    const {data, status} = await HandballBelgiumApi.get(
        `ng/game/${gameId}`
    )
    if (status !== 200) return []

    const game: GameDetailModel = {
        id: data.data.id,
        date: data.data.date,
        time: data.data.time || null,
        venue_id: data.data.venue_id || null,
        home_score: data.data.home_score || 0,
        away_score: data.data.away_score || 0,
        home_id: data.data.home_team_id || 0,
        away_id: data.data.away_team_id || 0,
        game_status_id: data.data.game_status_id,
        score_status_id: data.data.score_status_id,
        home_name: data.data.home_team_name || '',
        home_short: data.data.home_team_short_name || '',
        away_name: data.data.away_team_name || '',
        away_short: data.data.away_team_short_name || '',
        home_logo: data.data.home_club_logo_img_url || null,
        away_logo: data.data.away_club_logo_img_url || null,
        venue_name: data.data.venue_name || '',
        venue_short: data.data.venue_short_name || '',
        venue_city: data.data.venue_city || '',
        game_number: data.data.reference,
        serie_id: data.data.serie_id,
        serie_name: data.data.serie_name,
        serie_short: data.data.serie_short_name,
        referees: referees,
        home_team_pin: data.data.home_team_pin || '',
        away_team_pin: data.data.away_team_pin || '',
        match_code: data.data.code || '',
        venue_street: data.data.venue_street,
        venue_zip: data.data.venue_zip
    }
    return game
}
