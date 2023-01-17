import axios from 'axios';

const BASE_URL_API='http://192.168.68.102:3001/api/v1';
const headers = {
    'Content-Type': 'application/json'
}

const get = async (endpoint, params= null) => {
    return await axios({
        method: "get",
        url: `${BASE_URL_API}/${endpoint}`,
        headers,
        params,
      });
}

const post = async (endpoint, data= null) => {
    return await axios({
        method: "post",
        url: `${BASE_URL_API}/${endpoint}`,
        headers,
        data,
      });
}

export {
    get, post
}