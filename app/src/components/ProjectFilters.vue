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
    <div class="rounded-lg border border-gray-200 flex-shrink">
      <div
        class="px-5 py-4 uppercase text-gray-500 font-medium text-xs tracking-widest"
      >
        Filters
      </div>

      <div class="border-t px-4 py-3">
        <p class="font-display font-medium text-sm mb-4">Sort</p>

        <RadioGroup
          prefix="sort"
          :keys="['Recently Updated', 'Recently Added']"
          :values="['updated', 'added']"
          v-model="sort"
        />
      </div>

      <div class="border-t px-4 py-3">
        <p class="font-display font-medium text-sm mb-4">Type</p>

        <CheckboxGroup
          prefix="type"
          :keys="['Open Source', 'Blog Posts']"
          :values="['open-source', 'blog']"
          v-model="types"
        />
      </div>

      <div class="border-t px-4 py-3">
        <p class="font-display font-medium text-sm mb-4">Category</p>

        <CheckboxGroup
          prefix="category"
          :keys="product.tags.map((t) => t.label)"
          :values="product.tags.map((t) => t.value)"
          v-model="categories"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import RadioGroup from "@/components/RadioGroup.vue";
import CheckboxGroup, {
  CheckboxGroupEntry,
} from "@/components/CheckboxGroup.vue";
import { ProductConfig } from "../../../shared/types";

@Component({
  components: {
    RadioGroup,
    CheckboxGroup,
  },
})
export default class ProjectFilters extends Vue {
  @Prop() product!: ProductConfig;

  public sort = "updated";
  public types: CheckboxGroupEntry[] = [];
  public categories: CheckboxGroupEntry[] = [];

  get value() {
    return {
      sort: this.sort,
      types: this.types,
      categories: this.categories,
    };
  }

  @Watch("value")
  public onValueChange() {
    this.$emit("input", this.value);
  }
}
</script>
