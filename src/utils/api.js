import { getAccessToken } from './index';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const fetchWithToken = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

const api = {
  async register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.user;
  },

  async login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.token;
  },

  async getOwnProfile() {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.user;
  },

  async getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.users;
  },

  async getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.threads;
  },

  async getThreadDetail(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.detailThread;
  },

  async createThread({ title, body, category }) {
    const response = await fetchWithToken(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, category }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.thread;
  },

  async createComment({ threadId, content }) {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.comment;
  },

  async voteThread({ threadId, voteType }) {
    const endpoint = voteType === 1 ? 'up-vote' : voteType === -1 ? 'down-vote' : 'neutral-vote';
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/${endpoint}`, { method: 'POST' });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.vote;
  },

  async voteComment({ threadId, commentId, voteType }) {
    const endpoint = voteType === 1 ? 'up-vote' : voteType === -1 ? 'down-vote' : 'neutral-vote';
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/comments/${commentId}/${endpoint}`, { method: 'POST' });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.vote;
  },

  async getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.leaderboards;
  }
};

export default api;
