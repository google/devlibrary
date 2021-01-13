<template>
  <div>
    <div
      v-for="(value, i) in values"
      :key="value"
      class="flex flex-row items-center"
    >
      <input
        type="radio"
        :id="prefixedValue(value)"
        :name="prefixedValue(value)"
        :value="value"
      />
      <label :for="prefixedValue(value)" class="ml-2 text-sm">{{
        keys[i]
      }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RadioGroup extends Vue {
  @Prop() prefix!: string;
  @Prop() keys!: string[];
  @Prop() values!: string[];

  public prefixedValue(v: string) {
    return `${this.prefix}-${v}`;
  }
}
</script>
