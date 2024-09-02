import axios from 'axios'

export const shlApi = axios.create({
  baseURL: 'https://api.superhandballeague.com/',
  timeout: 10000,
  headers: {
    accept: 'application/json'
  }
})

export function lookupTeam(teamName: string) {
  if (teamName.toLowerCase().includes("aalsmeer")) return "Green Park/Handbal Aalsmeer HS1"
  if (teamName.toLowerCase().includes("bevo")) return "Herpertz/Bevo HC HS1"
  if (teamName.toLowerCase().includes("bocholt")) return "Sezoens Achilles Bocholt HS1"
  if (teamName.toLowerCase().includes("eupen")) return "KTSV Eupen (B) HS1"
  if (teamName.toLowerCase().includes("houten")) return "LvanRaak Milieu/Handbal Houten HS1"
  if (teamName.toLowerCase().includes("hurry-up")) return "JD Techniek/ Hurry-up HS1"
  if (teamName.toLowerCase().includes("pelt")) return "Sporting Pelt HS1"
  if (teamName.toLowerCase().includes("sasja")) return "Biobest/ Sasja HC HS1"
  if (teamName.toLowerCase().includes("lions")) return "KEMBIT-LIONS/Sittardia HS1"
  if (teamName.toLowerCase().includes("hubo")) return "HUBO Handbal HS1"
  if (teamName.toLowerCase().includes("visé")) return "HC Visé BM HS1"
  if (teamName.toLowerCase().includes("volendam")) return "KRAS/Volendam HS1"
  return teamName
}
