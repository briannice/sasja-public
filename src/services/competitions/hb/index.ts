import axios from 'axios'

const apiToken = process.env.NEXT_PUBLIC_HANDBALL_BELGIUM_API_TOKEN

if (!apiToken) {
  throw new Error('No HB API token')
}

export const HandballBelgiumApi = axios.create({
  baseURL: 'https://admin.handballbelgium.be/lms_league_ws/public/api/v3/',
  timeout: 10000,
  headers: { authorization: apiToken },
})
