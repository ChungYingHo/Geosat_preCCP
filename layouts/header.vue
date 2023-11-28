<script setup lang="ts">
import '~/assets/styles/main-page.scss'
import { useHeaderStore } from '#imports';
const store = useHeaderStore()

</script>

<template>
    <div class="header-layout">
        <v-app>
            <v-app-bar>
                <template v-slot:prepend>
                    <v-btn icon>
                        <img class="header-img" src="../assets/images/facebook1.png" alt="facebook">
                    </v-btn>
                    <v-btn icon>
                        <img class="header-img" src="../assets/images/discord.png" alt="discord">
                    </v-btn>
                    <v-btn icon>
                        <img class="header-img" src="../assets/images/youtube.png" alt="youtube">
                    </v-btn>
                </template>
                <v-spacer>
                    <v-img src="../assets/images/faked-logo.png" alt="logo" width="4rem" class="mt-10 mx-auto"></v-img>
                </v-spacer>
                <template v-slot:append>
                    <v-btn icon="mdi-magnify"></v-btn>
                    <v-btn icon="mdi-account"></v-btn>
                    <NuxtLinkLocale to="/" class="header-link">
                        <v-btn icon>
                            <v-icon>mdi-export</v-icon>
                        </v-btn>
                    </NuxtLinkLocale>

                </template>
                <template v-slot:extension >
                    <v-row class="d-flex justify-center">
                        <div
                            v-for="item in ['HOME', 'UAV', 'CCP', 'PRODUCT', 'NEWS']"
                            :key="item"
                            class="ma-2 pa-2 text-center "
                        >
                            <NuxtLinkLocale :to="store.getLink(item)" style="color: black;">
                                <v-btn>
                                    {{ item }}
                                </v-btn>
                            </NuxtLinkLocale>
                        </div>
                    </v-row>
                </template>
            </v-app-bar>
            <slot/>
            <v-footer class="d-flex flex-column">
                <div class="bg-teal d-flex w-100 align-center px-4">
                <strong>Get connected with us on social networks!</strong>

                <v-spacer></v-spacer>

                <v-btn
                    v-for="icon in store.icons"
                    :key="icon"
                    class="mx-4"
                    :icon="icon"
                    variant="plain"
                    size="small"
                ></v-btn>
                </div>

                <div class="px-4 py-2 bg-black text-center w-100">
                {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                </div>
            </v-footer>
        </v-app>
    </div>
</template>