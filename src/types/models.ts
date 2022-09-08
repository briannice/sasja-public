export type BaseModel = {
  id: string
  created: string
  updated: string
}

export type EventModel = BaseModel & {
  name: string
  content: string
  time: string
  location: string
  address: string
  public: boolean
}

export type TeamModel = BaseModel & {
  name: string
  uid: string
  youth: boolean
  competitions: {
    name: string
    serieId: number
  }[]
}

export type PlayerModel = BaseModel & {
  firstname: string
  lastname: string
  position: string
  description: string
  backNumber: number
  birthday: string
  registration: string
  public: boolean
  teamId: string
}

export type NewsModel = BaseModel & {
  title: string
  time: string
  content: string
  tag: string
  public: boolean
  pinned: boolean
}

export type OpponentModel = BaseModel & {
  name: string
  short: string
  logo: string
}

export type MatchReportModel = BaseModel & {
  time: string
  tag: string
  writer: string
  home: boolean
  score: { sasja: number; opponent: number }[]
  content: string
  opponentId: string
  teamId: string
  public: boolean
}

export type RankModel = {
  id: number
  name: string
  short: string
  logo: string
  played: number
  wins: number
  losses: number
  draws: number
  scored: number
  conceded: number
  difference: number
  points: number
  results: string[]
  position: number
}

export type GameModel = {
  reference: string
  week: number
  serie_id: number
  date: string
  time: string
  venue_id: number
  home_team_id: number
  away_team_id: number
  home_score: number
  away_score: number
  game_status_id: number
  score_status_id: number
  date_status_id: number
  home_forfeit_status_id: number
  away_forfeit_status_id: number
  round: string
  code: string
  id: number
  created_at: string
  updated_at: string
  serie_reference: string
  serie_name: string
  serie_short_name: string
  home_team_name: string
  home_team_short_name: string
  away_team_name: string
  away_team_short_name: string
  home_team_reference: string
  away_team_reference: string
  serie_type_competition: number
  venue_name: string
  venue_short_name: string
  venue_city: string
  home_club_id: number
  away_club_id: number
  home_club_name: string
  away_club_name: string
  home_club_reference: number
  away_club_reference: number
  home_club_logo_img_url: string
  away_club_logo_img_url: string
  season_id: number
  season_start_date: string
  season_end_date: string
  allow_game_details_update: number
  serie_order: number
  competition_order: number
  division_order: number
  with_rankings: number
  home_club_province: string
  referees_number: number
}
