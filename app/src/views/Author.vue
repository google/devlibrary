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
  <HeaderBodyLayout>
    <template v-if="loaded" v-slot:header>
      <!-- Header (Mobile) -->
      <div class="mobile-only">
        <div
          class="mobile-only flex flex-col gap-4 items-center px-6 py-6 text-center"
        >
          <CircleImage
            class="border-white"
            size="medium"
            :src="author.metadata.photoURL"
          />
          <div>
            <h1 class="text-xl">
              {{ author.metadata.name }}
            </h1>
            <p class="text-sm">
              {{ bio }}
            </p>
          </div>
        </div>
      </div>

      <!-- Header (Desktop) -->
      <div class="desktop-only">
        <div class="pt-20 pb-10 grid grid-cols-10 gap-4">

          <!-- Photo, name, and bio -->
          <div class="col-start-2 col-span-5">
            <div class="flex flex-row gap-8 items-center">
              <CircleImage
                class="border-none"
                size="large"
                :src="author.metadata.photoURL"
              />

              <div>
                <h1 class="text-3xl font-semibold">
                  {{ author.metadata.name }}
                </h1>
                <p class="mt-2 max-w-xl">{{ bio }}</p>
              </div>
            </div>
          </div>

          <!-- Info card -->
          <div
            v-if="loaded"
            class="col-span-3 px-6 py-6 rounded-lg border border-gray-200 flex flex-col text-xs"
          >
            <p class="mb-1 uppercase font-medium">Expertise</p>
            <div
              v-for="p in expertise"
              :key="p"
              class="mt-2 flex flex-row items-center"
            >
              <ProductLogo
                :productKey="p"
                class="filter grayscale mr-2"
                size="xtiny"
              />
              {{ getProductName(p) }}
            </div>

            <p class="mt-8 mb-1 uppercase font-medium">Connect</p>
            <div
              v-if="author.metadata.githubURL"
              class="mt-2 flex flex-row items-center"
            >
              <font-awesome-icon
                :icon="['fab', 'github']"
                fixed-width
                class="mr-2 text-lg opacity-60"
              />
              <a :href="author.metadata.githubURL" target="_blank">{{
                author.metadata.githubURL
              }}</a>
            </div>
            <div
              v-if="author.metadata.mediumURL"
              class="mt-2 flex flex-row items-center truncate"
            >
              <font-awesome-icon
                :icon="['fab', 'medium']"
                fixed-width
                class="mr-2 text-lg opacity-60"
              />
              <a :href="author.metadata.mediumURL" target="_blank">{{
                author.metadata.mediumURL
              }}</a>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-20">
      <div class="col-span-10 px-6 lg:px-0 lg:col-start-2 lg:col-span-8">
        <div v-if="loaded">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <!-- Video Interview -->
            <iframe
              v-if="loaded && author.metadata.interviewVideoId"
              class="max-w-full rounded-lg overflow-hidden"
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
import ProductLogo from "@/components/ProductLogo.vue";

import {
  fetchAuthor,
  queryAuthorProjects,
  wrapInHolders,
} from "@/plugins/data";
import { AuthorData, BlogData, RepoData } from "../../../shared/types";
import { ALL_PRODUCTS } from "../../../shared/product";

@Component({
  components: {
    MaterialButton,
    RepoOrBlogCard,
    HeaderBodyLayout,
    CircleImage,
    ProductLogo,
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

  public getProductName(productId: string) {
    return ALL_PRODUCTS[productId].name;
  }
}
</script>

<style scoped lang="postcss"></style>
