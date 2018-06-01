import axios from 'axios';
import _ from 'lodash';

import store from 'store';

const fs = window.require('electron').remote.require('fs');

const configFile = process.env.REACT_APP_CONFIG_PATH; // /var/Hot/config.json
console.log('configFile: ', configFile);
const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
const bbapi = config.BluebirdAPI;

const authClient = () => {
  const defaultOptions = {
    baseURL: bbapi,
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
  baseURL: bbapi
});

client.defaults.headers.common['Content-Type'] = 'application/json';

export {
  authClient,
  client
}
