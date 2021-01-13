<template>
  <div class="flex flex-row items-center gap-8 px-8 py-4 bg-white shadow-md">
    <span class="inline-flex flex-row items-center font-display text-xl">
      <font-awesome-icon icon="code" size="md" class="mr-2" />
      ugc.dev
    </span>
    <router-link to="/" class="cursor-pointer hover:underline">Home</router-link>
    <router-link to="/about" class="cursor-pointer hover:underline">About</router-link>
    <router-link to="/products/firebase" class="cursor-pointer hover:underline">Products</router-link>
    <span class="flex-grow"><!-- spacer --></span>

    <div class="relative">
      <font-awesome-icon icon="search" size="sm" class="text-gray-400 absolute top-2 left-2" />
      <input type="text" class="bg-gray-100 text-gray-500 pl-8 pr-1 py-1 shadow-inner rounded" placeholder="Search" />
    </div>
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
