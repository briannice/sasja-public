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

export type TeamCompetition = BaseModel & {
  name: string
  serieId: number
  vhvId: number
  ranking: boolean
}

export type TeamModel = BaseModel & {
  name: string
  uid: string
  youth: boolean
  calender: string
  competitions: TeamCompetition[]
}

export type PlayerModel = BaseModel & {
  firstname: string
  lastname: string
  position: string
  description: string
  backNumber: string
  birthday: string
  registration: string
  public: boolean
  team: {
    id: string
    name: string
  }
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
  public: boolean
  team: {
    id: string
    name: string
  }
  opponent: {
    id: number
    name: string
    short: string
    logo: string
  }
}

export type StaffModel = {
  name: string
  function: string
  email: string
  telephone: string
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
  id: number
  date: string
  time: string | null
  venue_id: number
  home_id: number
  away_id: number
  home_score: number
  away_score: number
  game_status_id: number
  score_status_id: number
  home_name: string
  home_short: string
  away_name: string
  away_short: string
  home_logo: string
  away_logo: string
  venue_name: string
  venue_short: string
  venue_city: string
  game_number: string
  serie_id: number
  serie_name: string
  serie_short: string
  referees: Referee[]
  has_detail: boolean
  // below fields are retrieved with a different API and considered 'detail'
  home_team_pin: string
  away_team_pin: string
  match_code: string
  venue_street: string
  venue_zip: string
}

export type Referee = {
  firstname: string
  surname: string
}

export type GameDay = {
  date: string
  games: GameModel[]
}

export type GameWeek = GameModel[]

export type TimeLineItem =
  | {
      name: 'event'
      data: EventModel
    }
  | {
      name: 'news'
      data: NewsModel
    }
  | {
      name: 'matchreport'
      data: MatchReportModel
    }

export type TimeLine = TimeLineItem[]
