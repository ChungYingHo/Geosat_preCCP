<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useSignStore } from '#imports';
const store = useSignStore()
// page setting
definePageMeta({
    layout: 'sign-in-up'
})
const visible = ref(false)
const route = useRoute()

console.log(route.path)
</script>

<template>
    <div class="sign-container">
        <v-card
            class="pa-4 pb-2"
            elevation="8"
            rounded="lg"
        >
            <v-img
                src="~/assets/images/faked-logo.png"
                width="8rem"
                class="mx-auto">
            </v-img>

            <div class="text-subtitle-1 text-medium-emphasis">Login with...</div>
            <button class="sign-btn"><img src="~/assets/images/google.png"></button>
            <button class="sign-btn"><img src="~/assets/images/facebook.png"></button>
            <button class="sign-btn"><img src="~/assets/images/twitch.png"></button>

            <div class="text-subtitle-1 text-medium-emphasis">Account</div>
            <v-text-field
                density="compact"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                :rules="[store.rules.required]"
                v-model="store.loginEmail"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password

                <a
                    class="text-caption text-decoration-none text-blue"
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                Forgot login password?</a>
            </div>
            <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                :rules="[store.rules.required]"
                v-model="store.loginPassword"
            ></v-text-field>

            <v-btn
                block
                class="mb-1"
                color="blue"
                size="large"
                variant="tonal"
                @click="store.handleSubmit('/login')"
            >
                Log In
            </v-btn>

            <v-card-text class="d-flex justify-space-between">
                <RouterLink
                    to="/sign-up"
                    class="text-blue text-decoration-none"
                >
                Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                </RouterLink>
                <select
                    class="sign-lang-select"
                >
                    <option>Change Language</option>
                </select>
            </v-card-text>
        </v-card>
    </div>
</template>