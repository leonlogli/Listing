import axios from 'axios';
import env from '../../env';

export const request = ({ url, method, data, headers }) => {
  return axios({
    method: method || 'get',
    url: `${env.API_BASE_URL}${url}`,
    data,
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      ...headers,
    },
  });
};

export const addTokenToAxios = (token) => {
  axios.defaults.headers.Authorization = token;
};
