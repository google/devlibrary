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
    class="flex flex-row rounded overflow-hidden shadow transition-shadow hover:shadow-lg"
  >
    <!-- Medium Sidebar -->
    <div class="px-2 flex flex-col justify-center bg-gray-200 text-black">
      <font-awesome-icon :icon="['fab', 'medium']" size="lg" />
    </div>

    <div class="pt-1 flex-grow flex flex-col">
      <!-- Top Section -->
      <div class="flex-grow px-3 mb-4">
        <!-- Title and Description -->
        <a :href="blog.metadata.link" target="_blank">
          <div class="text-base">
            <div class="font-medium">{{ blog.metadata.author }}</div>
            <div class="wrap-lines-1">
              {{ blog.metadata.title }}
            </div>
          </div>
        </a>
      </div>

      <!-- Timestamp and Buttons -->
      <div class="flex flex-row pl-3 items-baseline">
        <span class="flex-grow"><!-- spacer --></span>
        <a :href="blog.metadata.link" target="_blank"
          ><MaterialButton type="text"
            >Read Post
            <font-awesome-icon
              icon="external-link-alt"
              class="ml-1"
              size="sm"
            /> </MaterialButton
        ></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { BlogData } from "../../../shared/types";
import MaterialButton from "@/components/MaterialButton.vue";

import * as dates from "@/plugins/dates";

@Component({
  components: {
    MaterialButton,
  },
})
export default class SmallBlogCard extends Vue {
  @Prop() blog!: BlogData;

  public renderDaysAgo(lastUpdated: number) {
    return dates.renderDaysAgo(lastUpdated);
  }
}
</script>

<style scoped lang="postcss">
.card-top-grid {
  @apply gap-2;
  display: grid;
  grid-template-columns: 1fr min-content;
}

.wrap-lines-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
