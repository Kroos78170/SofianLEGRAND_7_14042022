const tokenKey = 'token'
const userKey = 'user'

export function useLocalStorageService() {

    function setItems(token, user) {
        localStorage.setItem(tokenKey, token);
        localStorage.setItem(userKey, JSON.stringify(user));
    }

    function getUser() {
        const user = localStorage.getItem(userKey)
        const decodedUser = JSON.parse(user);
        return decodedUser

    }

    return {
        setItems,
        getUser
    }

}