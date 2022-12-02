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
  <div>
    <!-- See: https://material.io/components/checkboxes/web#checkboxes -->
    <label
      v-for="entry in entries"
      :for="entry.id"
      :key="entry.key"
      class="mdc-form-field frc cursor-pointer"
    >
      <div class="mdc-checkbox">
        <input
          type="checkbox"
          class="mdc-checkbox__native-control"
          v-model="entry.checked"
          @input="emitValue"
          :id="entry.id"
          :disabled="!entry.checked && numChecked >= maxSelections"
        />
        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
            <path
              class="mdc-checkbox__checkmark-path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            />
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
      </div>
      <span class="text-sm wrap-lines-1">{{ entry.key }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { waitForMaterialStyles } from "@/plugins/preload";

export interface CheckboxGroupEntry {
  key: string;
  value: string;
  id: string;
  checked: boolean;
}

@Component
export default class CheckboxGroup extends Vue {
  /** Unique string prefix for this form group */
  @Prop() prefix!: string;

  /** User-readable names for the options (ex: Android, Web) */
  @Prop() keys!: string[];

  /** Internal value for each key (ex: android, web) */
  @Prop() values!: string[];

  /** Maximum number of selections allowed */
  @Prop({ default: 100 }) maxSelections!: number;

  @Prop() value!: string;

  @Watch("value", { deep: true })
  public onValueChange(val: any) {
    this.entries = val;
    this.emitValue();
  }

  public entries: CheckboxGroupEntry[] = [];

  async mounted() {
    await waitForMaterialStyles();

    for (let i = 0; i < this.keys.length; i++) {
      const key = this.keys[i];
      const value = this.values[i];

      this.entries.push({
        key,
        value,
        id: this.valueId(value),
        checked: false,
      });
    }

    this.emitValue();
  }

  public valueId(v: string) {
    return `${this.prefix}-${v}`;
  }

  /**
   * Emit the special 'input' event which allows us to use v-model on the group
   */
  public emitValue() {
    this.$emit("input", this.entries);
  }

  get numChecked() {
    return this.entries.filter((e) => e.checked).length;
  }
}
</script>

<style scoped lang="postcss"></style>
