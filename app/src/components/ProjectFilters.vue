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
          <p class="font-display font-medium text-sm mb-2 px-2">
            Expertise Level
          </p>
          <RadioGroup
            prefix="expertiseLevel"
            :keys="['Beginner', 'Intermediate', 'Advanced']"
            :values="['Beginner', 'Intermediate', 'Advanced']"
            v-model="expertiseLevel"
            :start-empty="true"
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

          <!-- Clear Filters Button-->
          <div class="desktop-only">
            <div class="flex flex-row justify-center mt-4 lg:mt-6">
              <MaterialButton
                v-if="filtersChanged"
                type="text"
                @click.native="resetFilters()"
              >
                <div class="frc">
                  <span>Reset filters</span>
                </div>
              </MaterialButton>
            </div>
          </div>
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
import MaterialButton from "@/components/MaterialButton.vue";

@Component({
  components: {
    RadioGroup,
    CheckboxGroup,
    InfoCircle,
    MaterialButton,
  },
})
export default class ProjectFilters extends Vue {
  @Prop() product!: ProductConfig;
  @Prop({ default: false }) mobile!: boolean;
  @Prop() value!: { expertiseLevel: string | string[] };

  public types: CheckboxGroupEntry[] = [];
  public categories: CheckboxGroupEntry[] = [];
  public expertiseLevel = "";
  public filtersChanged = false;
  public defaultFilters = {
    expertiseLevel: "",
    types: [],
    categories: [],
  };
  public loaded = false;

  get filterValues() {
    return {
      expertiseLevel: this.expertiseLevel,
      types: this.types,
      categories: this.categories,
    };
  }

  public resetFilters() {
    this.expertiseLevel = this.defaultFilters.expertiseLevel;
    this.types = JSON.parse(JSON.stringify(this.defaultFilters.types));
    this.categories = JSON.parse(
      JSON.stringify(this.defaultFilters.categories)
    );
    this.filtersChanged = false;
  }

  @Watch("value", { deep: true })
  public onValueChange() {
    if (
      Array.isArray(this.value.expertiseLevel) &&
      this.value.expertiseLevel.length === 0
    ) {
      this.expertiseLevel = "";
    }
  }

  @Watch("filterValues", { deep: true })
  public onFilterValuesChange() {
    if (!this.loaded) {
      this.defaultFilters = JSON.parse(JSON.stringify(this.filterValues));
      this.loaded = true;
    }

    if (
      JSON.stringify(this.defaultFilters) != JSON.stringify(this.filterValues)
    ) {
      this.filtersChanged = true;
    } else {
      this.filtersChanged = false;
    }
    this.$emit("input", this.filterValues);
  }
}
</script>

<style scoped lang="postcss">
.desktop {
  @apply border-gray-200;
  position: sticky;
  top: 80px;
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
