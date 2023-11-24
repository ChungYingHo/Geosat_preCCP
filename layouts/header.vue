<script setup lang="ts">
import '~/assets/styles/main-page.scss'
const getLink = (item:string):string=>{
    switch(item){
        case 'Home':
            return '/main-page'
        case 'UAV':
            return '/uav'
        default:
            return '/main-page'
    }
}
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
                    <template v-slot:extension >
                        <v-row class="d-flex justify-center">
                            <div
                                v-for="item in ['HOME', 'UAV', 'CCP', 'PRODUCT', 'NEWS']"
                                :key="item"
                                class="ma-2 pa-2 text-center "
                            >
                                <router-link :to="getLink(item)" style="color: black;">
                                    <v-btn>
                                        {{ item }}
                                    </v-btn>
                                </router-link>
                            </div>
                        </v-row>
                    </template>

                    <v-row class="d-flex justify-center">
                        <div>
                        <v-img src="../assets/images/faked-logo.png" alt="logo" width="60" class="mt-16 ms-12"></v-img>
                        </div>
                    </v-row>
                    
                    <v-btn icon>
                        <img class="header-img" src="../assets/images/user.png" alt="user">
                    </v-btn>
                    <v-btn icon>
                        <v-icon class="header-img">mdi-magnify</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon class="header-img">mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-app-bar>
            <slot/>
        </v-app>
    </div>
</template>