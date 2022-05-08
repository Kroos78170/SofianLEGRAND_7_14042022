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
            const dataDecoded = JSON.parse(data)
            if (!dataDecoded.error) {
                console.log(dataDecoded)
                this.userData = dataDecoded.user
                localStorageService.setItems(dataDecoded.token, dataDecoded.user);
            }
            return data
        },
        verifyConnectedUser() {
            if (!this.userData && localStorageService.getUser()) {
                this.userData = localStorageService.getUser()
            }
        }
    }
})