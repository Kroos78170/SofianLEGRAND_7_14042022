export function useApiService() {

    async function login(error, errorMessage) {
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        const data = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ email: email.value, password: password.value })
        }).then(res => res.json())
        console.log(data)
        return data
    }

    return {
        login
    }

}