<template>
  <div>
    <!-- Special "All" checkbox which controls the others -->
    <div v-if="showAll" class="flex flex-row items-center">
      <input
        type="checkbox"
        v-model="allChecked"
        @input="emitValue"
        :id="valueId('all')"
      />
      <label :for="valueId('all')" class="ml-2 text-sm">All</label>
    </div>

    <div
      v-for="entry in entries"
      :key="entry.key"
      class="flex flex-row items-center"
    >
      <input
        type="checkbox"
        v-model="entry.checked"
        @input="emitValue"
        :disabled="allChecked"
        :id="entry.id"
      />
      <label :for="entry.id" class="ml-2 text-sm">{{ entry.key }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

export interface CheckboxGroupEntry {
  key: string;
  value: string;
  id: string;
  checked: boolean;
}

@Component
export default class CheckboxGroup extends Vue {
  /** Should the group have an "all" option */
  @Prop({ default: true }) showAll!: boolean;

  /** Unique string prefix for this form group */
  @Prop() prefix!: string;

  /** User-readable names for the options (ex: Android, Web) */
  @Prop() keys!: string[];

  /** Internal value for each key (ex: android, web) */
  @Prop() values!: string[];

  public allChecked = true;
  public entries: CheckboxGroupEntry[] = [];

  mounted() {
    for (let i = 0; i < this.keys.length; i++) {
      const key = this.keys[i];
      const value = this.values[i];

      this.entries.push({
        key,
        value,
        id: this.valueId(value),
        checked: true,
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

  @Watch("allChecked")
  public watchAllChecked() {
    if (this.allChecked) {
      for (const e of this.entries) {
        e.checked = true;
      }
    }
  }
}
</script>
