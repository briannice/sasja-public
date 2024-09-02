import axios from 'axios'

export const shlApi = axios.create({
  baseURL: 'https://api.superhandballeague.com/',
  timeout: 10000,
  headers: {
    accept: 'application/json'
  }
})
