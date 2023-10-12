import Cookies from 'js-cookie';
import CacheKey from '@/constants/cache-key';

export const getToken = () => {
    return Cookies.get(CacheKey.TOKEN);
};

export const setToken = (token) => {
    Cookies.set(CacheKey.TOKEN, token);
};

export const removeToken = () => {
    Cookies.remove(CacheKey.TOKEN);
};
