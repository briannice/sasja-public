import axios from 'axios'

const BASE_URL = 'https://admin.handballbelgium.be/lms_league_ws/public/api/v3/'
const LOGIN_URL =  `${BASE_URL}ng/login`;

const apiToken = process.env.HANDBALL_BELGIUM_API_TOKEN
const username = process.env.HANDBALL_BELGIUM_USERNAME
const password = process.env.HANDBALL_BELGIUM_PASSWORD


if (!apiToken) {
  throw new Error('No HB API token')
}

export const HandballBelgiumApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { authorization: apiToken },
})

let loginPromise: Promise<void>|null = null;
let secretToken = apiToken
let loggedIn = false

export const login = async () => {
  if (loggedIn) return
  if (loginPromise) return loginPromise

  loginPromise = (async () => {
    try {
      const response = await axios.post(LOGIN_URL,
        { login: username, password: password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      secretToken = `Bearer ${response.data?.token.token}`;
      loggedIn = true
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.error('Invalid credentials -- fallback to public information.');
      } else {
        console.error('HB login failed:', error.message || error)
      }
      // Reset so next request can retry
      loginPromise = null
    }
  })()
  return loginPromise
};

export const SecureHandballBelgiumAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

SecureHandballBelgiumAPI.interceptors.request.use(
  async (config) => {
    await login()
    config.headers.set('Authorization', secretToken);
    return config;
  },
  (error) => Promise.reject(error)
);
