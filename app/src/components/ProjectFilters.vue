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
  <div class="flex flex-col bg-white" :class="{ mobile, desktop: !mobile }">
    <div class="rounded-lg flex-shrink" :class="{ border: !mobile }">
      <div
        class="px-5 py-4 uppercase border-b border-gray-200 text-gray-500 font-medium text-xs tracking-widest"
      >
        Filter By
      </div>

      <div class="sections">
        <div class="section">
          <p class="font-display font-medium text-sm mb-2 px-2">Sort</p>

          <RadioGroup
            prefix="sort"
            :keys="['Recently Updated', 'Recently Added']"
            :values="['updated', 'added']"
            v-model="sort"
          />
        </div>

        <div class="section">
          <p class="font-display font-medium text-sm mb-2 px-2">Type</p>

          <CheckboxGroup
            prefix="type"
            :keys="['Open Source', 'Blog Posts']"
            :values="['open-source', 'blog']"
            v-model="types"
          />
        </div>

        <div class="section">
          <p class="frc font-display font-medium text-sm mb-2 px-2">
            Category
            <InfoCircle class="ml-2" msg="Select up to 10 categories" />
          </p>

          <CheckboxGroup
            prefix="category"
            :keys="product.tags.map((t) => t.label)"
            :values="product.tags.map((t) => t.value)"
            v-model="categories"
            :maxSelections="10"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import RadioGroup from "@/components/RadioGroup.vue";
import InfoCircle from "@/components/InfoCircle.vue";
import CheckboxGroup, {
  CheckboxGroupEntry,
} from "@/components/CheckboxGroup.vue";
import { ProductConfig } from "../../../shared/types";

@Component({
  components: {
    RadioGroup,
    CheckboxGroup,
    InfoCircle,
  },
})
export default class ProjectFilters extends Vue {
  @Prop() product!: ProductConfig;
  @Prop({ default: false }) mobile!: boolean;

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

<style scoped lang="postcss">
.desktop {
  @apply border-gray-200;
}

.mobile .sections {
  overflow-y: scroll;
  max-height: 60vh;
}

.mobile {
  @apply border-transparent;
}

.section:not(:first-of-type) {
  @apply border-t;
}

.section {
  @apply px-2 py-3;
}
</style>
