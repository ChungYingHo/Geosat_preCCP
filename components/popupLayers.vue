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
          <v-btn icon="mdi-close" @click="uavStore.isPopupLayerOpen = false"></v-btn>
        </v-sheet>
    </div>
</template>