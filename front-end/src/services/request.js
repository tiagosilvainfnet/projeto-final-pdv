import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

let headers = {
    'Content-Type': 'application/json'
}

const _get = async (endpoint, params) => {
    return await axios({
        method: 'get',
        url: `${REACT_APP_API_URL}/${endpoint}`,
        params,
        headers
    });
}

const _post = async (endpoint, data) => {
    return await axios({
        method: 'post',
        url: `${REACT_APP_API_URL}/${endpoint}`,
        data,
        headers
    });
}

const _patch = async (endpoint, id, data) => {
    return await axios({
        method: 'patch',
        url: `${REACT_APP_API_URL}/${endpoint}/${id}`,
        data,
        headers
    });
}

const _delete = async (endpoint, id) => {
    return await axios({
        method: 'delete',
        url: `${REACT_APP_API_URL}/${endpoint}/${id}`,
        headers
    });
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

export {
    _get,
    _post,
    _patch,
    _delete,
    fetcher
}