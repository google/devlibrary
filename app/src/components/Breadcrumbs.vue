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
  <nav class="px-std py-3">
    <ol class="flex flex-wrap gap-2 text-sm">
      <li>
        <a class="text-gray-400 hover:underline" href="/">Dev Library</a>
      </li>
      <template v-for="(link, index) in links">
        <li :key="`s-${index}`" aria-hidden="true">
          <font-awesome-icon icon="chevron-right" class="pb-0.5" size="sm" />
        </li>
        <li :key="index" class="last:text-mgray-800 text-gray-400">
          <a class="hover:underline" :href="link.path">
            {{ link.name }}
          </a>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BreadcrumbLink } from "../../../shared/types";

@Component
export default class Breadcrumbs extends Vue {
  @Prop() links!: BreadcrumbLink[];
}
</script>

<style scoped lang="postcss"></style>
