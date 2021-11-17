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
  <img
    :src="src"
    :class="[size]"
    :loading="lazy ? 'lazy' : 'eager'"
    class="flex-shrink-0 bg-white overflow-hidden object-contain rounded-full"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CircleImage extends Vue {
  @Prop() size!: string;
  @Prop() src!: string;
  @Prop({ default: false }) lazy!: boolean;
}
</script>

<style scoped lang="postcss">
.xsmall {
  @apply w-5 h-5;
}

.card-avatar {
  @apply w-6 h-6;
}

.small {
  @apply w-12 h-12 border-2;
}

.medium {
  @apply w-20 h-20 border-2;
}

.large {
  @apply w-36 h-36 border-4;
}
</style>
