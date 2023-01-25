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
  <div class="relative bg-white shadow-md">
    <!-- Hamburger menu sidebar -->
    <transition name="slide">
      <div
        v-if="showSideMenu"
        class="side-menu mobile-only absolute top-0 left-0 bg-white text-base shadow-lg"
        style="height: 100vh"
      >
        <div class="flex flex-col">
          <div class="py-2 lg:py-1 frc px-4 border-b border-gray-200">
            <div
              class="mr-3 frc align-middle text-gray-400 hover:text-gray-600"
              @click="showSideMenu = false"
            >
              <font-awesome-icon icon="times" class="m-1" fixed-width />
            </div>

            <img
              src="@/assets/GoogleDevelopers-lockup.svg"
              alt="devlibrary.withgoogle.com"
              class="h-8 my-1"
            />
          </div>

          <router-link to="/" class="section">
            <span class="header">Home</span>
          </router-link>

          <div class="section">
            <span class="header mb-1">Products</span>
            <router-link
              v-for="p in products"
              :key="p.key"
              :to="`/products/${p.key}`"
              class="block cursor-pointer text-sm text-gray-500"
            >
              {{ p.name }}
            </router-link>
          </div>

          <router-link to="/authors" class="section">
            <span class="header">Authors</span>
          </router-link>

          <router-link to="/about" class="section">
            <span class="header">About</span>
          </router-link>
        </div>
      </div>
    </transition>

    <!-- Nav row -->
    <div class="frc py-3 lg:py-2 px-4 text-nav">
      <div
        class="mr-1 frc align-middle text-gray-400 hover:text-gray-600"
        @click="showSideMenu = true"
      >
        <font-awesome-icon icon="bars" class="mobile-only m-1" fixed-width />
      </div>

      <router-link tag="div" to="/" class="ifrc ml-2 cursor-pointer">
        <img
          src="@/assets/GoogleDevelopers-lockup.svg"
          alt="devlibrary.withgoogle.com"
          class="h-8"
        />
      </router-link>

      <span class="mr-4 lg:mr-8"><!-- spacer --></span>

      <!-- Home -->
      <router-link class="block nav-item nav-item-link" to="/"
        ><span>Home</span></router-link
      >

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
            class="block px-3 py-2 whitespace-nowrap hover:bg-gray-50"
          >
            {{ p.name }}
          </router-link>
        </div>
      </div>

      <router-link class="block nav-item nav-item-link" to="/authors"
        ><span>Authors</span></router-link
      >

      <router-link class="block nav-item nav-item-link" to="/about"
        ><span>About</span></router-link
      >

      <span class="flex-grow"><!-- spacer --></span>

      <!-- Search Bar -->
      <transition name="appear">
        <MaterialButton
          @click.native="showSubmitDialog"
          type="primary"
          v-if="!showSideMenu"
        >
          Submit your content
        </MaterialButton>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import MaterialButton from "@/components/MaterialButton.vue";
import { ALL_PRODUCTS } from "../../../shared/product";
import { EVENT_BUS, NAME_SHOW_SUBMIT_DIALOG } from "@/plugins/events";

@Component({
  components: {
    MaterialButton,
  },
})
export default class NavBar extends Vue {
  public showSideMenu = false;
  public showProductsDropdown = false;

  public showSubmitDialog() {
    EVENT_BUS.$emit(NAME_SHOW_SUBMIT_DIALOG);
  }

  get products() {
    return Object.values(ALL_PRODUCTS).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  @Watch("$route")
  onRouteChange() {
    this.showSideMenu = false;
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

/** slide transition */

.slide-leave-active,
.slide-enter-active {
  transition: 0.33s;
}
.slide-enter-to {
  transform: translate(0, 0);
}
.slide-enter,
.slide-leave-to {
  transform: translate(-120%, 0);
}

/** appear transition */

.appear-leave-active,
.appear-enter-active {
  transition: 0.33s;
}
.appear-enter-to {
  opacity: 1;
}
.appear-enter,
.appear-leave-to {
  opacity: 0;
}

.side-menu {
  z-index: 100;
}

.side-menu .section {
  @apply flex flex-col px-4 py-3 border-b border-gray-200;
}

.side-menu .section .header {
  @apply text-xs tracking-widest uppercase text-gray-500;
}

.side-menu .section a {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;

  @apply rounded-full;
  margin-left: -100px;
  padding-left: 100px;

  transition: background 0.1s;
}

.side-menu .section a:active {
  @apply bg-gray-200;
}
</style>
