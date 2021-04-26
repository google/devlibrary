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
  <img :src="src" class="border-white" :class="[size]" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CircleImage extends Vue {
  @Prop() size!: string;
  @Prop() src!: string;
}
</script>

<style scoped lang="postcss">
.tiny {
  @apply object-contain w-10 h-10 border-2 bg-white rounded-full;
}

.small {
  @apply object-contain w-12 h-12 border-2 bg-white rounded-full;
}

.large {
  @apply object-contain w-36 h-36 border-4 bg-white rounded-full;
}
</style>
