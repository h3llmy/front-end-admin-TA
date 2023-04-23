import { fetchApi } from "./fetch";

export const setCookie = (name, token) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
        const cookie = `${name}=${token};expires=${expires.toUTCString()};path=/`;
        document.cookie = cookie;
    }
export const getLoginCookie = async (name) => {
    try {
        const myCookie = document.cookie.split('; ').find(cookie => cookie.startsWith(`${name}=`));
        if (!myCookie) {
            return null
        }
        const [newToken] = await Promise.all([fetchApi.post('/auth/refresh/token', {refreshToken: myCookie.split('=')[1]})])
        setCookie(name, newToken.data.data.refreshToken)
        return newToken.data.data.accessToken
    } catch (error) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1 00:00:00 UTC;path=/;`;
        console.error(error);
        return null;
    }
}

export const deleteCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1 00:00:00 UTC;path=/;`;
}