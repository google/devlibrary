<template>
  <div class="flex flex-row items-center gap-8 px-8 py-4 bg-gray-100 shadow-md">
    <span class="inline-flex flex-row items-center font-display text-xl">
      <font-awesome-icon icon="code" size="md" class="mr-2" />
      ugc.dev
    </span>
    <a class="cursor-pointer hover:underline">Home</a>
    <a class="cursor-pointer hover:underline">About</a>
    <a class="cursor-pointer hover:underline">Products</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
}
</script>

<style scoped lang="postcss">
</style>
