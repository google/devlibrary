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
      <div class="mt-2 flex flex-row items-center">
        <img
          class="avatar mr-2 rounded-full"
          :src="`https://avatars.githubusercontent.com/${repo.metadata.owner}`"
        />
        <span class="font-display text-lg">{{ repo.metadata.owner }}</span>
      </div>

      <!-- Title -->
      <div class="mt-4 font-display text-2xl">
        {{ repo.metadata.repo }}
      </div>

      <!-- Tags -->
      <div
        v-if="showTags"
        class="mt-4 flex flex-row gap-2 overflow-hidden items-center"
      >
        <TagChip
          v-for="t in repo.metadata.tags"
          :key="t"
          :label="getTag(t).label"
          :textColor="getTag(t).textColor"
          :bgColor="getTag(t).bgColor"
        />
      </div>

      <!-- Description -->
      <div class="mt-4 flex-grow wrap-lines-3">
        {{ repo.metadata.longDescription }}
      </div>

      <!-- Timestamp -->
      <div class="mt-4 flex flex-row text-sm items-center gap-1 text-gray-600">
        <font-awesome-icon :icon="['fab', 'github']" size="lg" class="mr-1" />
        <span>GitHub</span>
        <span>•</span>
        <span class="flex-grow"
          >Updated {{ renderDaysAgo(repo.stats.lastUpdated) }}</span
        >
      </div>

      <!-- Button -->
      <div class="mt-6 flex flex-row-reverse">
        <router-link :to="link"
          ><MaterialButton type="text">Learn More</MaterialButton></router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { RepoData } from "../../../shared/types";
import MaterialButton from "@/components/MaterialButton.vue";
import TagChip from "@/components/TagChip.vue";

import * as dates from "@/plugins/dates";
import * as product from "@/model/product";

@Component({
  components: {
    MaterialButton,
    TagChip,
  },
})
export default class LargeRepoCard extends Vue {
  @Prop() repo!: RepoData;
  @Prop({ default: true }) showTags!: boolean;

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
