import { useLocalStorageService } from "./localStorageService";

const localStorageService = useLocalStorageService()

export function useApiService() {

    async function login(email, password) {
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        const data = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ email: email.value, password: password.value })
        }).then(res => res.json())
        return data
    }
    async function register(lastName, firstName, email, password) {
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        const data = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ lastName: lastName.value, firstName: firstName.value, email: email.value, password: password.value })
        }).then(res => res.json())
        return data
    }

    async function getPosts() {
        const token = localStorageService.getToken();
        const data = await fetch("http://localhost:3000/api/posts", {
            method: "GET",
            headers: { Authentication: `Bearer ${token}` }
        }).then(res => res.json())
        console.log(data)

    }

    return {
        login,
        register,
        getPosts
    }
}