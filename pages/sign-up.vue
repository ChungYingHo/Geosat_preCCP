<script setup lang="ts">
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
            class="pa-4 pb-2"
            elevation="8"
            rounded="lg"
        >
            <div class="text-h5 text-medium-emphasis mb-3">Sign up</div>
            
            <div class="text-subtitle-1 text-medium-emphasis">Name</div>
            <v-text-field
                density="compact"
                placeholder="Enter your name"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
            ></v-text-field>
        
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>
            <v-text-field
                density="compact"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">
                Password
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

            <div class="text-subtitle-1 text-medium-emphasis">
                Checked Password
            </div>
            <v-text-field
                :append-inner-icon="checkedVisible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="checkedVisible ? 'text' : 'password'"
                density="compact"
                placeholder="Check your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="checkedVisible = !checkedVisible"
            ></v-text-field>

            <v-btn
                block
                class="mb-1"
                color="blue"
                size="large"
                variant="tonal"
            >
                Submit
            </v-btn>

            <v-card-text class="d-flex justify-start">
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