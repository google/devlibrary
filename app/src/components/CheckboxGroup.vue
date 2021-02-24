<template>
  <div>
    <div
      v-for="entry in entries"
      :key="entry.key"
      class="flex flex-row items-center"
    >
      <input
        type="checkbox"
        v-model="entry.checked"
        @input="emitValue"
        :id="entry.id"
      />
      <label :for="entry.id" class="ml-2 text-sm">{{ entry.key }}</label>
    </div>
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
