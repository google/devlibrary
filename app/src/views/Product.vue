<template>
<div class="grid grid-cols-12 gap-0">
  <!-- Side bar -->
  <div class="col-span-2 bg-gray-50 py-10 px-10">
    <p class="uppercase font-medium mt-4 mb-2">Sort</p>

    <RadioGroup 
      prefix="sort" 
      :keys="['Recently Updated', 'Most Popular', 'Trending Now']" 
      :values="['updated', 'popular', 'trending']" />

    <p class="uppercase font-medium mt-4 mb-2">Type</p>

    <CheckboxGroup 
      prefix="type" 
      :keys="['All', 'Open Source', 'Blog Posts']" 
      :values="['all', 'open-source', 'blog']" />

    <p class="uppercase font-medium mt-4 mb-2">Category</p>

    <CheckboxGroup 
      prefix="category" 
      :keys="['All', 'Android', 'iOS', 'Web', 'Games', 'Admin']" 
      :values="['all', 'android', 'ios', 'web', 'games', 'admin']" />
  </div>

  <div class="col-span-10">
    <!-- Header -->
    <div class="bg-firebase-bg py-20 grid grid-cols-10 gap-4">
      <div class="col-start-2 col-span-5 text-white">
        <h1 class="font-display text-3xl font-semibold">Firebase</h1>
        <p class="mt-2">Firebase helps you build and run successful apps.</p>
        <p class="mt-2">Backed by Google and loved by app development teams - from startups to global enterprises.</p>
        <MaterialButton type="secondary" class="mt-8">
          Official Docs <font-awesome-icon icon="external-link-alt" class="ml-1" />
        </MaterialButton>
      </div>

      <div class="col-start-8 col-span-2">
        <div class="w-2/3 p-4 border-firebase-accent border-4 bg-white rounded-full">
          <img src="@/assets/logos/firebase.png" />
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-20">
      <div class="col-start-2 col-span-8">
        <p class="font-display text-2xl mt-8">Open Source</p>

        <div class="grid grid-cols-2 gap-4">
          <LargeProjectCard class="mt-4" />
          <LargeProjectCard class="mt-4" />

          <LargeProjectCard class="mt-4" />
          <LargeProjectCard class="mt-4" />
        </div>

        <p class="font-display text-2xl mt-8">Blog Posts</p>

        <div class="grid grid-cols-2 gap-4">
          <LargeProjectCard class="mt-4" />
          <LargeProjectCard class="mt-4" />

          <LargeProjectCard class="mt-4" />
          <LargeProjectCard class="mt-4" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MaterialButton from "@/components/MaterialButton.vue";
import LargeProjectCard from "@/components/LargeProjectCard.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import CheckboxGroup from "@/components/CheckboxGroup.vue";

@Component({
  components: {
    MaterialButton,
    LargeProjectCard,
    RadioGroup,
    CheckboxGroup
  },
})
export default class Product extends Vue {}
</script>

<style scoped lang="postcss">
</style>
