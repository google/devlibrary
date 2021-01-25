<template>
  <div class="flex flex-col">
    <!-- Card -->
    <div class="flex-grow flex flex-col rounded shadow-md overflow-hidden">
      <!-- author / medium header -->
      <div class="bg-gray-200 text-black px-3 py-2">
        <font-awesome-icon :icon="['fab', 'medium']" size="lg" class="mr-2" />
        <span>{{ blog.metadata.author }}</span>
      </div>

      <!-- blog nam -->

      <div class="flex flex-row mt-2 px-3">
        <span class="text-lg font-medium flex-grow wrap-lines-3">
          {{ blog.metadata.title }}</span
        >
      </div>

      <!-- link and time to read -->

      <div class="flex flex-row pl-3 mt-6 text-sm items-baseline">
        <span class="flex-grow text-gray-500">
          {{ blog.stats.minutes }} mins Read</span
        >
        <span
          ><MaterialButton type="text">
            <a v-bind:href="blog.metadata.link" target="blank">
              Read more</a
            ></MaterialButton
          ></span
        >
      </div>
    </div>

    <div class="mt-2 flex flex-row items-center text-gray-500">
      <div class="inline-block ml-3 h-3 w-3 bg-green-500 rounded-full"></div>
      <span class="ml-1">Android</span>
      <div class="inline-block ml-3 h-3 w-3 bg-purple-500 rounded-full"></div>
      <span class="ml-1">Web</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BlogData } from "@/model/blog";
// import { GitHubProject } from "@/model/project";
import MaterialButton from "@/components/MaterialButton.vue";
/*
TODO: Add small project card if it needs to be displayed on home page
export default class LargeBlogCard extends Vue {
  @Prop() project!: Blog;
}
*/
@Component({
  components: {
    MaterialButton,
  },
})
export default class LargeBlogCard extends Vue {
  @Prop() blog!: BlogData;
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
