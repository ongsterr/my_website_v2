import axios from './init';

let token = null;
const setToken = _token => (token = _token);

const requests = {
  get: async url => {
    const response = await axios({
      method: 'get',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
    });
    return response.data;
  },
  post: async (url, body) => {
    const response = await axios({
      method: 'post',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
      data: body,
    });
    return response.data;
  },
  put: async (url, body) => {
    const response = await axios({
      method: 'put',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
      data: body,
    });
    return response.data;
  },
  delete: async url => {
    const response = await axios({
      method: 'delete',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
    });
    return response.data;
  },
};

const limit = (count, p) => `limit=${count}&offset=${p ? p : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined });

const Articles = {
  all: page => requests.get(`/articles?${limit(10, page)}`),
  get: slug => requests.get(`/articles/${slug}`),
  del: slug => requests.delete(`/articles/${slug}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encodeURIComponent(tag)}&${limit(10, page)}`),
  create: article => requests.post(`/articles`, { article }),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
};

const Tags = {
  getAll: () => requests.get('/tags'),
};

const Profile = {
  get: username => requests.get(`/profile/${username}`),
};

const Auth = {
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  current: () => requests.get('/users'),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user => requests.put('/users/update', { user }),
};

export default {
  Articles,
  Tags,
  Auth,
  Profile,
  setToken,
};
