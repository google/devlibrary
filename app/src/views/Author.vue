<template>
  <HeaderSidebarLayout>
    <template v-if="loaded" v-slot:header>
      <!-- Header (Mobile) -->
      <div class="mobile-only">
        <div
          class="mobile-only flex flex-row gap-4 items-center px-6 py-4 bg-gray-500"
        >
          <CircleImage size="small" :src="author.metadata.photoURL" />
          <div class="text-white">
            <h1 class="text-2xl">
              {{ author.metadata.name }}
            </h1>
            <p class="text-xs">
              {{ bio }}
            </p>
          </div>
        </div>
      </div>

      <!-- Header (Desktop) -->
      <div class="desktop-only">
        <div class="py-20 grid grid-cols-10 bg-gray-500">
          <div class="col-start-2 col-span-8 flex flex-row gap-8 items-center">
            <CircleImage size="large" :src="author.metadata.photoURL" />
            <div class="text-white">
              <h1 class="text-3xl font-semibold">
                {{ author.metadata.name }}
              </h1>
              <p class="mt-2 max-w-xl">{{ bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="loaded" v-slot:sidebar>
      <!-- Side bar -->
      <div>
        <p class="uppercase font-medium mt-4 mb-2">Links</p>
        <ul>
          <li
            v-if="author.metadata.githubURL"
            class="flex items-center hover:text-blue-500"
          >
            <a :href="author.metadata.githubURL" target="_blank">GitHub</a>
            <font-awesome-icon
              icon="external-link-alt"
              size="xs"
              class="ml-2"
            />
          </li>
          <li
            v-if="author.metadata.mediumURL"
            class="flex items-center hover:text-blue-500"
          >
            <a :href="author.metadata.mediumURL" target="_blank">Medium</a>
            <font-awesome-icon
              icon="external-link-alt"
              size="xs"
              class="ml-2"
            />
          </li>
        </ul>
      </div>
    </template>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-20">
      <div class="col-span-10 px-6 lg:px-0 lg:col-start-2 lg:col-span-8">
        <!-- Open Source -->
        <div id="opensource" v-if="repos.length > 0">
          <h2 class="text-2xl mt-8">Open Source</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LargeRepoCard
              class="mt-4"
              v-for="repo in repos"
              :key="repo.id"
              :repo="repo"
            />
          </div>
        </div>

        <!-- Blog Posts -->
        <div id="blogposts" v-if="blogs.length > 0">
          <h2 class="text-2xl mt-8">Blog Posts</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LargeBlogCard
              class="mt-4"
              v-for="blog in blogs"
              :key="blog.id"
              :blog="blog"
            />
          </div>
        </div>
      </div>
    </div>
  </HeaderSidebarLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import UIModule from "@/store/ui";

import MaterialButton from "@/components/MaterialButton.vue";
import LargeRepoCard from "@/components/LargeRepoCard.vue";
import LargeBlogCard from "@/components/LargeBlogCard.vue";
import HeaderSidebarLayout from "@/components/HeaderSidebarLayout.vue";
import CircleImage from "@/components/CircleImage.vue";

import { fetchAuthor, queryAuthorProjects } from "@/plugins/data";
import { AuthorData, BlogData, RepoData } from "../../../shared/types";

@Component({
  components: {
    MaterialButton,
    LargeRepoCard,
    LargeBlogCard,
    HeaderSidebarLayout,
    CircleImage,
  },
})
export default class Author extends Vue {
  private uiModule = getModule(UIModule, this.$store);

  public id!: string;
  public author: AuthorData | null = null;

  public blogs: BlogData[] = [];
  public repos: RepoData[] = [];

  mounted() {
    this.id = this.$route.params["author"];
    this.uiModule.waitFor(this.loadContent());
  }

  public async loadContent() {
    const author = await fetchAuthor(this.id);
    const { blogs, repos } = await queryAuthorProjects(this.id);

    this.author = author;
    this.blogs = blogs.docs.map((d) => d.data);
    this.repos = repos.docs.map((d) => d.data);
  }

  get loaded() {
    return this.author != null;
  }

  get bio() {
    if (this.author) {
      if (this.author.metadata.bio.length > 0) {
        return this.author.metadata.bio;
      }
    }

    return "Dev Library contributor";
  }
}
</script>

<style scoped lang="postcss"></style>
