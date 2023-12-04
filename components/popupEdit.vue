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
            height="fit-content"
            class="pa-4 text-center mx-auto"
        >
            <v-icon icon="mdi-close" @click="uavStore.handleClick" class="ml-auto align-center"></v-icon>

            <v-divider></v-divider>
            
            <v-switch
            v-model="uavStore.selectedType.drawPoint"
            hide-details
            inset
            :label="`Point`"
            @change="uavStore.setVector('point')"
          ></v-switch>
          <v-switch
            v-model="uavStore.selectedType.drawLine"
            hide-details
            inset
            :label="`Line`"
            @change="uavStore.setVector('line')"
          ></v-switch>
          <v-switch
            v-model="uavStore.selectedType.drawArea"
            hide-details
            inset
            :label="`Area`"
            @change="uavStore.setVector('area')"
          ></v-switch>

        </v-sheet>
    </div>
</template>