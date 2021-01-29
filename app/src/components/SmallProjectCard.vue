<template>
  <div class="flex flex-row rounded overflow-hidden shadow">
    <!-- GitHub Sidebar -->
    <div class="px-2 flex flex-col justify-center text-white bg-gray-900">
      <font-awesome-icon :icon="['fab', 'github']" size="lg" />
    </div>

    <div class="pt-1 flex-grow flex flex-col">
      <!-- Top Section -->
      <div class="flex-grow card-top-grid pl-3 pr-2 mb-4">
        <!-- Title and Description -->
        <div class="text-base">
          <div class="font-medium">{{ project.metadata.repo }}</div>
          <div class="wrap-lines-1">
            {{ project.metadata.shortDescription }}
          </div>
        </div>

        <!-- Stats -->
        <div class="whitespace-nowrap">
          <span class="text-sm">{{ project.stats.stars }}</span>
          <font-awesome-icon icon="star" size="sm" class="ml-1" />
        </div>
      </div>

      <!-- Timestamp and Buttons -->
      <div class="flex flex-row pl-3 items-baseline">
        <span class="flex-grow text-sm text-gray-500"
          >updated {{ renderDaysAgo(project.stats.lastUpdated) }}</span
        >
        <!-- TODO: Link to the real project page -->
        <router-link to="/projects/firebaseui-android"
          ><MaterialButton type="text">Learn More</MaterialButton></router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { GitHubProject } from "../../../shared/types";
import MaterialButton from "@/components/MaterialButton.vue";

import * as dates from "@/plugins/dates";

@Component({
  components: {
    MaterialButton,
  },
})
export default class SmallProjectCard extends Vue {
  @Prop() project!: GitHubProject;

  public renderDaysAgo(lastUpdated: number) {
    return dates.renderDaysAgo(lastUpdated);
  }
}
</script>

<style scoped lang="postcss">
.card-top-grid {
  @apply gap-2;
  display: grid;
  grid-template-columns: 1fr min-content;
}

.wrap-lines-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
