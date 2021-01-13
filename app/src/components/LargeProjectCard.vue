<template>
  <div>
    <div class="rounded shadow-md overflow-hidden">
      <div class="bg-gray-900 text-white px-3 py-2">
        <font-awesome-icon :icon="['fab', 'github']" size="lg" class="mr-2" />
        <span>GitHub · fladle</span>
      </div>
      <div class="p-3">
        <div class="flex flex-row">
          <span class="text-lg flex-grow">flank</span>
          <span class="ml-2">123 <font-awesome-icon class="ml-1" icon="star" /></span>
          <span class="ml-2">456 <font-awesome-icon class="ml-1" icon="code-branch" /></span>
        </div>
        <div class="mt-2">
          The best foo to bar your bazzes with! Check out this library if you need to bar any bazzes.
          This will really solve the problem and there is a lot more text on this form of the card
        </div>
        <div class="flex flex-row mt-6 text-sm">
          <span class="flex-grow text-gray-500">updated 8 days ago</span>
          <span class="uppercase cursor-pointer hover:underline">Learn More</span>
        </div>
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
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SmallProjectCard extends Vue {
}
</script>

<style scoped lang="postcss">
</style>
