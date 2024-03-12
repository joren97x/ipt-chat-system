<script setup>

    import { ref } from 'vue'

    const newGroupDialog = ref(false)

</script>

<template>
    <q-container>
        <q-scroll-area style="height: 100vh; max-width: 300px;">
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
                <q-item v-for="n in 7" :key="n" clickable v-ripple>
                    <q-item-section top avatar>
                        <q-avatar color="primary" text-color="white" icon="face" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Single line item</q-item-label>
                        <q-item-label caption lines="2">Secondary line text.</q-item-label>
                    </q-item-section>
                    <q-item-section side top>
                        <q-item-label caption>5 min ago</q-item-label>
                        <q-icon name="circle" color="yellow" />
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
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