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
  <LargeRepoCard
    v-if="project.type === 'repo'"
    :key="project.data.id"
    :repo="project.data"
    :showTags="showTags"
    :showLogo="showLogo"
  />

  <LargeBlogCard
    v-else-if="project.type === 'blog'"
    :key="project.data.id"
    :blog="project.data"
    :showTags="showTags"
    :showLogo="showLogo"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BlogOrRepoDataHolder } from "../../../shared/types";

import LargeBlogCard from "@/components/LargeBlogCard.vue";
import LargeRepoCard from "@/components/LargeRepoCard.vue";

@Component({
  components: {
    LargeBlogCard,
    LargeRepoCard,
  },
})
export default class RepoOrBlogCard extends Vue {
  @Prop() project!: BlogOrRepoDataHolder;
  @Prop({ default: true }) showTags!: boolean;
  @Prop({ default: false }) showLogo!: boolean;
}
</script>

<style scoped lang="postcss"></style>
