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
  <router-link
    tag="div"
    :to="`/products/${productKey}`"
    class="cursor-pointer flex-shrink-0"
    :class="[size]"
  >
    <img :src="`/logos/${productKey}.png`" />
  </router-link>
</template>

<script lang="ts">
import { getStyle } from "@/model/product";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ProductLogo extends Vue {
  @Prop() productKey!: string;
  @Prop() size!: string;

  get productStyle() {
    return getStyle(this.productKey);
  }
}
</script>

<style scoped lang="postcss">
.xxtiny {
  @apply w-5 h-5 bg-white rounded-full;
}

.xtiny {
  @apply w-8 h-8 bg-white rounded-full;
}

.tiny {
  @apply w-10 h-10 bg-white rounded-full;
}

.small {
  @apply w-12 h-12 bg-white rounded-full;
}

.medium {
  @apply w-16 h-16 bg-white rounded-full;
}

.large {
  @apply w-32 h-32 bg-white rounded-full;
}
</style>
