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

const verifyUserIsLoggedIn = async () => {
    const user = await getData('user');
    return user !== null && user !== undefined;
}

const logout = (setUserIsLoggedIn) => {
    clearData();
    setUserIsLoggedIn(false);   
}

export {
    login,
    verifyUserIsLoggedIn,
    logout
}