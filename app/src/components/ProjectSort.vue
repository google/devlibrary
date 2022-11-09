<!--
 Copyright 2022 Google LLC

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
  <div class="flex flex-col bg-white relative">
    <div class="ml-6 mdc-menu-surface--anchor">
      <MaterialButton class="text-left" @click.native="menu.open = true">
        Sort by: {{ sortLabelMap.get(sortBy) }}
        <font-awesome-icon icon="chevron-down" size="sm" />
      </MaterialButton>
      <div ref="mdcMenu" class="mdc-menu mdc-menu-surface w-full">
        <ul
          class="mdc-list font-display text-sm"
          role="menu"
          aria-hidden="true"
          aria-orientation="vertical"
          tabindex="-1"
        >
          <li
            v-for="item in sortLabelMap.keys()"
            :id="`sort-${item}`"
            :key="item"
            @click="sortBy = item"
            role="menuitem"
            class="mdc-list-item px-7 py-2 whitespace-nowrap"
          >
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">{{
              sortLabelMap.get(item)
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import MaterialButton from "@/components/MaterialButton.vue";
import { ProductConfig } from "../../../shared/types";
import { MDCMenu, Corner } from "@material/menu";

export const SORT_UPDATED = "updated";
export const SORT_ADDED = "added";
export const SORT_STARS = "stars";

@Component({
  components: {
    MaterialButton,
  },
})
export default class ProjectFilters extends Vue {
  @Prop() product!: ProductConfig;
  @Prop({ default: false }) mobile!: boolean;
  @Prop() defaultSort!: string;

  public sortLabelMap = new Map([
    [SORT_UPDATED, "Recently Updated"],
    [SORT_ADDED, "Recently Added"],
    [SORT_STARS, "GitHub Stars"],
  ]);
  public menu?: MDCMenu;
  public sortBy = this.defaultSort ?? SORT_UPDATED;

  mounted() {
    this.menu = new MDCMenu(this.$refs.mdcMenu as Element);
    this.menu.setAnchorCorner(Corner.BOTTOM_LEFT);
  }

  @Watch("sortBy")
  public onValueChange() {
    this.$emit("input", this.sortBy);
  }
}
</script>

<style scoped lang="postcss"></style>
