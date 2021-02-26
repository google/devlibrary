<template>
  <button
    :class="type"
    class="materialbutton cursor-pointer whitespace-pre rounded-sm uppercase text-sm px-3 py-2 shadow transition-shadow"
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
.materialbutton:focus {
  outline: none;
}

.text.disabled:hover {
  background-color: unset !important;
}

.primary {
  @apply text-white bg-blue-500;
}

.primary:hover {
  @apply bg-blue-600 shadow-md;
}

.primary:active {
  @apply bg-blue-700 shadow-sm;
}

.secondary {
  @apply text-gray-800 bg-white;
}

.secondary:hover {
  @apply bg-gray-100 shadow-md;
}

.secondary:active {
  @apply bg-gray-200 shadow-sm;
}

.text {
  @apply text-gray-800 bg-none;
  @apply shadow-none;
}

.text:hover {
  @apply bg-gray-900 bg-opacity-10;
}

.text:active {
  @apply bg-gray-900 bg-opacity-20;
}

.outlined {
  @apply text-blue-500 bg-none;
  @apply rounded border-2 border-blue-500;
  @apply shadow-none;
}

.outlined:hover {
  @apply bg-opacity-10 bg-blue-500;
}

.outlined:active {
  @apply bg-opacity-20 bg-blue-500;
}
</style>
