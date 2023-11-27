<script setup lang="ts">
import { useSignStore } from '#imports';
const store = useSignStore()
// page setting
definePageMeta({
    layout: 'sign-in-up'
})
const visible = ref(false)
const checkedVisible = ref(false)
</script>

<template>
    <div class="sign-container">
        <v-card
            class="pa-8 pb-2 d-flex flex-column justify-space-between"
            elevation="8"
            rounded="lg"
            height="80%"
        >
            <div class="text-h4 text-medium-emphasis mb-3">Sign up</div>

            <div>
                <div class="text-h6 text-medium-emphasis">Name</div>
                <v-text-field
                    density="comfortable"
                    placeholder="Enter your name"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    :rules="[store.rules.required, store.rules.counter]"
                    v-model="store.name"
                ></v-text-field>
            </div>

            <div>
                <div class="text-h6 text-medium-emphasis">Account</div>
                <v-text-field
                    density="comfortable"
                    placeholder="Email address"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    :rules="[store.rules.email, store.rules.required]"
                    v-model="store.email"
                ></v-text-field>
            </div>

            <div>
                <div class="text-h6 text-medium-emphasis">
                    Password
                </div>
                <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="comfortable"
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                    :rules="[store.rules.required, store.rules.counter]"
                    v-model="store.password"
                ></v-text-field>
            </div>

            <div>
                <div class="text-h6 text-medium-emphasis">
                    Checked Password
                </div>
                <v-text-field
                    :append-inner-icon="checkedVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="checkedVisible ? 'text' : 'password'"
                    density="comfortable"
                    placeholder="Check your password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="checkedVisible = !checkedVisible"
                    :rules="[store.rules.required]"
                    v-model="store.checkedPassword"
                ></v-text-field>
            </div>

            <v-btn
                block
                class="mb-1 flex-grow-0"
                color="blue"
                size="large"
                variant="tonal"
                @click="store.handleSubmit"
            >
                Submit
            </v-btn>

            <v-card-text class="text-subtitle-1 d-flex justify-start flex-grow-0">
                <RouterLink
                    to="/login"
                    class="text-blue text-decoration-none"
                >
                Back <v-icon icon="mdi-chevron-right"></v-icon>
                </RouterLink>
            </v-card-text>
        </v-card>
    </div>
</template>