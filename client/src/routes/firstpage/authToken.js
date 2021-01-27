import {useCookies} from 'react-cookie';

const TOKEN_NAME = 'authToken';


export const useAuthToken = () => {

    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);

    const setAuthToken = (AuthToken) => setCookie(TOKEN_NAME, AuthToken);

    const removeAuthToken = () => removeCookie(TOKEN_NAME);

    return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};


