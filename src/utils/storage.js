import { warn } from './logger';
let memoryStorage = {};

export const setSessionStorage = (key, value) => {
    try {
        memoryStorage[key] = value;
        sessionStorage.setItem(key, value);
    } catch (e) {
        warn(`Error on setting sessionStorage by ${key} key!`);
    }
};

export const getSessionStorage = (key) => {
    try {
        return sessionStorage.getItem(key);
    } catch (e) {
        warn(`Error on getting sessionStorage by name ${key} (${e})`);
        return memoryStorage[key] || null;
    }

};

export const removeSessionStorage = (name) => {
    try {
        delete memoryStorage[name];
        sessionStorage.removeItem(name);
    } catch (error) {
        warn(`Error on removing sessionStorage by ${name} key!`);
    }
};

export const clearSessionStorage = () => {
    try {
        memoryStorage = {};
        sessionStorage.clear();
    } catch (e) {
        warn(`Error on clearing sessionStorage!`);
    }
};
