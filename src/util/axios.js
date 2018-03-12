import axios from 'axios';

import store from 'store';

const client = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BLUEBIRD_API,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let instance = axios.create(defaultOptions);

  instance.interceptors.requeset.use((config) => {
    const token = store.getState().token;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default client;
