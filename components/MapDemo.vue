<script setup>
const uavStore = useUavStore()
const center = ref([40, 40]);
const projection = ref("EPSG:4326");
const zoom = ref(8);
const jawgLayer = ref(null);
const osmLayer = ref(null);
const bingLayer = ref(null);

</script>

<template>
  <div class="map-container">
    <ol-map
      ref="map"
      style="height: 100vh;width: 100vw;"
      :controls="[]">
      <ol-view
        ref="view"
        :center="center"
        :zoom="zoom"
        :projection="projection"
      />

      <div v-if="uavStore.isJawgOpen">
        <ol-tile-layer ref="jawgLayer" title="JAWG" >
          <ol-source-xyz
            crossOrigin="anonymous"
            url="https://c.tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=87PWIbRaZAGNmYDjlYsLkeTVJpQeCfl2Y61mcHopxXqSdxXExoTLEv7dwqBwSWuJ"
          />
        </ol-tile-layer>
      </div>
      
      <div v-if="uavStore.isBingOpen">
        <ol-tile-layer ref="bingLayer" title="Bing Maps" >
          <ol-source-bingmaps
            apiKey="AjtUzWJBHlI3Ma_Ke6Qv2fGRXEs0ua5hUQi54ECwfXTiWsitll4AkETZDihjcfeI"
            :imagerySet="'CanvasDark'"
          />
        </ol-tile-layer>
      </div>
      
      <div v-if="uavStore.isOsmOpen">
        <ol-tile-layer ref="osmLayer" title="OSM" >
          <ol-source-osm />
        </ol-tile-layer>
      </div>
      
      <!-- todo 向量圖層，點線面專用 -->
      <ol-vector-layer>
        <ol-source-vector :projection="projection">
          <ol-interaction-draw
            v-if="uavStore.drawEnable"
            :type="uavStore.drawType"
          >
            <ol-style>
              <ol-style-stroke color="blue" :width="2"></ol-style-stroke>
              <ol-style-fill color="rgba(255, 255, 0, 0.4)"></ol-style-fill>
            </ol-style>
          </ol-interaction-draw>
        </ol-source-vector>

        <ol-style>
          <ol-style-stroke color="red" :width="2"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
          <ol-style-circle :radius="7">
            <ol-style-fill color="red"></ol-style-fill>
          </ol-style-circle>
        </ol-style>
      </ol-vector-layer>

    </ol-map>
  </div>
</template>

