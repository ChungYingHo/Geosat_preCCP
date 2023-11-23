<script setup lang="ts">
// page setting
definePageMeta({
    layout: 'sign-in-up'
})
const visible = ref(false)
</script>

<template>
    <div class="sign-box">
        <v-img
            class="mx-auto my-3"
            max-width="228"
            src="~/assets/images/logo-showed.png"
        ></v-img>

        <v-card
            class="mx-auto pa-4 pb-4"
            elevation="8"
            max-width="30%"
            rounded="lg"
        >
            <div class="text-subtitle-1 text-medium-emphasis">Login with...</div>
            <!-- todo 2023.11.23 做到這裡 -->
            <v-btn icon="~/assets/images/google.png"></v-btn>

            <div class="text-subtitle-1 text-medium-emphasis">Account</div>
            <v-text-field
                density="compact"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
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
            ></v-text-field>

            <v-btn
                block
                class="mb-4"
                color="blue"
                size="large"
                variant="tonal"
            >
                Log In
            </v-btn>

            <v-card-text class="text-center">
                <a
                class="text-blue text-decoration-none"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                >
                Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text>
        </v-card>
    </div>
</template>