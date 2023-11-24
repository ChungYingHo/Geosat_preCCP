<script setup lang="ts">
import '~/assets/styles/header.scss'
</script>

<template>
        <v-layout>
                <v-app-bar height="100">

                    <template v-slot:prepend>
                    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
                    <v-btn icon>
                        <img src="../assets/images/facebook1.png" alt="facebook">
                    </v-btn>
                    <v-btn icon>
                        <img src="../assets/images/discord.png" alt="discord">
                    </v-btn>
                    <v-btn icon>
                        <img src="../assets/images/youtube.png" alt="youtube">
                    </v-btn>
                    
                    </template>                                       

                    <template v-slot:extension >
                      
                        <v-row class="d-flex justify-center">
                            <div
                            v-for="item in ['HOME', 'UAV', 'CCP', 'PRODUCT', 'NEWS']"
                            :key="item"
                            class="ma-2 pa-2 text-center "
                            >
                            <v-btn>
                                {{ item }}
                            </v-btn>
                            </div>
                        </v-row>
                    </template>

                    <v-row class="d-flex justify-center">
                        <div>
                        <v-img src="../assets/images/faked-logo.png" alt="logo" width="60" class="mt-10 ms-12"></v-img>
                        </div>
                    </v-row>
                    
                    
                    <v-btn icon>
                        <img src="../assets/images/user.png" alt="user">
                    </v-btn>

                    <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                    </v-btn>

                    <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-app-bar>
        </v-layout>

</template>