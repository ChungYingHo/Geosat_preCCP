<script setup>
const uavStore = useUavStore()
const center = ref([120, 23]);
const projection = ref("EPSG:4326");
const zoom = ref(8);
const jawgLayer = ref(null);
const osmLayer = ref(null);
const bingLayer = ref(null);
// pinia store 的 ref 解構
const {sourceL} = storeToRefs(uavStore)
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
      <!-- todo 三個圖層切換 -->
      <ol-tile-layer ref="jawgLayer" title="JAWG" v-if="uavStore.isJawgOpen" zIndex="1">
        <ol-source-xyz
          crossOrigin="anonymous"
          url="https://c.tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=87PWIbRaZAGNmYDjlYsLkeTVJpQeCfl2Y61mcHopxXqSdxXExoTLEv7dwqBwSWuJ"
        />
      </ol-tile-layer>
    
      <ol-tile-layer ref="bingLayer" title="Bing Maps" v-if="uavStore.isBingOpen" zIndex="1">
        <ol-source-bingmaps
          apiKey="AjtUzWJBHlI3Ma_Ke6Qv2fGRXEs0ua5hUQi54ECwfXTiWsitll4AkETZDihjcfeI"
          :imagerySet="'CanvasDark'"
        />
      </ol-tile-layer>
    
      <ol-tile-layer ref="osmLayer" title="OSM" v-if="uavStore.isOsmOpen" zIndex="1">
        <ol-source-osm />
      </ol-tile-layer>
      
      <!-- todo 向量圖層，點線面專用 -->
      <ol-vector-layer zIndex="10000" :key="uavStore.resetCounter">
        <ol-source-vector
          :projection="projection"
          :format="uavStore.geoJson"
          ref="sourceL">
          <ol-interaction-draw
            v-if="uavStore.drawEnable"
            :type="uavStore.drawType"
          >
          </ol-interaction-draw>

          <ol-interaction-modify
            v-if="uavStore.drawEnable"
          >
          </ol-interaction-modify>
        </ol-source-vector>

        <ol-style>
          <!-- 線和邊的顏色 -->
          <ol-style-stroke color="red" :width="2"></ol-style-stroke>
          <!-- 面積內裡著色 -->
          <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
          <!-- 點的顏色 -->
          <ol-style-circle :radius="7">
            <ol-style-fill color="red"></ol-style-fill>
          </ol-style-circle>
        </ol-style>
      </ol-vector-layer>

      <!-- todo 顯示資訊 -->
      <ol-interaction-select
        @select="uavStore.featureSelected"
        :condition="uavStore.selectedConditions.singleClick"
        :filter = "uavStore.selectInteactionFilter"
        v-if="!uavStore.drawEnable"
      >
        <ol-style>
          <ol-style-stroke color="orange" :width="10"></ol-style-stroke>
          <!-- 多邊形內部著色 -->
          <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
          <ol-style-circle :radius="7">
            <ol-style-fill color="gray"></ol-style-fill>
          </ol-style-circle>
        </ol-style>
      </ol-interaction-select>

      <ol-overlay
        :position="uavStore.selectedPosition"
        v-if="uavStore.selectedPosition != '' && !uavStore.drawEnable"
      >
          <div class="overlay-content" v-if="uavStore.selectedGeometry === 'Point'">
            {{ uavStore.selectedPosition }}
          </div>
          <div class="overlay-content" v-if="uavStore.selectedGeometry === 'LineString'">
            {{ uavStore.selectedLength }} km
          </div>
          <div class="overlay-content" v-if="uavStore.selectedGeometry === 'Polygon'">
            {{ uavStore.selectedArea }} km²
          </div>
      </ol-overlay>

      <!-- select to delete the feature-->
      <ol-interaction-select
        @select="uavStore.seletedDelete"
        :condition="uavStore.selectedConditions.altKeyOnly"
        :filter = "uavStore.selectInteactionFilter"
        v-if="!uavStore.drawEnable"
      >
      </ol-interaction-select>

      <!-- todo wms -->
      <!-- 官網範例 -->
      <ol-image-layer :zIndex="1001" v-if="uavStore.isWMSopen">
        <ol-source-image-wms
          url="https://ahocevar.com/geoserver/wms"
          :extent="[-13884991, 2870341, -7455066, 6338219]"
          layers="topp:states"
          serverType="geoserver"
        />
      </ol-image-layer>
      <!-- 台灣國土 -->
      <ol-image-layer :zIndex="1000" v-if="uavStore.isWMSopen">
        <ol-source-image-wms
          url="https://wms.nlsc.gov.tw/wms"
          :extent="[13884991, 870341, 7455066, 338219]"
          layers="EMAP"
          serverType="geoserver"
        />
      </ol-image-layer>


    </ol-map>
  </div>
</template>

<style scoped>
.overlay-content {
  background: #c84031;
  color: white;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: 16px;
}
</style>