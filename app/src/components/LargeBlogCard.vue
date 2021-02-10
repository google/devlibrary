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
          {{ blog.stats.minutes }} mins. read</span
        >
        <a :href="blog.metadata.link" target="blank"
          ><MaterialButton type="text">
            Read Post
            <font-awesome-icon
              icon="external-link-alt"
              class="ml-1"
              size="sm"
            /> </MaterialButton
        ></a>
      </div>
    </div>

    <!-- Card tags -->
    <div class="mt-2 flex flex-row items-center">
      <TagChip v-for="t in blog.metadata.tags" :key="t" :name="t" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BlogData } from "../../../shared/types";
import MaterialButton from "@/components/MaterialButton.vue";
import TagChip from "@/components/TagChip.vue";

@Component({
  components: {
    MaterialButton,
    TagChip,
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
