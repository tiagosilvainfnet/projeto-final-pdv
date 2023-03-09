import { dropTables } from './persist';
import { post } from './request';
import { clearData, getData } from './storage';

const login = async (email, password) => {
    const response = await post('login', { email, password });
    const { data, status } = response;
    return {
        data,
        status
    };
}

const getUser = async () => {
    return await getData('user', true);
}

const verifyUserIsLoggedIn = async () => {
    const user = await getData('user', true);
    return user !== null && user !== undefined;
}

const logout = () => {
    clearData();
    dropTables();
}

export {
    login,
    verifyUserIsLoggedIn,
    logout
}