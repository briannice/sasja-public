import axios from 'axios'

const BASE_URL = 'https://admin.handballbelgium.be/lms_league_ws/public/api/v3/'
const LOGIN_URL =  `${BASE_URL}ng/login`;

const apiToken = process.env.NEXT_PUBLIC_HANDBALL_BELGIUM_API_TOKEN
const username = process.env.NEXT_PUBLIC_HANDBALL_BELGIUM_USERNAME
const password = process.env.NEXT_PUBLIC_HANDBALL_BELGIUM_PASSWORD


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
let mustLogin = true

export const login = async () => {
  if (loginPromise) return loginPromise

  loginPromise = (async () => {
    if (mustLogin) {
      try {
        const response = await axios.post(LOGIN_URL,
          JSON.stringify({ login: username, password: password }), // Assign 'username' to 'login'
          {
            headers: { 'Content-Type': 'application/json' }, // Ensure JSON format
          }
        );

        secretToken = `Bearer ${response.data?.token.token}`;
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.error('Invalid credentials -- fallback to public information.');
        } else {
          console.error(error)
        }
      }
      mustLogin = false
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
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = secretToken;
    return config;
  },
  (error) => Promise.reject(error)
);