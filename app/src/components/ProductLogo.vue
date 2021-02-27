<template>
  <router-link
    tag="div"
    :to="`/products/${productKey}`"
    class="cursor-pointer"
    :class="[product.classes.iconBorder, size]"
  >
    <img :src="`/logos/${product.key}.png`" />
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ALL_PRODUCTS } from "@/model/product";

@Component
export default class ProductLogo extends Vue {
  @Prop() productKey!: string;
  @Prop() size!: string;

  get product() {
    return ALL_PRODUCTS[this.productKey];
  }
}
</script>

<style scoped lang="postcss">
.tiny {
  @apply p-1 w-10 h-10 border-2 bg-white rounded-full;
}

.small {
  @apply p-1 w-12 h-12 border-2 bg-white rounded-full;
}

.large {
  @apply p-4 w-36 h-36 border-4 bg-white rounded-full;
}
</style>
