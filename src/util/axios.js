import axios from 'axios';
import _ from 'lodash';

import store from 'store';

const authClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BLUEBIRD_API,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use((config) => {
    const users = store.getState().users;
    console.log('users in state for axios authClient: ', users);
    if (!_.isEmpty(users.data) && users.data.token) {
      const { token } = users.data;
      console.log('Found a valid token. Using it for axios calls');
      console.log('token used for axios: ', token);
      config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;

  });

  return instance;
};


let client = axios.create({
  baseURL: process.env.REACT_APP_BLUEBIRD_API
});

client.defaults.headers.common['Content-Type'] = 'application/json';

export {
  authClient,
  client
}
