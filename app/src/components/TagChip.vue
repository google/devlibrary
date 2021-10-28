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
  <div class="bg-gray-100 frc rounded-sm px-2 py-1" :class="[bgColor]">
    <span
      class="text-gray-500 whitespace-nowrap text-sm"
      :class="[textColor]"
      >{{ label }}</span
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TagChip extends Vue {
  @Prop() label!: string;
  @Prop() textColor!: string;
  @Prop() bgColor!: string;
}
</script>
