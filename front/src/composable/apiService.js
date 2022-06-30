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

    async function seeMyProfile() {
        const token = localStorageService.getToken();
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` })
        const data = await fetch("http://localhost:3000/api/auth", {
            method: "GET",
            headers: myHeaders,
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

    async function getComment(commentId) {
        const token = localStorageService.getToken();
        const data = await fetch(`http://localhost:3000/api/posts/comments/${commentId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.json())
        return data
    }

    async function createPost(title, content, image) {
        const token = localStorageService.getToken();
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
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
    async function updatePost(title, content, image, id) {
        const token = localStorageService.getToken();
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const body = new FormData()
        body.append('title', title.value)
        body.append('content', content.value)
        body.append('image', image.value)
        const data = await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: "PUT",
            headers: myHeaders,
            body: body
        }).then(res => res.json())
        return data
    }
    async function deletePost(id) {
        const token = localStorageService.getToken();
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const data = await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        }).then(res => res.json())
        return data
    }
    async function createComment(content, postId) {
        const token = localStorageService.getToken();
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        myHeaders.append("Content-Type", "application/json");
        const body = new FormData()
        body.append('content', content.value)
        const data = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ content: content.value })
        }).then(res => res.json())
        return data
    }
    async function updateComment(content, commentId) {
        const token = localStorageService.getToken();
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        myHeaders.append("Content-Type", "application/json");
        const body = new FormData()
        body.append('content', content.value)
        const data = await fetch(`http://localhost:3000/api/posts/comments/${commentId}`, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify({ content: content.value })
        }).then(res => res.json())
        return data
    }
    async function deleteComment(commentId) {
        const token = localStorageService.getToken();
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const data = await fetch(`http://localhost:3000/api/posts/comments/${commentId}`, {
            method: "DELETE",
            headers: myHeaders,
        }).then(res => res.json())
        return data
    }





    return {
        login,
        register,
        seeMyProfile,
        getPosts,
        getOnePost,
        getComments,
        getComment,
        createPost,
        updatePost,
        deletePost,
        createComment,
        updateComment,
        deleteComment
    }
}