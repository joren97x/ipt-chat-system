<script setup>

    import { api } from 'src/boot/axios'
    import { reactive, ref } from 'vue'
    import { useAuthStore } from '../stores/auth-store.js'
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const authStore = useAuthStore()
    const form = reactive({
        username: null,
        name: null,
        password: null
    })
    const error = ref(null)

    function onSubmit() {
        api.post('/register', form).then((result) => {
            console.log(result)
            if(result.status == 201) {
                authStore.setToken(result.data.token)
                authStore.setAuth(result.data.user)
                localStorage.setItem('auth', JSON.stringify(result.data.user))
                localStorage.setItem('token', JSON.stringify(result.data.token))
                router.push('/')
            }  
        })
        .catch((err) => {
            console.log(err)
            error.value = err.response.data.message
        })
    }

</script>

<template>
    <q-container>
        <div class="row">
            <div class="col-6">
                <q-card class="flex flex-center q-pa-md">
                    <img
                        alt="Quasar logo"
                        src="~assets/quasar-logo-vertical.svg"
                        style="width: 200px; height: 200px"
                    >
                </q-card>
            </div>
            <div class="col-6">
                <q-form @submit="onSubmit" class="q-gutter-md">
                    <q-card title="Login">
                        <q-card-section>
                            <div class="text-h6 q-mb-md">Register</div>
                            <q-input
                                filled
                                v-model="form.username"
                                label="Username"
                                lazy-rules
                                :error-message="error"
                                :error="error ? true : false"
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                            <q-input
                                filled
                                v-model="form.name"
                                label="Name"
                                lazy-rules
                                :error-message="error"
                                :error="error ? true : false"
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                            <q-input
                                filled
                                v-model="form.password"
                                label="Password"
                                lazy-rules
                                :rules="[
                                val => val !== null && val !== '' || 'Please type your password',
                                val => val.length > 5 || 'Please type a stonger password'
                                ]"
                            />
                        </q-card-section>
                        <q-card-section>
                            <q-btn label="Register" type="submit" color="primary" flat class="q-ml-sm" />
                        </q-card-section>
                        <q-card-actions>
                            <q-btn label="Login" to="/login" color="primary" flat class="q-ml-sm" />
                        </q-card-actions>
                    </q-card>
                </q-form>
            </div>
        </div>
    </q-container>
</template>