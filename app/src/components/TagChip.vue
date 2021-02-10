<template>
  <span>
    <div
      :class="[tag.color]"
      class="inline-block ml-3 mr-1 h-3 w-3 rounded-full"
    ></div>
    <span class="text-gray-500">{{ tag.key }}</span>
  </span>
</template>

<script lang="ts">
import { ProductTag } from "@/model/product";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TagChip extends Vue {
  @Prop() tag!: ProductTag;
}
</script>
