<script setup lang="ts">
import '~/assets/styles/component.scss'
const uavStore = useUavStore()

</script>

<template>
    <div class="popup-container">
        <v-sheet
            elevation="12"
            rounded="lg"
            width="20vw"
            height="10vh"
            class="pa-4 text-center mx-auto"
        >
            <!-- 新增你要的介面 -->
            <v-icon icon="icon mdi-map-marker" class="ml-6"></v-icon>
            <v-icon icon="mdi-ray-start-end" class="ml-6"></v-icon>
            <v-icon icon="mdi-shape" class="mr-6 ms-6"></v-icon>
            
            <v-btn icon="mdi-close" @click="uavStore.isPopupEditOpen = false"></v-btn>
            <slot></slot>
        </v-sheet>
    </div>
</template>