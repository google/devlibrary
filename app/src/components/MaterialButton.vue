<template>
  <button
    :class="type"
    class="cursor-pointer rounded-sm uppercase text-sm px-3 py-2 shadow"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MaterialButton extends Vue {
  @Prop() type!: string;
}
</script>

<style scoped lang="postcss">
.primary {
  @apply text-white bg-blue-500;
}

.primary:hover {
  @apply bg-blue-600;
}

.secondary {
  @apply text-gray-800 bg-white;
}

.secondary:hover {
  @apply bg-gray-100;
}

.text {
  @apply text-gray-800 bg-none;
  @apply shadow-none;
}

.text:hover {
  background-color: rgba(17, 24, 39, 0.1);
}
</style>
