import {$authHost, $host} from "./index.js";


export const registration = async (username, password) => {
    return await $host.post('/register', {username, password});
}

export const login = async (username, password) => {
    return await $host.post('/login', {username, password});
}

export const getUser = async () => {
    return await $authHost.get('/me')
}

export const postTemplate = async (templates) => {
    return await $authHost.post('/templates', {templates})
}