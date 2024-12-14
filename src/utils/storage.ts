const storagePrefix = 'palony_staff_';

const storage = {
    getToken: () => {
        return JSON.parse(sessionStorage.getItem(`${storagePrefix}token`) as string);
    },
    setToken: (token: object) => {
        sessionStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
    },
    clearToken: () => {
        sessionStorage.removeItem(`${storagePrefix}token`);
    },
};

export default storage;