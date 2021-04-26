<template>
  <img :src="src" class="border-white" :class="[size]" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CircleImage extends Vue {
  @Prop() size!: string;
  @Prop() src!: string;
}
</script>

<style scoped lang="postcss">
.tiny {
  @apply object-contain w-10 h-10 border-2 bg-white rounded-full;
}

.small {
  @apply object-contain w-12 h-12 border-2 bg-white rounded-full;
}

.large {
  @apply object-contain w-36 h-36 border-4 bg-white rounded-full;
}
</style>
