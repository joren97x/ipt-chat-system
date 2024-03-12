<script setup>

    import { ref } from 'vue'
    import EssentialLink from 'src/components/EssentialLink.vue'
    const linksList = 
    [
        {
            title: 'Chat',
            icon: 'chat',
            link: '/chat'
        },
        {
            title: 'People',
            icon: 'group',
            link: '/people'
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


</script>


<template>
    <q-layout view="hHh lpR lFf">
        <q-drawer show-if-above bordered mini>
            <q-list>
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