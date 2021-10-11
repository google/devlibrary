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
    <div
      v-for="entry in entries"
      :key="entry.id"
      class="flex flex-row items-center mb-2"
    >
      <input
        type="radio"
        :id="entry.id"
        :name="prefix"
        :value="entry.value"
        v-model="choice"
        @input="onInput"
      />
      <label :for="entry.id" class="ml-2 text-sm">{{ entry.key }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export interface RadioGroupEntry {
  key: string;
  value: string;
  id: string;
}

@Component
export default class RadioGroup extends Vue {
  @Prop() prefix!: string;
  @Prop() keys!: string[];
  @Prop() values!: string[];

  private choice = "";
  public entries: RadioGroupEntry[] = [];

  mounted() {
    for (let i = 0; i < this.keys.length; i++) {
      const key = this.keys[i];
      const value = this.values[i];

      this.entries.push({
        key,
        value,
        id: this.valueId(value),
      });
    }

    // Default is the first entry
    this.choice = this.entries[0].value;
    this.emitValue(this.choice);
  }

  public onInput(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    if (value) {
      this.emitValue(value);
    }
  }

  /**
   * Emit the special 'input' event which allows us to use v-model on the group
   */
  public emitValue(value: string) {
    this.$emit("input", value);
  }

  public valueId(v: string) {
    return `${this.prefix}-${v}`;
  }
}
</script>

<style scoped lang="postcss">
input[type="radio"] {
  @apply w-4 h-4;
  @apply ml-px;
}
</style>
