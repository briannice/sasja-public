import axios from 'axios'

export const BENELeagueApi = axios.create({
  baseURL: 'https://www.bnlhandball.com/',
  timeout: 10000,
})
