
const URL = 'http://10.107.144.32:3000/';

export const doRequest = async (resource, method, body = '', urlParams = '') => {

    const params = {
        method: method,
        headers: {
            'Content-type': 'application/json'
        }
    }

    if(!['GET', 'DELETE'].includes(method)){
        params.body = JSON.stringify(body);
    }
        
        
    return await fetch(`${URL + resource + urlParams}`, params);

}