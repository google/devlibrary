<!--
 Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <div id="app" class="flex flex-col">
    <div id="header-bar" class="z-20 sticky top-0">
      <NavBar class="z-20 relative" />
      <ProgressBar class="z-10" />
    </div>
    <router-view class="flex-grow z-0 relative" :key="$route.fullPath" />
    <SubmitDialog />
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
import SubmitDialog from "@/components/SubmitDialog.vue";

@Component({
  components: {
    NavBar,
    ProgressBar,
    FooterBar,
    CookieBar,
    SubmitDialog,
  },
})
export default class App extends Vue {}
</script>

<style lang="postcss"></style>
