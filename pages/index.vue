<script setup lang="ts">
definePageMeta({
    layout: 'sign-in-up'
})
const signStore = useSignStore()
const mainStore = useMainStore()
const visible = ref(false)
const { localePath, switchLocalePath } = useLocale()
const router = useRouter()
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
                    :rules="[signStore.rules.required]"
                    v-model="signStore.loginEmail"
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
                    :rules="[signStore.rules.required]"
                    v-model="signStore.loginPassword"
                ></v-text-field>
            </div>

            <v-btn
                block
                class="mb-1 flex-grow-0"
                color="blue"
                size="large"
                variant="tonal"
                @click="signStore.handleSubmit('/login')"
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
                <!-- <div
                    class="sign-lang-select"
                >
                    <NuxtLink :to="switchLocalePath('zh')">繁體中文</NuxtLink>
                    <NuxtLink :to="switchLocalePath('en')">English</NuxtLink>
                </div> -->
                <select
                    class="sign-lang-select"
                    v-model="mainStore.currentLang"
                    @change="mainStore.changeLocale">
                    <option disabled value selected>Select Language</option>
                    <option value="zh">繁體中文</option>
                    <option value="en">English</option>
                </select>
            </v-card-text>
        </v-card>
    </div>
</template>