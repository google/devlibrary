<template>
  <div class="flex flex-row rounded overflow-hidden shadow">
    <div class="px-2 flex flex-col justify-center text-white bg-gray-900">
      <font-awesome-icon :icon="['fab', 'github']" size="lg" />
    </div>

    <div class="flex-grow py-2 px-3">
      <div class="flex flex-row items-baseline">
        <span class="flex-grow text-lg">{{ project.metadata.repo }}</span>
        <span class="text-sm">{{ project.stats.stars }}</span>
        <font-awesome-icon icon="star" size="sm" class="ml-1 text-yellow-400" />
      </div>
      <!-- TODO: This cutoff behavior is bad and looks ugly -->
      <div class="pt-1 pb-4 overflow-ellipsis whitespace-nowrap">
        {{ project.metadata.shortDescription }}
      </div>
      <div class="flex flex-row items-baseline">
        <span class="flex-grow text-xs">updated 8 hours ago</span>
        <!-- TODO: Link to the real project page -->
        <router-link
          to="/projects/firebaseui-android"
          class="text-sm uppercase cursor-pointer hover:underline"
          >Learn More</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GitHubProject } from "@/model/project";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SmallProjectCard extends Vue {
  @Prop() project!: GitHubProject;
}
</script>

<style scoped lang="postcss"></style>
