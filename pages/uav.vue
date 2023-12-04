<script setup lang="ts">
import '~/assets/styles/main-page.scss'
const {localePath} = useLocale()
const uavStore = useUavStore()
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
                            :title="$t('UAV.layers')"
                            value="layers"
                            @click="uavStore.isPopupLayerOpen = true"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-note-edit"
                            :title="$t('UAV.edit')"
                            value="edit"
                            @click="uavStore.handleClick"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-rotate-left"
                            :title="$t('UAV.reset')"
                            value="Reset"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-folder"
                            :title="$t('UAV.project')"
                            value="project"></v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list density="comfortable" nav>
                        <v-list-item
                            prepend-icon="mdi-home"
                            :title="$t('main.header.HOME')"
                            value="home"
                            to="/main-page"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-laptop"
                            :title="$t('main.header.CCP')"
                            value="ccp"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-cog"
                            :title="$t('main.setting')"
                            value="setting"></v-list-item>
                        <v-list-item
                            prepend-icon="mdi-export"
                            :title="$t('main.logout')"
                            value="logout"
                            :to="localePath('/')"></v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main></v-main>

                <!-- todo here is the map component -->
                <MapDemo/>
                <!-- todo here is popup modal -->
                <PopupLayers
                    style="top: 50%; left: 50%;transform: translate(-50%, -50%);"
                    v-if="uavStore.isPopupLayerOpen"/>
                <PopupEdit
                    style="top: 0;right: 20vw;"
                    v-if="uavStore.isPopupEditOpen"/>
            </v-layout>
        </v-card>
        
    </div>
</template>