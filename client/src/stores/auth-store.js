import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import Router from '../router/index.js'


const router = Router()
export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: JSON.parse(localStorage.getItem('auth')),
    token: JSON.parse(localStorage.getItem('token')),
    error: null
  }),
  getters: {
    getToken: (state) => state.token
  },
  actions: {
    login(form) {
        api.post('/login', form).then((result) => {
            if(result.status == 200) {
                console.log(result)
                this.auth = result.data.user
                this.token = result.data.token
                localStorage.setItem('auth', JSON.stringify(result.data.user))
                localStorage.setItem('token', JSON.stringify(result.data.token))
                router.push('/about')
            }  
        })
        .catch((err) => {
            this.error = err.response.data.message
        })
    },
  },
});
