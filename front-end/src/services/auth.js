import { _post } from '../services/request';

const userIsLoggedIn = (navigate, route) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if(!user){
        navigate('/login')
    }else{
        if(route === '/login'){
            navigate('/')
        }
    }
}

const getUser = () => {
    return JSON.parse(window.localStorage.getItem('user'));
}

const login = async (email, password) => {
    const response = await _post('login', {
        email, password
    });

    return response;
}

const logout = () => {
    window.localStorage.clear();
}

export {
    login, userIsLoggedIn, logout, getUser
}