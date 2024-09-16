import { AbstractCompetitionIntegration } from '@/services/competitions/abstract/integration'
import { GameModel, RankModel, TeamCompetition } from '@/types/models'
import { SHL_BASED_COMPETITIONS } from '@/services/competitions/competition'
import { lookupTeam, Page, shlService, teamMapping } from '@/services/competitions/shl/index'
import path from 'path'
import { TeamService } from '@/services/teams'
import { VenueService } from '@/services/venues'

export class SuperHandballLeageCompetitionIntegration extends AbstractCompetitionIntegration {

  private teamService = new TeamService(path.join(process.cwd(), 'static/shl/teams.yaml'))
  private venueService = new VenueService(path.join(process.cwd(), 'static/shl/venues.yaml'))

  public async getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]> {
    const games = await Promise.all([
      this.getCompetitionCalendarPart(competition, Page.PLAYED_GAMES),
      this.getCompetitionCalendarPart(competition, Page.FUTURE_GAMES),
    ])
    return [
      ...games[0], // played games
      ...games[1] // future games, filtering out games that are already in played games
        .filter(futureGame =>
          !games[0].some(playedGame => playedGame.game_number === futureGame.game_number),
        ),
    ].sort((game1, game2) =>
      game1.date.localeCompare(game2.date) !== 0 ?
        game1.date.localeCompare(game2.date) :
        (game1.time && game2.time ?
          game1.time.localeCompare(game2.time) :
          0),
    )
  }

  private async getCompetitionCalendarPart(competition: TeamCompetition, page: Page): Promise<GameModel[]> {
    const data = await shlService.retrieveData(page)

    if (data.size === 0) return []
    return data.map((e: any) => ({
      id: 0,
      date: this.toIsoDate(e.date),
      time: e.match_time,
      venue_id: 0,
      home_id: e.home_team_id,
      away_id: e.away_team_id,
      home_score: e.status === "Gepland" ? 0:e.home_result,
      away_score: e.status === "Gepland" ? 0:e.away_result,
      game_status_id: 0,
      score_status_id: e.status === "Gepland" ? 0 : 1,
      home_name: this.teamService.getName(lookupTeam(e.home_team)),
      home_short: this.teamService.getShortName(lookupTeam(e.home_team)),
      away_name: this.teamService.getName(lookupTeam(e.away_team)),
      away_short: this.teamService.getShortName(lookupTeam(e.away_team)),
      home_logo: this.teamService.getLogo(lookupTeam(e.home_team)),
      away_logo: this.teamService.getLogo(lookupTeam(e.away_team)),
      venue_name: this.venueService.getName(this.teamService.getVenue(lookupTeam(e.home_team))),
      venue_short: this.venueService.getShortName(this.teamService.getVenue(lookupTeam(e.home_team))),
      venue_city: this.venueService.getCity(this.teamService.getVenue(lookupTeam(e.home_team))),
      game_number: e.external_match_id,
      serie_id: competition.serieId,
      serie_name: competition.name,
      serie_short: competition.name,
      referees: [],
      has_detail: true,
      home_team_pin: '',
      away_team_pin: '',
      match_code: '',
      venue_street: this.venueService.getStreet(this.teamService.getVenue(lookupTeam(e.home_team))),
      venue_zip: this.venueService.getZip(this.teamService.getVenue(lookupTeam(e.home_team))),
    })) as GameModel[]

  }

  public async getCompetitionRanking(): Promise<RankModel[]> {
    const data = await shlService.retrieveData(Page.PLAYED_GAMES)

    if (data.size === 0) return []

    const emptyRanking = new Map<string, RankModel>(Array.from(teamMapping.values()).map((fullName) => ([fullName, {
      id: 0,
      name: this.teamService.getName(fullName),
      short: this.teamService.getShortName(fullName),
      logo: this.teamService.getLogo(fullName),
      played: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      scored: 0,
      conceded: 0,
      difference: 0,
      points: 0,
      results: [],
      position: 0,
    } as RankModel])))

    const ranking: Map<string, RankModel> = data.reduce((acc: Map<string, RankModel>, game: any) => {
      const homeRow = acc.get(lookupTeam(game.home_team))!
      const awayRow = acc.get(lookupTeam(game.away_team))!
      const winner = game.home_result < game.away_result ? awayRow : (game.home_result > game.away_result ? homeRow : null)
      const loser = winner == null ? null : (homeRow === winner ? awayRow : homeRow)
      if(winner == null || loser == null) {
        homeRow.points++
        homeRow.draws++
        homeRow.results.unshift('D')
        awayRow.points++
        awayRow.draws++
        awayRow.results.unshift('D')
      } else {
        winner.points += 2
        winner.wins++
        winner.results.unshift('W')
        loser.losses++
        loser.results.unshift('L')
      }
      homeRow.played++
      homeRow.scored += game.home_result
      homeRow.conceded += game.away_result
      awayRow.played++
      awayRow.scored += game.away_result
      awayRow.conceded += game.home_result

      homeRow.difference = homeRow.scored - homeRow.conceded
      awayRow.difference = awayRow.scored - awayRow.conceded
      return acc;
    }, emptyRanking);

    let rank = 0
    return Array.from(ranking.values()).sort((team1: RankModel, team2: RankModel) => {
      if(team1.points === team2.points) {
        if(team1.wins === team2.wins) {
          if (team1.difference === team2.difference) {
            if (team1.scored === team2.scored) {
              return team2.name.localeCompare(team1.name)
            }
            return team2.scored - team1.scored
          }
          return team2.difference - team1.difference
        }
        return team2.wins - team1.wins
      }
      return team2.points - team1.points;
    }).map((team) => {
      team.position = ++rank
      return team
    })
  }

  public getAllCompetitions(): TeamCompetition[] {
    return SHL_BASED_COMPETITIONS
  }


  private toIsoDate(dateString: string): string {

    if (dateString) {
      const months: MonthMapping = {
        'januari': '01',
        'februari': '02',
        'maart': '03',
        'april': '04',
        'mei': '05',
        'juni': '06',
        'juli': '07',
        'augustus': '08',
        'september': '09',
        'oktober': '10',
        'november': '11',
        'december': '12',
      }

      const [, date, monthName] = dateString.split(' ')
      const month = months[monthName.toLowerCase()]

      return `${month < '07' ? 2025 : 2024}-${month}-${date}`
    }
    return ''
  }
}

interface MonthMapping {
  [key: string]: string;
}