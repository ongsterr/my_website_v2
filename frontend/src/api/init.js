import axios from 'axios';

const config = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.SERVER_URL
      : 'http://localhost:3001/api',
};
const instance = axios.create(config);

export default instance;
