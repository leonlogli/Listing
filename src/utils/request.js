import axios from 'axios';
import env from '../../env';

export const request = ({ url, method, data, headers }) => {
  return axios({
    baseURL: env.API_BASE_URL,
    method: method || 'get',
    url,
    data,
    headers,
  }).then((res) => res.data);
};

export const addTokenToAxios = (token) => {
  axios.defaults.headers.Authorization = token;
};
