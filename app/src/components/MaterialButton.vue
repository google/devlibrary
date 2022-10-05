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
  <button
    :class="type"
    class="materialbutton cursor-pointer whitespace-pre rounded font-display text-sm px-6 py-2 border border-gray-200 transition-colors"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MaterialButton extends Vue {
  @Prop() type!: string;
}
</script>

<style scoped lang="postcss">
.materialbutton:focus {
  outline: none;
}

.text.disabled:hover {
  background-color: unset !important;
}

.primary {
  @apply text-white bg-gblue-600 border-none;
  padding-block: 7px;
}

.primary:hover {
  @apply bg-gblue-700;
}

.primary:active {
  @apply bg-gblue-800;
}

.secondary {
  @apply text-gblue-600 bg-white;
}

.secondary:hover {
  @apply bg-gray-100;
}

.secondary:active {
  @apply bg-gray-200;
}

.text {
  @apply border-transparent border-none;
  @apply text-gblue-600 bg-none;
  @apply shadow-none;
}

.text:hover {
  @apply bg-gray-900 bg-opacity-10;
}

.text:active {
  @apply bg-gray-900 bg-opacity-20;
}
</style>
