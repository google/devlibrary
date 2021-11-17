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
    tag="span"
    :to="`/authors/${author.id}`"
    :key="author.id"
    class="ifrc gap-2 cursor-pointer text-sm font-display pl-2 pr-2 py-1 border rounded-full hover:shadow"
  >
    <CircleImage size="xsmall" :lazy="true" :src="author.metadata.photoURL" />
    <span>{{ author.metadata.name }}</span>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import CircleImage from "@/components/CircleImage.vue";
import { AuthorData } from "../../../shared/types";

@Component({
  components: {
    CircleImage,
  },
})
export default class AuthorLink extends Vue {
  @Prop() author!: AuthorData;
}
</script>

<style scoped lang="postcss"></style>
