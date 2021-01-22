<template>
  <HeaderSidebarLayout>
    <template v-slot:header>
      <!-- Header -->
      <div class="bg-firebase-bg py-20 grid grid-cols-10 gap-4">
        <div class="col-start-2 col-span-5 text-white">
          <h1 class="font-display text-3xl font-semibold">Firebase</h1>
          <p class="mt-2">Firebase helps you build and run successful apps.</p>
          <p class="mt-2">
            Backed by Google and loved by app development teams - from startups
            to global enterprises.
          </p>
          <MaterialButton type="secondary" class="mt-8">
            Official Docs
            <font-awesome-icon icon="external-link-alt" class="ml-1" />
          </MaterialButton>
        </div>

        <div class="col-start-8 col-span-2">
          <div
            class="w-2/3 p-4 border-firebase-accent border-4 bg-white rounded-full"
          >
            <img src="@/assets/logos/firebase.png" />
          </div>
        </div>
      </div>
    </template>

    <template v-slot:sidebar>
      <!-- Side bar -->
      <div>
        <p class="uppercase font-medium mt-4 mb-2">Sort</p>

        <RadioGroup
          prefix="sort"
          :keys="['Recently Updated', 'Most Popular', 'Trending Now']"
          :values="['updated', 'popular', 'trending']"
        />

        <p class="uppercase font-medium mt-4 mb-2">Type</p>

        <CheckboxGroup
          prefix="type"
          :keys="['All', 'Open Source', 'Blog Posts']"
          :values="['all', 'open-source', 'blog']"
        />

        <p class="uppercase font-medium mt-4 mb-2">Category</p>

        <CheckboxGroup
          prefix="category"
          :keys="['All', 'Android', 'iOS', 'Web', 'Games', 'Admin']"
          :values="['all', 'android', 'ios', 'web', 'games', 'admin']"
        />
      </div>
    </template>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-20">
      <div class="col-start-2 col-span-8">
        <h2 class="font-display text-2xl mt-8">Open Source</h2>

        <div class="grid grid-cols-2 gap-4">
          <LargeProjectCard
            class="mt-4"
            v-for="project in projects"
            :key="project.name"
            :project="project"
          />
        </div>

        <h2 class="font-display text-2xl mt-8">Blog Posts</h2>

        <div class="grid grid-cols-2 gap-4">
          <LargeProjectCard
            class="mt-4"
            v-for="project in projects"
            :key="project.name"
            :project="project"
          />
        </div>
      </div>
    </div>
  </HeaderSidebarLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import ProjectsModule from "@/store/project";

import MaterialButton from "@/components/MaterialButton.vue";
import LargeProjectCard from "@/components/LargeProjectCard.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import CheckboxGroup from "@/components/CheckboxGroup.vue";
import HeaderSidebarLayout from "@/components/HeaderSidebarLayout.vue";

@Component({
  components: {
    MaterialButton,
    LargeProjectCard,
    RadioGroup,
    CheckboxGroup,
    HeaderSidebarLayout,
  },
})
export default class Product extends Vue {
  private projectsModule = getModule(ProjectsModule, this.$store);

  mounted() {
    // Tell the store to load projects
    this.projectsModule.fetchProjects();
  }

  get projects() {
    return this.projectsModule.gitHubProjects;
  }
}
</script>

<style scoped lang="postcss"></style>
