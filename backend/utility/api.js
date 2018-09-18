const axios = require('axios');

const config = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.SERVER_URL
      : 'http://localhost:3001/api',
};
const request = axios.create(config);

const requests = {
  get: async (url, token) => {
    const response = await request({
      method: 'get',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
    });
    return response;
  },
  post: async (url, body, token) => {
    const response = await request({
      method: 'post',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
      data: body,
    });
    return response;
  },
  put: async (url, body, token) => {
    const response = await request({
      method: 'put',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
      data: body,
    });
    return response;
  },
  delete: async (url, token) => {
    const response = await request({
      method: 'delete',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
    });
    return response;
  },
};

module.exports = requests;
