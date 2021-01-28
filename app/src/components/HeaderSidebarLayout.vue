<template>
  <div class="relative lg:grid lg:grid-cols-12 gap-0">
    <!-- Side bar -->
    <div class="desktop-only lg:col-span-2 bg-gray-50 py-10 px-10">
      <slot name="sidebar"></slot>
    </div>

    <div class="lg:col-span-10">
      <!-- Header -->
      <div>
        <slot name="header"></slot>
      </div>

      <!-- Body -->
      <div class="mb-20">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class HeaderSidebarLayout extends Vue {}
</script>

<style scoped lang="postcss"></style>
