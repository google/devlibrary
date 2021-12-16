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
  <div class="info-circle relative">
    <font-awesome-icon
      icon="info-circle"
      class="text-gray-500 hover:text-gray-600 cursor-pointer"
      size="sm"
    />
    <div
      class="info-circle-msg bg-gray-700 text-white rounded shadow-sm text-xs font-normal max-w-md p-2"
    >
      {{ msg }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class InfoCircle extends Vue {
  @Prop() msg!: string;
}
</script>

<style scoped lang="postcss">
.info-circle-msg {
  display: none;
}

.info-circle:hover .info-circle-msg {
  position: absolute;
  display: block;
  width: max-content;
}
</style>
