<script setup>
import { ref } from 'vue'
const center = ref([143, 40])
const projection = ref('EPSG:4326')
const zoom = ref(8)
const rotation = ref(0)
</script>

<template>
  <div class="main-container">
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: calc(100vh - 26.5vh); width: 100vw;"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />
  
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
    </ol-map>
  </div>
</template>

<style scoped>
@import 'vue3-openlayers/dist/vue3-openlayers.css';
</style>