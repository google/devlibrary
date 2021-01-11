<template>
  <div class="flex flex-row rounded overflow-hidden shadow">

    <div class="px-2 flex flex-col justify-center text-white bg-gray-900">
      <font-awesome-icon :icon="['fab', 'github']" />
    </div>

    <div class="flex-grow p-2">
      <div class="flex flex-row items-baseline">
        <span class="flex-grow text-lg">flank</span>
        <span class="text-sm">123</span>
        <font-awesome-icon icon="star" size="sm" class="ml-1" />
      </div>
      <div class="pt-1 pb-4">
        One line description...
      </div>
      <div class="flex flex-row text-sm">
        <span class="flex-grow">updated 8 hours ago</span>
        <span>LEARN MORE</span>
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
