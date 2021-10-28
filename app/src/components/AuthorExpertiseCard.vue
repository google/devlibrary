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
  <div class="card bg-white max-w-lg flex flex-row lg:flex-col text-xs">
    <!-- Expertise -->
    <div
      class="flex-grow py-3 lg:py-4 px-3 lg:px-4 border-r lg:border-none border-gray-200"
    >
      <p class="mb-1 uppercase font-medium">Expertise</p>
      <div v-for="p in expertise" :key="p" class="mt-2 frc">
        <ProductLogo
          :productKey="p"
          class="filter grayscale mr-2"
          size="xxtiny"
        />
        {{ getProductName(p) }}
      </div>
    </div>

    <!-- Connect -->
    <div class="flex-grow py-3 lg:py-4 px-3 lg:px-4">
      <p class="mb-1 uppercase font-medium">Connect</p>
      <div v-if="author.metadata.githubURL" class="mt-2 frc">
        <font-awesome-icon
          :icon="['fab', 'github']"
          fixed-width
          class="mr-2 text-lg opacity-60"
        />
        <a :href="author.metadata.githubURL" target="_blank">
          <span class="mobile-only">GitHub</span>
          <span class="desktop-only">{{ author.metadata.githubURL }}</span>
        </a>
      </div>
      <div v-if="author.metadata.mediumURL" class="mt-2 frc truncate">
        <font-awesome-icon
          :icon="['fab', 'medium']"
          fixed-width
          class="mr-2 text-lg opacity-60"
        />
        <a :href="author.metadata.mediumURL" target="_blank">
          <span class="mobile-only">Medium</span>
          <span class="desktop-only">{{ author.metadata.mediumURL }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import ProductLogo from "@/components/ProductLogo.vue";

import { ALL_PRODUCTS } from "../../../shared/product";
import { AuthorData } from "../../../shared/types";

@Component({
  components: {
    ProductLogo,
  },
})
export default class AuthorExpertiseCard extends Vue {
  @Prop() author!: AuthorData;
  @Prop() expertise!: string[];

  public getProductName(productId: string) {
    return ALL_PRODUCTS[productId].name;
  }
}
</script>

<style scoped lang="postcss"></style>
