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
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.json())
        return data
    }

    async function getOnePost(id) {
        const token = localStorageService.getToken();
        const data = await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.json())
        return data
    }

    async function getComments(id) {
        const token = localStorageService.getToken();
        const data = await fetch(`http://localhost:3000/api/posts/${id}/comments`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.json())
        return data
    }

    async function createPost(title, content, image) {
        const token = localStorageService.getToken();
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        // myHeaders.append("Content-Type", "Content-Type: multipart/form-data");
        // myHeaders.append("Content-Type", "Content-Type: application/json");
        const body = new FormData()
        body.append('title', title.value)
        body.append('content', content.value)
        body.append('image', image.value)
        const data = await fetch(`http://localhost:3000/api/posts`, {
            method: "POST",
            headers: myHeaders,
            body: body
        }).then(res => res.json())
        return data
    }




    return {
        login,
        register,
        getPosts,
        getOnePost,
        getComments,
        createPost
    }
}