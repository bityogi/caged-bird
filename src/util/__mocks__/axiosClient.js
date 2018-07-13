import axios from 'axios';

const client = axios;

const authClient = () => {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  
    let instance = axios.create(defaultOptions);
  
   
  
    return instance;
  };

export { client, authClient };
