<template>
  <div class="flex flex-row items-center gap-8 px-8 py-4 text-lg bg-gray-200 shadow-md">
    <span class="font-display text-xl">ugc.dev</span>
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
