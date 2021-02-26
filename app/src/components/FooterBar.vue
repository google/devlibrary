<template>
  <div
    class="relative text-sm text-gray-700 border-t border-gray-100 px-4 lg:px-8 py-4 bg-white"
  >
    <div class="flex flex-row items-center">
      <router-link to="/about">About</router-link>
      <span class="mx-2">·</span>
      <a href="https://developers.google.com/terms/site-terms">Terms</a>
      <span class="mx-2">·</span>
      <a href="https://policies.google.com/privacy">Privacy</a>
      <span class="mx-2">·</span>
      <a href="https://forms.gle/2JoN6csvyvnDC8Nd9">Feedback</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FooterBar extends Vue {
  public showProductsDropdown = false;
}
</script>

<style scoped lang="postcss"></style>
