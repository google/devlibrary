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
  <div class="flex flex-col">
    <!-- Card -->
    <div
      class="flex-grow flex flex-col rounded-lg border border-gray-200 transition-shadow hover:shadow overflow-hidden p-4"
    >
      <!-- Author photo and name -->
      <div class="flex flex-row items-center">
        <img
          v-if="authorId"
          class="avatar mr-2 rounded-full"
          :src="authorPhotoUrl"
        />

        <div
          v-else
          class="avatar mr-2 bg-gray-200 text-gray-400 rounded-full flex flex-row items-center justify-center"
        >
          <font-awesome-icon icon="user" />
        </div>

        <span class="font-display text-lg">{{ blog.metadata.author }}</span>

        <ProductLogo
          v-if="showLogo"
          size="xtiny"
          :productKey="blog.product"
          class="ml-auto"
        />
      </div>

      <!-- Title -->
      <div class="mt-4 font-display text-2xl">
        {{ blog.metadata.title }}
      </div>

      <!-- Tags -->
      <div
        v-if="showTags"
        class="mt-4 flex flex-row flex-wrap gap-2 overflow-hidden items-center"
      >
        <TagChip
          v-for="t in blog.metadata.tags"
          :key="t"
          :label="getTag(t).label"
          :textColor="getTag(t).textColor"
          :bgColor="getTag(t).bgColor"
        />
      </div>

      <span class="flex-grow"><!-- Spacer --></span>

      <!-- Timestamp -->
      <div class="mt-4 flex flex-row text-sm items-center gap-1 text-gray-600">
        <font-awesome-icon
          :icon="['fas', 'book']"
          size="lg"
          class="mr-1 text-gray-500"
        />
        <span>Blog</span>
        <span>•</span>
        <span class="flex-grow"
          >Updated {{ renderDaysAgo(blog.stats.lastUpdated) }}</span
        >
      </div>

      <!-- Button -->
      <div class="mt-6 flex flex-row-reverse">
        <a :href="blog.metadata.link" target="_blank"
          ><MaterialButton type="secondary"> Read post </MaterialButton></a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BlogData } from "../../../shared/types";

import MaterialButton from "@/components/MaterialButton.vue";
import TagChip from "@/components/TagChip.vue";
import ProductLogo from "@/components/ProductLogo.vue";

import * as dates from "@/plugins/dates";
import * as product from "@/model/product";
import { getApiHost } from "@/plugins/data";

@Component({
  components: {
    MaterialButton,
    TagChip,
    ProductLogo,
  },
})
export default class LargeBlogCard extends Vue {
  @Prop() blog!: BlogData;
  @Prop({ default: true }) showTags!: boolean;
  @Prop({ default: false }) showLogo!: boolean;

  public renderDaysAgo(lastUpdated: number) {
    return dates.renderDaysAgo(lastUpdated);
  }

  public getTag(value: string) {
    return product.getTag(this.blog.product, value);
  }

  get authorId() {
    if (
      this.blog.metadata.authorIds &&
      this.blog.metadata.authorIds.length > 0
    ) {
      return this.blog.metadata.authorIds[0];
    }

    return undefined;
  }

  get authorPhotoUrl() {
    if (this.authorId) {
      return `${getApiHost()}/api/authorPhoto?id=${this.authorId}`;
    }

    return undefined;
  }
}
</script>

<style scoped lang="postcss">
/** See: https://stackoverflow.com/a/13924997/324977 */
.wrap-lines-3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.avatar {
  width: 26px;
  height: 26px;
}
</style>

function getApiHost() { throw new Error("Function not implemented."); }
