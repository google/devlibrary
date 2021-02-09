<template>
  <div>
    <div
      v-for="entry in entries"
      :key="entry.id"
      class="flex flex-row items-center"
    >
      <input
        type="radio"
        :id="entry.id"
        :name="prefix"
        :value="entry.value"
        v-model="choice"
        @input="emitValue"
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

    this.emitValue();
  }

  /**
   * Emit the special 'input' event which allows us to use v-model on the group
   */
  public emitValue() {
    this.$emit("input", this.choice);
  }

  public valueId(v: string) {
    return `${this.prefix}-${v}`;
  }
}
</script>
