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
  <div class="relative fill-height lg:grid lg:grid-cols-12 gap-0">
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

<style scoped lang="postcss">
.fill-height {
  min-height: 100vh;
}
</style>
