import { defineStore } from 'pinia'
import { useApiService } from '../composable/apiService'
import { useLocalStorageService } from '../composable/localStorageService'

const apiService = useApiService()
const localStorageService = useLocalStorageService()

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            userData: null
        }
    },
    getters: {
        isAuthenticated: (state) => state.userData != null,
    },
    actions: {
        setUser(user) {
            this.user = user
        },
        async login(email, password) {
            const data = await apiService.login(email, password)
            if (!data.error) {
                this.userData = data.user
                localStorageService.setItems(data.token, data.user);
            }
            return data
        },
        async register(lastName, firstName, email, password) {
            const data = await apiService.register(lastName, firstName, email, password)
            if (!data.error) {
                this.userData = data.user
                console.log(data);
            }
            return data
        },
        verifyConnectedUser() {
            if (!this.userData && localStorageService.getUser()) {
                this.userData = localStorageService.getUser()
            }
        },
        disconnect() {
            localStorageService.removeUser();
            this.userData = null
        }
    }
})