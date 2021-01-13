<template>
  <button
    :class="type" 
    class="cursor-pointer rounded-sm uppercase text-sm p-3 shadow mr-2">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

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

</style>
