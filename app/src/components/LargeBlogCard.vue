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
      class="flex-grow flex flex-col rounded shadow transition-shadow hover:shadow-lg overflow-hidden"
    >
      <!-- author / medium header -->
      <div class="bg-gray-200 text-black px-3 py-2">
        <font-awesome-icon :icon="['far', 'bookmark']" size="lg" class="mr-2" />
        <span>{{ blog.metadata.author }}</span>
      </div>

      <!-- blog name -->
      <div class="flex-grow flex flex-row mt-2 px-3">
        <a
          :href="blog.metadata.link"
          target="_blank"
          class="text-lg font-medium flex-grow wrap-lines-3"
        >
          {{ blog.metadata.title }}</a
        >
      </div>

      <!-- link and time to read -->
      <div class="flex flex-row pl-3 mt-6 text-sm items-baseline">
        <span class="flex-grow"><!-- spacer --></span>
        <a :href="blog.metadata.link" target="_blank"
          ><MaterialButton type="text">
            Read Post
            <font-awesome-icon
              icon="external-link-alt"
              class="ml-1"
              size="sm"
            /> </MaterialButton
        ></a>
      </div>
    </div>

    <!-- Card tags -->
    <div class="mt-2 flex flex-row items-center">
      <TagChip
        v-for="t in blog.metadata.tags"
        :key="t"
        :label="getTag(t).label"
        :color="getTag(t).color"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BlogData } from "../../../shared/types";
import MaterialButton from "@/components/MaterialButton.vue";
import TagChip from "@/components/TagChip.vue";
import * as product from "@/model/product";

@Component({
  components: {
    MaterialButton,
    TagChip,
  },
})
export default class LargeBlogCard extends Vue {
  @Prop() blog!: BlogData;

  public getTag(value: string) {
    return product.getTag(this.blog.product, value);
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
</style>
