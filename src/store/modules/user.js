import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const username = ref('')
    const token = ref('')
    const roles = ref([])

    const setToken = (value) => {
        token.value = value
        // set cookie token
    }

    const setRoles = (value) => {
        roles.value = roles
    }

    const setUserName = (name) => {
        username.value = name
    }

    
    const resetToken = () => {
        token.value = ''
        roles.value = []
        // remove cookie token

    }

    return { token, roles, username, setToken, setRoles, setUserName, resetToken }
})