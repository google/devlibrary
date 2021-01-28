<template>
  <div
    class="relative flex flex-row items-center px-4 lg:px-8 py-4 lg:py-0 bg-white shadow-md"
  >
    <router-link
      tag="div"
      to="/"
      class="inline-flex flex-row items-center text-xl mr-4 cursor-pointer"
    >
      <font-awesome-icon icon="code" size="md" class="mr-2" />
      <h1>ugc.dev</h1>
    </router-link>

    <router-link tag="div" class="nav-item nav-item-link" to="/"
      ><span>Home</span></router-link
    >
    <router-link tag="div" class="nav-item nav-item-link" to="/about"
      ><span>About</span></router-link
    >

    <div
      class="nav-item relative z-10"
      @mouseenter="showProductsDropdown = true"
      @mouseleave="showProductsDropdown = false"
      @click="showProductsDropdown = false"
    >
      <span>Products</span>
      <font-awesome-icon
        :icon="showProductsDropdown ? 'caret-up' : 'caret-down'"
        class="ml-1"
      />

      <div class="nav-dropdown" v-show="showProductsDropdown">
        <router-link
          v-for="p in products"
          :key="p.key"
          :to="`/products/${p.key}`"
          tag="div"
          class="px-3 py-2 whitespace-nowrap hover:bg-gray-50"
        >
          {{ p.name }}
        </router-link>
      </div>
    </div>

    <span class="flex-grow"><!-- spacer --></span>

    <div class="relative">
      <font-awesome-icon
        icon="search"
        size="sm"
        class="text-gray-400 absolute top-2 left-2"
      />
      <input
        type="text"
        class="bg-gray-100 text-gray-500 pl-8 pr-1 py-1 shadow-inner rounded"
        placeholder="Search"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { ALL_PRODUCTS } from "@/model/product";

@Component
export default class NavBar extends Vue {
  public showProductsDropdown = false;

  get products() {
    return Object.values(ALL_PRODUCTS);
  }
}
</script>

<style scoped lang="postcss">
.nav-dropdown {
  @apply absolute top-full bg-white rounded-b shadow-md text-sm;
  z-index: -1;
  min-width: calc(100% + 1rem);
  left: 0%;
}

.nav-item {
  @apply py-4 px-4;
  @apply cursor-pointer;
  @apply hidden lg:inline;
}

.nav-item-link {
  @apply hover:bg-gray-100;
}
</style>
