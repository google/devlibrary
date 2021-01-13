<template>
  <div class="flex flex-row rounded overflow-hidden shadow">

    <div class="px-2 flex flex-col justify-center text-white bg-gray-900">
      <font-awesome-icon :icon="['fab', 'github']" size="lg" />
    </div>

    <div class="flex-grow py-2 px-3">
      <div class="flex flex-row items-baseline">
        <span class="flex-grow text-lg">flank</span>
        <span class="text-sm">123</span>
        <font-awesome-icon icon="star" size="sm" class="ml-1 text-yellow-400" />
      </div>
      <div class="pt-1 pb-4">
        One line description...
      </div>
      <div class="flex flex-row items-baseline">
        <span class="flex-grow text-xs">updated 8 hours ago</span>
        <span class="text-sm uppercase cursor-pointer hover:underline">Learn More</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SmallProjectCard extends Vue {
}
</script>

<style scoped lang="postcss">
</style>
