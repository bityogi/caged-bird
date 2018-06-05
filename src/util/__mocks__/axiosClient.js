import axios from 'axios';

const client = axios;

const authClient = () => {
    const defaultOptions = {
      baseURL: 'https://bluebirdapi.com',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  
    let instance = axios.create(defaultOptions);
  
    // instance.interceptors.request.use((config) => {
    //   const users = store.getState().users;
    //   console.log('users in state for axios authClient: ', users);
    //   if (!_.isEmpty(users.data) && users.data.token) {
    //     const { token } = users.data;
    //     console.log('Found a valid token. Using it for axios calls');
    //     console.log('token used for axios: ', token);
    //     config.headers.Authorization = token ? `Bearer ${token}` : '';
    //   }
    //   return config;
  
    // });
  
    return instance;
  };

export { client, authClient };
