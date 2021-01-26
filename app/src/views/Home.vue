<template>
  <div>
    <div
      class="home-grid-base py-10 lg:py-10 bg-gray-50 border-b border-gray-100"
    >
      <div class="col-span-8 lg:col-start-3 lg:col-span-4 mt-10">
        <h1 class="text-2xl lg:text-3xl font-display font-semibold">
          What will <span class="underline">you</span> build?
        </h1>

        <div class="mt-10 lg:text-lg">
          <p>
            Welcome to ugc.dev, a showcase of what developers like you have
            built with Google technologies
          </p>
          <p class="mt-2">Browse and learn, or submit your own!</p>
        </div>

        <div class="mt-8">
          <MaterialButton type="primary" class="mr-2">Explore</MaterialButton>
          <MaterialButton type="secondary">
            <a href="https://forms.gle/E54pxK3JzpXMGyqN7" target="blank">
              SUBMIT</a
            ></MaterialButton
          >
        </div>
      </div>

      <div class="col-span-4 hidden lg:block">
        <img src="@/assets/undraw_connected_world_wuay.svg" />
      </div>

      <div class="col-span-2"><!-- Gutter --></div>
    </div>

    <div class="home-grid-base pt-4 pb-10 lg:pb-20">
      <!-- TODO: Make a component for this? -->
      <div class="hidden lg:flex flex-row-reverse col-start-1 col-span-1">
        <div
          class="mt-8 p-1 w-12 h-12 border-4 border-firebase-accent rounded-full"
        >
          <img src="@/assets/logos/firebase.png" />
        </div>
      </div>

      <div class="mt-8 col-span-7 lg:col-span-11">
        <p class="font-display text-2xl">Firebase</p>
        <p class="text-gray-500">Trending Now</p>
      </div>

      <div class="col-start-1 col-span-8 lg:col-start-2 lg:col-span-10">
        <div class="home-grid-projects">
          <SmallProjectCard
            v-for="project in projects"
            :key="project.name"
            :project="project"
          />
        </div>
      </div>

      <div
        class="col-span-8 lg:col-start-2 lg:col-span-10 flex flex-row-reverse"
      >
        <router-link to="/products/firebase"
          ><MaterialButton type="text"
            >All Firebase Projects</MaterialButton
          ></router-link
        >
      </div>

      <div class="hidden lg:flex flex-row-reverse col-start-1 col-span-1">
        <div class="mt-8 w-12 h-12 p-1 border-ml-accent border-4 rounded-full">
          <img src="@/assets/logos/ml.png" />
        </div>
      </div>

      <div class="mt-8 col-span-7 lg:col-span-11">
        <p class="font-display text-2xl">Machine Learning</p>
        <p class="text-gray-500">Trending Now</p>
      </div>

      <div
        class="home-grid-projects col-start-1 col-span-8 lg:col-start-2 lg:col-span-10"
      >
        <SmallProjectCard
          v-for="project in projects"
          :key="project.name"
          :project="project"
        />
      </div>

      <div
        class="col-span-8 lg:col-start-2 lg:col-span-10 flex flex-row-reverse"
      >
        <router-link to="/products/ml"
          ><MaterialButton type="text"
            >All ML Projects</MaterialButton
          ></router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import MaterialButton from "@/components/MaterialButton.vue";
import SmallProjectCard from "@/components/SmallProjectCard.vue";

import ProjectsModule from "@/store/project";

@Component({
  components: {
    MaterialButton,
    SmallProjectCard,
  },
})
export default class Home extends Vue {
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

<style scoped lang="postcss">
.home-grid-base {
  @apply grid gap-4;
  @apply grid-cols-8 px-8;
  @apply lg:grid-cols-12 lg:px-0;
}

.home-grid-projects {
  @apply grid gap-4;
  @apply grid-cols-1 lg:grid-cols-2;
}
</style>
