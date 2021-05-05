<!--
 Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <div
    class="relative flex flex-row items-center py-3 lg:py-0 px-4 text-nav bg-white shadow-md"
  >
    <router-link
      tag="div"
      to="/"
      class="inline-flex flex-row items-center ml-2 mr-4 lg:mr-8 cursor-pointer"
    >
      <img
        src="@/assets/GoogleDevelopers-lockup.svg"
        alt="devlibrary.withgoogle.com"
        class="h-8 mr-4"
      />
    </router-link>

    <!-- Home -->
    <router-link tag="div" class="nav-item nav-item-link" to="/"
      ><span>Home</span></router-link
    >

    <!-- TODO: Mobile hamburger menu -->

    <!-- Products -->
    <div
      class="nav-item nav-item-link relative z-10"
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

    <!-- Authors -->
    <router-link tag="div" class="nav-item nav-item-link" to="/authors"
      ><span>Authors</span></router-link
    >

    <!-- About -->
    <router-link tag="div" class="nav-item nav-item-link" to="/about"
      ><span>About</span></router-link
    >

    <a
      class="nav-item nav-item-link"
      href="https://forms.gle/2JoN6csvyvnDC8Nd9"
      target="_blank"
      >Feedback</a
    >

    <span class="flex-grow"><!-- spacer --></span>

    <!-- Search Bar -->
    <SearchBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SearchBar from "@/components/SearchBar.vue";
import { ALL_PRODUCTS } from "@/model/product";

@Component({
  components: {
    SearchBar,
  },
})
export default class NavBar extends Vue {
  public showProductsDropdown = false;

  get products() {
    return Object.values(ALL_PRODUCTS);
  }
}
</script>

<style scoped lang="postcss">
.text-nav {
  @apply font-display text-base;
  color: rgb(95, 99, 104);
}

.nav-dropdown {
  @apply absolute top-full bg-white rounded-b shadow-md text-sm;
  z-index: -1;
  min-width: calc(100% + 1rem);
  left: 0%;
}

.nav-item {
  @apply py-3 px-4;
  @apply cursor-pointer;
  @apply hidden lg:inline;
  font-size: 0.875rem;
}

.nav-item-link {
  @apply hover:bg-gray-100;
}
</style>
