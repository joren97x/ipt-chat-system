<script setup>

    import { onMounted } from 'vue'
    import { ref } from 'vue'
    import { api } from 'src/boot/axios';

    const users = ref([])

    onMounted(async() => {
        const result = await api.get('/users')
        users.value = result.data.users
    })

</script>

<template>
    <q-container>
        <q-scroll-area style="height: 100vh; max-width: 300px;">
            <q-list title="Poeple" bordered >
                <q-item-label header>People</q-item-label>
                <q-item v-for="user in users" :key="user.id" clickable v-ripple>
                    <q-item-section avatar>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                    </q-item-section>
                    <q-item-section>{{ user.name }}</q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
    </q-container>
</template>