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
  <div class="flex flex-col card card-clickable p-4">
    <!-- Author photo and name -->
    <div class="frc">
      <CircleImage
        :lazy="true"
        size="card-avatar"
        class="mr-2"
        :src="`https://avatars.githubusercontent.com/${repo.metadata.owner}`"
      />
      <span class="font-display text-lg">{{ repo.metadata.owner }}</span>

      <ProductLogo
        v-if="showLogo"
        size="xtiny"
        :productKey="repo.product"
        class="ml-auto"
      />
    </div>

    <!-- Title -->
    <router-link :to="link" class="mt-4 wrap-lines-3">
      <h3>{{ repo.metadata.repo }}</h3>
    </router-link>

    <!-- Tags -->
    <div v-if="showTags" class="mt-4 frc flex-wrap gap-2">
      <TagChip
        v-for="t in repo.metadata.tags"
        :key="t"
        :label="getTag(t).label"
        :textColor="getTag(t).textColor"
        :bgColor="getTag(t).bgColor"
      />
    </div>

    <!-- Description -->
    <div class="mt-4 wrap-lines-3">
      {{ repo.metadata.longDescription }}
    </div>

    <div class="flex-grow"><!-- spacer --></div>

    <!-- Timestamp -->
    <div class="mt-4 frc text-sm gap-1 text-mgray-700">
      <font-awesome-icon :icon="['fab', 'github']" size="lg" class="mr-1" />
      <span>GitHub</span>
      <span>•</span>
      <span class="flex-grow wrap-lines-1"
        >Updated {{ renderDaysAgo(repo.stats.lastUpdated) }}</span
      >
    </div>

    <!-- Button -->
    <div class="mt-6 flex flex-row-reverse">
      <router-link :to="link"
        ><MaterialButton type="secondary"
          >Learn more</MaterialButton
        ></router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { RepoData } from "../../../shared/types";

import MaterialButton from "@/components/MaterialButton.vue";
import TagChip from "@/components/TagChip.vue";
import ProductLogo from "@/components/ProductLogo.vue";
import CircleImage from "@/components/CircleImage.vue";

import * as dates from "@/plugins/dates";
import * as product from "@/model/product";

@Component({
  components: {
    MaterialButton,
    TagChip,
    ProductLogo,
    CircleImage,
  },
})
export default class LargeRepoCard extends Vue {
  @Prop() repo!: RepoData;
  @Prop({ default: true }) showTags!: boolean;
  @Prop({ default: false }) showLogo!: boolean;

  public renderDaysAgo(lastUpdated: number) {
    return dates.renderDaysAgo(lastUpdated);
  }

  public getTag(value: string) {
    return product.getTag(this.repo.product, value);
  }

  get link() {
    return `/products/${this.repo.product}/repos/${this.repo.id}`;
  }
}
</script>

<style scoped lang="postcss"></style>
