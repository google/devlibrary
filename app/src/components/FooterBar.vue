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
  <div
    class="relative text-sm text-mgray-700 border-t border-gray-100 px-std lg:px-8 py-4 bg-white"
  >
    <div class="frc justify-center lg:justify-start">
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
