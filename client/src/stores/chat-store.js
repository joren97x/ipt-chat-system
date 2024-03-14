import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import Router from '../router/index.js'
import { useAuthStore } from './auth-store.js'

const authStore = useAuthStore()
const router = Router()

export const useChatStore = defineStore('chat', {
    state: () => ({
        selectedChat: []
    }),
    getters: {
        getSelectedChat: (state) => state.selectedChat
    },
    actions: {
        selectChat(chat) {
            this.selectedChat = chat
        }
    },
});
