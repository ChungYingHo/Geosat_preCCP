<script setup lang="ts">
import '~/assets/styles/uav.scss'
</script>

<template>
    <div class="uav-container">
        <v-card>
            <v-layout>
                <v-navigation-drawer
                    expand-on-hover
                    rail
                >
                    <v-list>
                        <v-list-item
                            prepend-avatar="https://randomuser.me/api/portraits/women/17.jpg"
                            title="Sandra Adams"
                            subtitle="sandra_a88@gmailcom"
                        ></v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list density="comfortable" nav>
                        <v-list-item
                            prepend-icon="mdi-layers"
                            title="Layers"
                            value="layers"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-note-edit"
                            title="Edit"
                            value="edit"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-rotate-left"
                            title="Reset"
                            value="Reset"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-folder"
                            title="Project"
                            value="project"></v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list density="comfortable" nav>
                        <v-list-item
                            prepend-icon="mdi-home"
                            title="Home"
                            value="home"
                            to="/main-page"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-laptop"
                            title="CCP"
                            value="ccp"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-cog"
                            title="Setting"
                            value="setting"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-export"
                            title="Logout"
                            value="logout"
                            to="/login"></v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main></v-main>

                <!-- todo here is the map component -->
                <MapDemo/>
            </v-layout>
        </v-card>
    </div>
</template>