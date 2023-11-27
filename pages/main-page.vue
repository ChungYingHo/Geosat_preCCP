<script setup lang="ts">
// page setting
definePageMeta({
    layout: 'header'
})

import { reactive } from 'vue';

const state = reactive({
  items: [
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
  ],
});

</script>


<template>
  <div class="main-container">
    <v-carousel hide-delimiters style="height: 70vh;">
    <v-carousel-item
      v-for="(item, i) in state.items"
      :key="i"
      :src="item.src"
      cover
    ></v-carousel-item>
  </v-carousel>

    <div class="main-page-row">
        <v-card
            class="mx-auto"
            max-width="400"
        >
            <v-img
            class="align-end text-white"
            height="200"
            src="../assets/images/drone-1080844_640.jpg"
            cover
            >
            <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
            Number 10
            </v-card-subtitle>

            <v-card-text>
            <div>Whitehaven Beach</div>

            <div>UAV主要功能為影像計算 攝影量技術。</div>
            </v-card-text>

            <v-card-actions>
            <v-btn color="orange">
                Share
            </v-btn>

            <v-btn color="orange">
                Explore
            </v-btn>
            </v-card-actions>
        </v-card>   
     

      <v-card
            class="mx-auto"
            max-width="400"
        >
            <v-img
            class="align-end text-white"
            height="200"
            src="../assets/images/2023-0919 TADTE 11.jpg"
            cover
            >
            <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
            Number 10
            </v-card-subtitle>

            <v-card-text>
            <div>Whitehaven Beach</div>

            <div>UAV主要功能為影像計算 攝影量技術。</div>
            </v-card-text>

            <v-card-actions>
            <v-btn color="orange">
                Share
            </v-btn>

            <v-btn color="orange">
                Explore
            </v-btn>
            </v-card-actions>
        </v-card>   

      <v-card
            class="mx-auto"
            max-width="400"
        >
            <v-img
            class="align-end text-white"
            height="200"
            src="../assets/images/drone-1866742_640.jpg"
            cover
            >
            <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
            Number 10
            </v-card-subtitle>

            <v-card-text>
            <div>Whitehaven Beach</div>

            <div>UAV主要功能為影像計算 攝影量技術。</div>
            </v-card-text>

            <v-card-actions>
            <v-btn color="orange">
                Share
            </v-btn>

            <v-btn color="orange">
                Explore
            </v-btn>
            </v-card-actions>
        </v-card>   

        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="align-end text-white"
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            cover
          >
            <v-card-title>Top 10 Australian beaches</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4">
            Number 10
          </v-card-subtitle>

          <v-card-text>
            <div>Whitehaven Beach</div>

            <div>UAV主要功能為影像計算 攝影量技術。</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange">
              Share
            </v-btn>

            <v-btn color="orange">
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
    </div>
  </div>
</template>