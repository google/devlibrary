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
    <label
      v-for="entry in entries"
      :for="entry.id"
      :key="entry.key"
      class="flex flex-row items-center mb-2 cursor-pointer"
    >
      <input
        type="checkbox"
        class="mr-1"
        v-model="entry.checked"
        @input="emitValue"
        :id="entry.id"
      />
      <span class="ml-2 text-sm wrap-lines-1">{{ entry.key }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

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

  public entries: CheckboxGroupEntry[] = [];

  mounted() {
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
}
</script>

<style scoped lang="postcss">
input[type="checkbox"] {
  @apply rounded-sm;
  @apply w-4 h-4;
  @apply ml-px;
  @apply flex-shrink-0;
}
</style>
