const BASE_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5173"}/api`;

export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
  },
  SESSION: {
    CREATE: `${BASE_URL}/sessions/create`,
    GET_ALL: `${BASE_URL}/sessions/my-sessions`,
    GET_ONE: (id) => `${BASE_URL}/sessions/${id}`,
    DELETE: (id) => `${BASE_URL}/sessions/${id}`,
  },
  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/ai/generate-questions`,
    EXPLAIN: `${BASE_URL}/ai/generate-explanation`,
  },
  QUESTIONS: {
    PIN: (id) => `${BASE_URL}/questions/${id}/pin`,
    NOTE: (id) => `${BASE_URL}/questions/${id}/note`,
    SEARCH: `${BASE_URL}/questions/search`,
  },
  USER: {                                                   
    GET_PROFILE: `${BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${BASE_URL}/user/profile`,
    CHANGE_PASSWORD: `${BASE_URL}/user/change-password`,
    GET_STATS: `${BASE_URL}/user/stats`,
  },
};