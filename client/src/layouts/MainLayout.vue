<script setup>

    import { ref } from 'vue'
    import EssentialLink from 'src/components/EssentialLink.vue'
    import { useAuthStore } from 'src/stores/auth-store'

    const authStore = useAuthStore()
    const leftDrawerOpen = ref(false)
    const linksList = 
    [
        {
            title: '1:1 Chat',
            icon: 'chat',
            link: '/chat'
        },
        {
            title: 'Group chat',
            icon: 'forum',
            link: '/group-chat'
        },
        {
            title: 'Settings',
            icon: 'settings',
            link: '/settings'
        },
        {
            title: 'About',
            icon: 'info',
            link: '/about'
        },
        
    ]

    const logoutLink = {
        title: 'Logout',
        icon: 'logout',
        link: '/login'
    }

    function logout() {
        authStore.logout()
    }

</script>


<template>
    <q-layout view="hHh lpR lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" flat></q-btn>
                <q-toolbar-title> Random App </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <q-list>
                <q-card square flat>
                    <q-img src="https://cdn.quasar.dev/img/mountains.jpg" height="130px">
                        <div class="absolute-bottom text-h6">
                            {{authStore.auth?.name}}
                        </div>
                    </q-img>
                </q-card>
                <q-item-label header>
                    Essential Links
                </q-item-label>
                <q-separator></q-separator>
                <EssentialLink v-for="link in linksList" :key="link.title" :link="link"/>
                <EssentialLink @click="logout()" :link="logoutLink" />
            </q-list>
           
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>


<style scoped>

    a{
        text-decoration: none;
        color: black;
    }

</style>