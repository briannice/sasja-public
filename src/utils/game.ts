import { TeamModel } from '@/types/models'

export const findTeamName = (name: string, vhvId: number, teams: TeamModel[]) => {
    if (!name.includes('Sasja')) return name
    let result = 'Eerste ploeg'
    teams.forEach((team) => {
        team.competitions.forEach((competition) => {
            if (competition.vhvId === vhvId) {
                result = team.name
            }
        })
    })
    return result
}

export const cleanGameNumber = (number: string) => {
    return number
        .replace('URBH-KBHB', '')
        .replace('VHVVHV-eindronde', '')
        .replace('VHV', '')
        .replace('AVB', '')
}
