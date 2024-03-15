import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'



export const useAuthStore = defineStore('auth', {
    state: () => ({
        auth: JSON.parse(localStorage.getItem('auth')),
        token: JSON.parse(localStorage.getItem('token')),
        error: null
    }),
    getters: {
        getToken: (state) => {
            return state.token
        },
        isAuthenticated: (state) => {
            return state.auth
        }
    },
    actions: {
        setToken(token) {
            this.token = token
        },
        setAuth(auth) {
            this.auth = auth
        },
        async register(credentials) {
            try {
                await api.post('/register', credentials)
                .then((response) => {
                    this.auth = response.data.user
                    localStorage.setItem('auth', JSON.stringify(response.data.user))
                    localStorage.setItem('token', JSON.stringify(response.data.token))
                })
            }
            catch(error) {
                console.log(error)
                // if(error.response) {
                //     this.registerError.email = error.response.data.errors?.email[0]
                //     // this.registerError.name = error.response.data?.errors?.name[0]
                // }
                // else if(error.request) {
                //     this.registerError.server = 'Server is not responding. Please try again later.'
                // }
                // else {
                //     this.registerError.server = 'An unexpected error occurred. Please try again later.'
                // }
            }
        },
        logout() {
            localStorage.removeItem('auth')
            localStorage.removeItem('token')
            this.auth = JSON.parse(localStorage.getItem('auth'))
            this.token = JSON.parse(localStorage.getItem('token'))
        }
    },
});
