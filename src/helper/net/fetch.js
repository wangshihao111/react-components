import axios from './config';

export function fetch({url = '', method = 'get', payload = {}, headers = {}}) {
  if (method === 'get') {
    return axios.get(url, {
        params: payload,
        headers: headers
      }
    )
  } else {
    return axios[method](url, payload, {
      headers
    });
  }
}
