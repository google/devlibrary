<template>
  <div class="flex flex-col">
    <!-- Card -->
    <div class="flex-grow flex flex-col rounded shadow-md overflow-hidden">
      <!-- GitHub Header -->
      <div class="bg-gray-900 text-white px-3 py-2">
        <font-awesome-icon :icon="['fab', 'github']" size="lg" class="mr-2" />
        <span>{{ project.metadata.owner }}</span>
      </div>

      <!-- Title and Stats -->
      <div class="mt-2 px-3 flex flex-row items-center">
        <span class="text-lg font-medium flex-grow">{{
          project.metadata.repo
        }}</span>
        <span class="ml-2 text-sm"
          >{{ project.stats.stars }}
          <font-awesome-icon class="ml-1" icon="star"
        /></span>
        <span class="ml-2 text-sm"
          >{{ project.stats.forks }}
          <font-awesome-icon class="ml-1" icon="code-branch"
        /></span>
      </div>

      <!-- Description -->
      <div class="flex-grow mt-2 px-3 wrap-lines-3">
        {{ project.metadata.longDescription }}
      </div>

      <!-- Timestamp and Button -->
      <div class="flex flex-row pl-3 mt-6 text-sm items-baseline">
        <span class="flex-grow text-gray-500"
          >updated {{ renderDaysAgo(project.stats.lastUpdated) }}</span
        >
        <router-link :to="link"
          ><MaterialButton type="text">Learn More</MaterialButton></router-link
        >
      </div>
    </div>

    <!-- Card tags -->
    <div class="mt-2 flex flex-row items-center">
      <TagChip v-for="t in project.metadata.tags" :key="t" :name="t" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { GitHubProject } from "../../../shared/types";
import MaterialButton from "@/components/MaterialButton.vue";
import TagChip from "@/components/TagChip.vue";

import * as dates from "@/plugins/dates";

@Component({
  components: {
    MaterialButton,
    TagChip,
  },
})
export default class LargeRepoCard extends Vue {
  @Prop() link!: string;
  @Prop() project!: GitHubProject;

  public renderDaysAgo(lastUpdated: number) {
    return dates.renderDaysAgo(lastUpdated);
  }
}
</script>

<style scoped lang="postcss">
/** See: https://stackoverflow.com/a/13924997/324977 */
.wrap-lines-3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
