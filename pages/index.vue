<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useSignStore } from '#imports';
import { useLocale } from '~/composables/useLocale'

definePageMeta({
    layout: 'sign-in-up'
})
const store = useSignStore()
const visible = ref(false)
const { localePath, switchLocalePath } = useLocale()
</script>

<template>
    <div class="sign-container">
        <v-card
            class="pa-8 pb-2 d-flex flex-column justify-space-between"
            elevation="8"
            rounded="lg"
            height="80%"
        >
            <v-img
                src="~/assets/images/faked-logo.png"
                width="10rem"
                class="mx-auto">
            </v-img>

            <div class="mb-3">
                <div class="text-h6 text-medium-emphasis mb-2">{{$t('sign.msg.loginTitle')}}</div>
                <v-btn icon>
                    <img src="~/assets/images/google.png" alt="Google">
                </v-btn>
                <v-btn icon>
                    <img src="~/assets/images/facebook.png" alt="Facebook">
                </v-btn>
                <v-btn icon>
                    <img src="~/assets/images/twitch.png" alt="Twitch">
                </v-btn>
            </div>

            <div>
                <div class="text-h6 text-medium-emphasis mb-1">{{$t('sign.account')}}</div>
                <v-text-field
                    density="comfortable"
                    :placeholder="$t('sign.msg.accountPlace')"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    :rules="[store.rules.required]"
                    v-model="store.loginEmail"
                ></v-text-field>
            </div>

            <div>
                <div class="text-h6 text-medium-emphasis mb-1 d-flex align-center justify-space-between">
                    {{$t('sign.password')}}
                    <a
                        class="text-subtitle-2 text-decoration-none text-blue"
                        href="#"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                    {{$t('sign.msg.forgotPassword')}}</a>
                </div>
                <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="comfortable"
                    :placeholder="$t('sign.msg.passwordPlace')"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                    :rules="[store.rules.required]"
                    v-model="store.loginPassword"
                ></v-text-field>
            </div>

            <v-btn
                block
                class="mb-1 flex-grow-0"
                color="blue"
                size="large"
                variant="tonal"
                @click="store.handleSubmit('/login')"
            >
            {{$t('sign.login')}}
            </v-btn>

            <v-card-text class="text-subtitle-1 d-flex justify-space-between align-center flex-grow-0">
                <RouterLink
                    :to='localePath("/sign-up")'
                    class="text-blue text-decoration-none"
                >
                    {{$t('sign.msg.signUpNow')}}
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </RouterLink>
                <div
                    class="sign-lang-select"
                >
                    <NuxtLink :to="switchLocalePath('zh')">繁體中文</NuxtLink>
                    <NuxtLink :to="switchLocalePath('en')">English</NuxtLink>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>