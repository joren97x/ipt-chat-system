<script setup>

    import { ref, onMounted } from 'vue'
    import { api } from 'src/boot/axios'
    import { formatDistance, formatDistanceToNow } from 'date-fns'
    import { useAuthStore } from 'src/stores/auth-store.js'
    import { useChatStore } from 'src/stores/chat-store.js'

    const newGroupDialog = ref(false)
    const selectedChat = ref(null)
    const chats = ref([])
    const chatStore = useChatStore()
    const authStore = useAuthStore()

    onMounted(() => {
        api.get(`/messages/${authStore.auth.id}`, {
            headers: {
                'Authorization': `Bearer ${authStore.getToken}`
            }
        }).then((result) => {
            chats.value = result.data.groupedMessages
            console.log(result)
        }).catch((err) => {
            console.log(err)
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
                            {{ authStore.getToken }}
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
                        <q-separator/>
                        <q-item>
                            <q-item-section>
                                <q-item-label lines="1">Group chats</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator/>
                        <q-item v-for="chat in chats" :key="chat.id" clickable v-ripple @click="chatStore.selectChat(chat)">
                            <q-item-section top avatar>
                                <q-avatar color="primary" text-color="white" icon="face" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ chat[chat.length-1].sender.name }}</q-item-label>
                                <q-item-label caption lines="2">{{ chat[chat.length-1].content }}</q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                                <q-item-label caption>{{ formatDistance(chat[chat.length-1].createdAt, new Date()) }} ago</q-item-label>
                                <q-icon name="circle" color="yellow" />
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-scroll-area>
            </div>
            <div class="col-9">
                <q-card class="q-ma-md">
                    <q-toolbar class="bg-green-2 glossy">
                        <q-avatar color="primary" text-color="white">GC</q-avatar>
                        <q-toolbar-title>
                            Group chat
                            <span class="text-caption text-negative">Most of the buttons doesnt work</span>
                        </q-toolbar-title>
                        <q-btn icon="call" flat round>
                            <q-tooltip>
                                Start a voice call
                            </q-tooltip>
                        </q-btn>
                        <q-btn icon="video_call" flat round>
                            <q-tooltip>
                                Start a video call
                            </q-tooltip>
                        </q-btn>
                        <q-btn icon="more_horiz" flat round>
                            <q-tooltip>
                                Conversation information
                            </q-tooltip>
                        </q-btn>
                    </q-toolbar>

                    <q-scroll-area style="height: 70vh; max-width: 100vw;" class="q-px-lg q-py-sm">
                        <q-chat-message 
                            v-for="message in chatStore.selectedChat" 
                            :key="message.id"
                            :bg-color="message.sender_id === 1 ? 'primary' : 'secondary'"
                            :stamp="formatDistanceToNow(message.createdAt)"
                            :name="message.sender_id === 1 ? 'Me' : 'Not me'"
                            :text="[message.content]"
                            :sent="message.sender_id === 1 ? true : false"
                        >
                        </q-chat-message>
                    </q-scroll-area>

                    <q-card-actions align="left">
                        <q-input filled class="" style="width: 100%;" dense autogrow label="Aa">
                            <template v-slot:before>
                                <q-btn size="md" round icon="add_circle" flat color="blue">
                                    <q-tooltip anchor="top middle" self="center middle">
                                        Open more actions
                                    </q-tooltip>
                                </q-btn>
                                <q-btn size="md" round icon="image" flat color="blue">
                                    <q-tooltip anchor="top middle" self="center middle">
                                        Attach a file
                                    </q-tooltip>
                                </q-btn>
                                <q-btn size="md" round icon="gif_box" flat color="blue">
                                    <q-tooltip anchor="top middle" self="center middle">
                                        Choose a gif
                                    </q-tooltip>
                                </q-btn>
                            </template>
                            <template v-slot:after>
                                <q-btn icon="send" round size="md" flat color="blue">
                                    <q-tooltip anchor="top middle" self="center middle">
                                        Press enter to send a message
                                    </q-tooltip>
                                </q-btn>
                            </template>
                            <template v-slot:append>
                                <q-btn icon="mood" round size="md" flat color="blue">
                                    <q-tooltip anchor="top middle" self="center middle">
                                        Choose an emoji
                                    </q-tooltip>
                                </q-btn>
                            </template>
                        </q-input>
                    </q-card-actions>
                </q-card>
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