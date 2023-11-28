<script setup lang="ts">
import { useSignStore } from '#imports';
import { useLocale } from '~/composables/useLocale'

definePageMeta({
    layout: 'sign-in-up'
})
const store = useSignStore()
const { localePath } = useLocale()
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
            <div class="text-h4 text-medium-emphasis mb-3">{{$t('sign.title')}}</div>

            <div>
                <div class="text-h6 text-medium-emphasis">{{$t('sign.name')}}</div>
                <v-text-field
                    density="comfortable"
                    :placeholder="$t('sign.msg.namePlace')"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    :rules="[store.rules.required, store.rules.counter]"
                    v-model="store.name"
                ></v-text-field>
            </div>

            <div>
                <div class="text-h6 text-medium-emphasis">{{$t('sign.account')}}</div>
                <v-text-field
                    density="comfortable"
                    :placeholder="$t('sign.msg.accountPlace')"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    :rules="[store.rules.email, store.rules.required]"
                    v-model="store.email"
                ></v-text-field>
            </div>

            <div>
                <div class="text-h6 text-medium-emphasis">
                    {{$t('sign.password')}}
                </div>
                <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="comfortable"
                    :placeholder="$t('sign.msg.passwordPlace')"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                    :rules="[store.rules.required, store.rules.counter]"
                    v-model="store.password"
                ></v-text-field>
            </div>

            <div>
                <div class="text-h6 text-medium-emphasis">
                    {{$t('sign.checkPassword')}}
                </div>
                <v-text-field
                    :append-inner-icon="checkedVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="checkedVisible ? 'text' : 'password'"
                    density="comfortable"
                    :placeholder="$t('sign.msg.checkPasswordPlace')"
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
                {{$t('sign.submit')}}
            </v-btn>

            <v-card-text class="text-subtitle-1 d-flex justify-start flex-grow-0">
                <RouterLink
                    :to="localePath('/login')"
                    class="text-blue text-decoration-none"
                >
                    {{$t('sign.back')}}
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </RouterLink>
            </v-card-text>
        </v-card>
    </div>
</template>