<!--
 Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <HeaderBodyLayout
    style="
      --header-bg-image-desktop: url('/img/banners/desktop/author-wide.png');
      --header-bg-image-mobile: url('/img/banners/mobile/author-wide.png');
    "
  >
    <template v-if="loaded" v-slot:header>
      <!-- Header (Mobile) -->
      <div class="mobile-only header-image py-6">
        <div class="flex flex-col items-center gap-2">
          <CircleImage
            class="border-white"
            size="medium"
            :src="author.metadata.photoURL"
          />

          <!-- Name and bio -->
          <div class="px-6 py-2 text-center max-w-lg">
            <h3>
              {{ author.metadata.name }}
            </h3>
            <p class="text-sm mt-2">
              {{ bio }}
            </p>
          </div>

          <!-- Info card -->
          <div class="px-6 w-full flex flex-row justify-center">
            <AuthorExpertiseCard
              v-if="loaded"
              class="w-full"
              :expertise="expertise"
              :author="author"
            />
          </div>
        </div>
      </div>

      <!-- Header (Desktop) -->
      <div class="desktop-only header-image">
        <div class="py-10 grid grid-cols-12 gap-4 px-std">
          <!-- Photo, name, and bio -->
          <div class="col-span-9">
            <div class="flex flex-row gap-8 items-center">
              <CircleImage
                class="border-none"
                size="large"
                :src="author.metadata.photoURL"
              />

              <div>
                <h1>
                  {{ author.metadata.name }}
                </h1>
                <p class="mt-2 max-w-xl">{{ bio }}</p>
              </div>
            </div>
          </div>

          <!-- Info card -->
          <AuthorExpertiseCard
            v-if="loaded"
            class="col-span-3"
            :expertise="expertise"
            :author="author"
          />
        </div>
      </div>
    </template>

    <!-- Body -->
    <div class="px-std mb-20">
      <div v-if="loaded">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Video Interview -->
          <iframe
            v-if="loaded && author.metadata.interviewVideoId"
            class="max-w-full rounded-lg overflow-hidden bg-gray-200"
            width="560"
            height="315"
            :src="`https://www.youtube.com/embed/${author.metadata.interviewVideoId}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <!-- Projects-->
          <RepoOrBlogCard
            v-for="project in projects"
            :key="project.data.id"
            :project="project"
            :showLogo="true"
            :showTags="false"
          />
        </div>
      </div>
    </div>
  </HeaderBodyLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import UIModule from "@/store/ui";

import MaterialButton from "@/components/MaterialButton.vue";
import RepoOrBlogCard from "@/components/RepoOrBlogCard.vue";
import HeaderBodyLayout from "@/components/HeaderBodyLayout.vue";
import CircleImage from "@/components/CircleImage.vue";
import AuthorExpertiseCard from "@/components/AuthorExpertiseCard.vue";

import {
  fetchAuthor,
  queryAuthorProjects,
  wrapInHolders,
} from "@/plugins/data";
import { AuthorData, BlogData, RepoData } from "../../../shared/types";

@Component({
  components: {
    MaterialButton,
    RepoOrBlogCard,
    HeaderBodyLayout,
    CircleImage,
    AuthorExpertiseCard,
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

    // Re-route to the lowercase author ID
    if (this.id !== this.id.toLowerCase()) {
      this.$router.push(`/authors/${this.id.toLowerCase()}`);
      return;
    }

    this.uiModule.waitFor(this.loadContent());
  }

  public async loadContent() {
    const author = await fetchAuthor(this.id);
    if (!author) {
      this.$router.push("/404");
      return;
    }
    const { blogs, repos } = await queryAuthorProjects(this.id);

    this.blogs = blogs.docs.map((d) => d.data);
    this.repos = repos.docs.map((d) => d.data);
    this.author = author;
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

  get expertise() {
    const blogProducts = this.blogs.map((b) => b.product);
    const repoProducts = this.repos.map((r) => r.product);
    return Array.from(new Set([...blogProducts, ...repoProducts])).sort();
  }

  get projects() {
    return wrapInHolders(this.blogs, this.repos).sort((a, b) => {
      return b.data.stats.dateAdded - a.data.stats.dateAdded;
    });
  }
}
</script>

<style scoped lang="postcss"></style>
