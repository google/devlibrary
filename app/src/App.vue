<template>
  <div id="app">
    <NavBar class="z-20 relative" />
    <ProgressBar class="z-10" />
    <router-view class="main-content z-0 relative" :key="$route.fullPath" />
    <CookieBar class="fixed z-10 bottom-0 left-0" />
    <FooterBar class="z-0" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import FooterBar from "@/components/FooterBar.vue";
import CookieBar from "@/components/CookieBar.vue";

@Component({
  components: {
    NavBar,
    ProgressBar,
    FooterBar,
    CookieBar,
  },
})
export default class App extends Vue {}
</script>

<style lang="postcss">
body {
  @apply text-gray-800;
}

.desktop-only {
  @apply hidden;
  @apply lg:block;
}

.mobile-only {
  @apply block;
  @apply lg:hidden;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-display;
}

.main-content {
  min-height: 100vh;
}
</style>
