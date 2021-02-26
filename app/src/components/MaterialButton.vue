<template>
  <button
    :class="classObj"
    :disabled="disable"
    class="cursor-pointer whitespace-pre rounded-sm uppercase text-sm px-3 py-2 shadow transition-shadow"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MaterialButton extends Vue {
  @Prop() type!: string;
  @Prop({ default: false }) disable!: boolean;

  get classObj() {
    const obj: Record<string, boolean> = {
      disabled: this.disable,
    };

    obj[this.type] = true;

    return obj;
  }
}
</script>

<style scoped lang="postcss">
.disabled {
  cursor: default !important;
}

.text.disabled {
  @apply opacity-50 cursor-pointer;
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

.secondary {
  @apply text-gray-800 bg-white;
}

.secondary:hover {
  @apply bg-gray-100 shadow-md;
}

.text {
  @apply text-gray-800 bg-none;
  @apply shadow-none;
}

.text:hover {
  background-color: rgba(17, 24, 39, 0.1);
}
</style>
