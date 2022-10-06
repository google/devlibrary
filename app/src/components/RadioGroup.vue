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
    <!-- See: https://material.io/components/radio-buttons/web#radio-buttons -->
    <label
      class="mdc-form-field frc cursor-pointer"
      v-for="entry in entries"
      :for="entry.id"
      :key="entry.id"
    >
      <div class="mdc-radio">
        <input
          class="mdc-radio__native-control"
          type="radio"
          :id="entry.id"
          :name="prefix"
          :value="entry.value"
          v-model="choice"
          @input="onInput"
        />
        <div class="mdc-radio__background">
          <div class="mdc-radio__outer-circle"></div>
          <div class="mdc-radio__inner-circle"></div>
        </div>
      </div>
      <label class="text-sm">{{ entry.key }}</label>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { waitForMaterialStyles } from "@/plugins/preload";

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
  @Prop() value!: string;
  @Prop() startEmpty!: boolean;

  @Watch("value")
  public onValueChange(val: string) {
    this.choice = val;
    this.emitValue(val);
  }

  private choice = "";
  public entries: RadioGroupEntry[] = [];

  async mounted() {
    await waitForMaterialStyles();

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
    if (this.startEmpty === undefined || !this.startEmpty) {
      this.choice = this.entries[0].value;
      this.emitValue(this.choice);
    }
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

<style scoped lang="postcss"></style>
