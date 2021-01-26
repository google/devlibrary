<template>
  <span>
    <div
      :class="[colorClass]"
      class="inline-block ml-3 mr-1 h-3 w-3 rounded-full"
    ></div>
    <span class="text-gray-500">{{ displayName }}</span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

const KNOWN_COLORS: Record<string, string> = {
  android: "bg-green-500",
  web: "bg-purple-500",
  ios: "bg-blue-500",
  node: "bg-yellow-500",
};

@Component
export default class TagChip extends Vue {
  @Prop() name!: string;

  get colorClass() {
    const lower = this.name.toLowerCase();
    if (KNOWN_COLORS[lower]) {
      return KNOWN_COLORS[lower];
    }

    return "bg-gray-500";
  }

  get displayName() {
    const lower = this.name.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
}
</script>
