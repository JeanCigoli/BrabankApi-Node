import { doRequest } from './doRequest';
import { AsyncStorage } from 'react-native';

const TOKEN_KEY = '@brabank:token';

const setToken = (usuario) => {

    AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(usuario));

}

export const cadastrar = async (usuario) => {

    const result = await doRequest('registrar/', 'POST', usuario);

    if(result.ok){

        const { payload } = await result.json();

        console.log(payload);

        setToken(payload);
    }

    return result;
}

export const signIn = async (usuario) => {

    const result = await doRequest('autenticar/', 'POST', usuario);

    if(result.ok){

        const payload = await result.json()

        setToken(payload);
    }

    return result;
}

export const isSignerIn = async () => {

    const session = await AsyncStorage.getItem(TOKEN_KEY);

    return JSON.parse(session);
}

export const signOut = () => {
    AsyncStorage.removeItem(TOKEN_KEY);
}