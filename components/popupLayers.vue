<script setup lang="ts">
import '~/assets/styles/component.scss'
const uavStore = useUavStore()
</script>

<template v-if="uavStore.isPopupLayerOpen">
    <div class="popup-container">
        <v-sheet
            elevation="12"
            rounded="lg"
            width="20vw"
            height="fit-content"
            class="pa-4 text-center mx-auto"
        >
          <v-icon icon="mdi-close" @click="uavStore.isPopupLayerOpen = false" class="ml-auto align-center"></v-icon>

          <v-divider></v-divider>

          <v-switch
            v-model="uavStore.isOsmOpen"
            hide-details
            inset
            :label="`OSM`"
            @change="uavStore.setBaseLayer('osm')"
          ></v-switch>
          <v-switch
            v-model="uavStore.isJawgOpen"
            hide-details
            inset
            :label="`JAWG`"
            @change="uavStore.setBaseLayer('jawg')"
          ></v-switch>
          <v-switch
            v-model="uavStore.isBingOpen"
            hide-details
            inset
            :label="`Bing`"
            @change="uavStore.setBaseLayer('bing')"
          ></v-switch>
          <v-switch
            v-model="uavStore.isWMSopen"
            hide-details
            inset
            :label="`WMS`"
            @change="!uavStore.isWMSopen"
          ></v-switch>
          <v-switch
            v-model="uavStore.isWFSopen"
            hide-details
            inset
            :label="`WFS`"
            @change="uavStore.handleWfs()"
          ></v-switch>
        </v-sheet>
    </div>
</template>