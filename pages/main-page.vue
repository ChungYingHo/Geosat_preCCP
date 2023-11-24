<script setup lang="ts">
// page setting
definePageMeta({
    layout: 'header'
})

</script>

<template>
    <div class="main-container">
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

            <div>Whitsunday Island, Whitsunday Islands</div>
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

        <h1>2253256</h1>

        <v-card
            class="mx-auto"
            max-width="200"
            height="200"
            image="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            title="Card title"
            theme="dark"
        ></v-card>


    </div>
</template>