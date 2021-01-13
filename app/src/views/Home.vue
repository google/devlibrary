<template>
  <div>
    <div class="grid grid-cols-12 gap-4 py-20 bg-gray-50 border-b border-gray-100">
      <div class="col-start-3 col-span-4">
        <h1 class="text-3xl font-display font-semibold">What will <span class="underline">you</span> build?</h1>

        <div class="mt-8 text-lg">
          <p>Welcome to ugc.dev, a showcase of what developers like you have built with Google technologies</p>
          <p class="mt-2">Browse and learn, or submit your own!</p>
        </div>

        <div class="mt-8">
          <MaterialButton type="primary">Explore</MaterialButton>
          <MaterialButton type="secondary">Submit</MaterialButton>
        </div>
      </div>

      <div class="col-span-4">
        <img src="@/assets/undraw_connected_world_wuay.svg" />
      </div>

      <div class="col-span-2"><!-- Gutter --></div>
    </div>    

    <div class="grid grid-cols-12 gap-4 pt-4 py-20">

      <div class="flex flex-row-reverse col-start-1 col-span-1">
        <div class="mt-8 w-12 h-12 p-1 border-firebase-accent border-4 rounded-full">
          <img src="@/assets/logos/firebase.png" />
        </div>
      </div>

      <div class="mt-8 col-span-4">
        <p class="font-display text-2xl">Firebase</p>
        <p class="text-gray-500">Trending Now</p>
      </div>

      <div class="col-start-2 col-span-10 grid grid-cols-2 gap-4">
        <SmallProjectCard />
        <SmallProjectCard />
      </div>

      <div class="flex flex-row-reverse col-start-1 col-span-1">
        <div class="mt-8 w-12 h-12 p-1 border-ml-accent border-4 rounded-full">
          <img src="@/assets/logos/ml.png" />
        </div>
      </div>

      <div class="mt-8 col-span-4">
        <p class="font-display text-2xl">Machine Learning</p>
        <p class="text-gray-500">Trending Now</p>
      </div>

      <div class="col-start-2 col-span-10 grid grid-cols-2 gap-4">
        <SmallProjectCard />
        <SmallProjectCard />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MaterialButton from "@/components/MaterialButton.vue";
import SmallProjectCard from "@/components/SmallProjectCard.vue";

@Component({
  components: {
    MaterialButton,
    SmallProjectCard
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="postcss">
</style>
