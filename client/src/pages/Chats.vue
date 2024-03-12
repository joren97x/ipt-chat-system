<script setup>

    import { ref, onMounted } from 'vue'
    import { api } from 'src/boot/axios'
    import { formatDistance } from 'date-fns'

    const newGroupDialog = ref(false)
    const groupChats = ref([])
    const individualChats = ref([])
    const selectedChat = ref(null)

    onMounted(() => {
        api.get('/messages/1', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImpvcmVuIiwibmFtZSI6ImpvcmVuIiwicGFzc3dvcmQiOiIkMmIkMTAkSC5OVHJNTGRCLk40VkVZTTJHczBuT1dYd0hKajJqVWFQZGZxbzN2blJDWHRVUVJtNkpUWnEiLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTEwVDExOjQxOjIzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAzLTEwVDExOjQxOjIzLjAwMFoifSwiaWF0IjoxNzEwMDczODE1fQ.NjtWsqStKIAftZCXMoGRna787kjQpY5krj-LcZFq3qk',
                'Accept': 'application/json'
            }
        }).then((result) => {
            groupChats.value = result.data.groupedMessages.group
            individualChats.value = result.data.groupedMessages.individual
            console.log(result)
        })
        .catch((err) => {
            console.error(err)
        })
    })

</script>

<template>
    <q-container>
        <div class="row">
            <div class="col-3">
                <q-scroll-area style="height: 100vh; max-width: 100%;">
                    <q-list title="People">
                        <q-item>
                            <q-item-section>
                                <q-item-label lines="1">Chats</q-item-label>
                            </q-item-section>

                            <q-item-section side>
                                <q-btn flat round @click="newGroupDialog = true" size="md" icon="edit_square">
                                    <q-tooltip>
                                        New group chat
                                    </q-tooltip>
                                </q-btn>
                            </q-item-section>
                        </q-item>
                        <q-item v-for="chat in groupChats" :key="chat.id" clickable v-ripple @click="selectedChat = chat">
                            <q-item-section top avatar>
                                <q-avatar color="primary" text-color="white" icon="face" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ chat[0].conversation.name }}</q-item-label>
                                <q-item-label caption lines="2">{{ chat[0].content }}</q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                                <q-item-label caption>{{ formatDistance(chat[0].createdAt, new Date()) }} ago</q-item-label>
                                <q-icon name="circle" color="yellow" />
                            </q-item-section>
                        </q-item>
                        <q-separator/>
                        <q-item v-for="chat in individualChats" :key="chat.id" clickable v-ripple @click="selectedChat = chat">
                            <q-item-section top avatar>
                                <q-avatar color="primary" text-color="white" icon="face" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ chat[0].conversation_id }}</q-item-label>
                                <q-item-label caption lines="2">{{ chat[0].content }}</q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                                <q-item-label caption>5 min ago</q-item-label>
                                <q-icon name="circle" color="yellow" />
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-scroll-area>
            </div>
            <div class="col-9">
                <p class="text-center">selected chat</p>
                <p class="text-center text-h5">{{ selectedChat }}</p>
            </div>
        </div>
        <q-dialog v-model="newGroupDialog">
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">Group chat name</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input dense autofocus @keyup.enter="prompt = false" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Add" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-container>
</template>