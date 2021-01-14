<template>
  <div id="app">
    <NavBar class="z-10 relative" />
    <router-view class="z-0 relative" :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";

@Component({
  components: {
    NavBar,
  },
})
export default class App extends Vue {}
</script>

<style lang="postcss">
body {
  @apply text-gray-800;
}
</style>
