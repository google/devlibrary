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
  <div>
    <div
      id="header"
      class="home-grid-base py-8 lg:py-10 bg-gray-50 border-b border-gray-100"
    >
      <div class="col-span-8 lg:col-start-2 lg:col-span-4 lg:mt-10">
        <h1 class="text-2xl lg:text-3xl font-semibold">
          What will <span class="underline">you</span> build?
        </h1>

        <div class="lg:text-lg">
          <p class="mt-4 lg:mt-10">
            Welcome to Dev Library, a platform to showcase the projects and
            articles that developers have built with Google technologies.
            Browse, learn, or submit your own!
          </p>
          <a
            class="inline-block mt-4 lg:mt-10"
            href="https://forms.gle/E54pxK3JzpXMGyqN7"
            target="_blanke"
          >
            <MaterialButton type="primary">Submit</MaterialButton>
          </a>
        </div>
      </div>

      <div>
        <!-- 1-col spacer -->
      </div>

      <div class="col-span-4 hidden lg:block">
        <img src="/img/LibraryGoogleDev-Header.svg" />
      </div>

      <div class="col-span-2"><!-- Gutter --></div>
    </div>

    <!-- Products -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 py-6 px-8">
      <div
        v-for="p in products"
        :key="p.key"
        class="border border-gray-200 rounded-lg p-6 flex flex-col"
      >
        <div class="flex flex-row items-center">
          <ProductLogo
            :productKey="p.key"
            size="small"
            class="p-0 border-none mr-2"
          />
          <span class="font-display text-lg">{{ p.name }}</span>
        </div>
        <div class="text-gray-800 mt-3 flex-grow wrap-lines-4">
          {{ p.description }}
        </div>
        <router-link :to="`/products/${p.key}`">
          <MaterialButton type="secondary" class="mt-4 mr-auto"
            >Learn more</MaterialButton
          >
        </router-link>
      </div>
    </div>

    <!-- Newsletter banner -->
    <div
      class="w-full p-10 bg-blue-600 text-white flex flex-col lg:items-center"
    >
      <h2 class="text-2xl">Subscribe to our newsletter to stay up to date</h2>
      <div class="flex flex-row w-3/4 md:w-1/2 text-base mt-6 mb-2">
        <input
          class="flex-grow rounded-sm shadow-inner border border-gray-200 px-2 mr-2"
          type="email"
          v-model="newsletterEmail"
          placeholder="Email address..."
        />
        <a :href="newsletterLink" target="_blank">
          <MaterialButton type="secondary">Subscribe</MaterialButton>
        </a>
      </div>
    </div>

    <!-- Recently Added projects -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-8">
      <div class="col-span-1 lg:col-span-2 px-2">
        <h2 class="text-2xl">Recently Added</h2>
        <p class="text-gray-800 font-sans text-sm mt-2 mb-4 lg:w-3/4">
          Check out the latest projects we've added to the Dev Library. To see
          all projects, choose one of the product areas below.
        </p>
        <div class="flex flex-row gap-2 mt-2 mb-4">
          <ProductLogo
            v-for="p in products"
            :key="p.key"
            :productKey="p.key"
            size="tiny"
          />
        </div>
      </div>
      <RepoOrBlogCard
        v-for="p in recentProjects"
        :key="p.id"
        :project="p"
        :showLogo="true"
        :showTags="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import MaterialButton from "@/components/MaterialButton.vue";
import LargeRepoCard from "@/components/LargeRepoCard.vue";
import LargeBlogCard from "@/components/LargeBlogCard.vue";
import RepoOrBlogCard from "@/components/RepoOrBlogCard.vue";
import ProductLogo from "@/components/ProductLogo.vue";

import UIModule from "@/store/ui";

import {
  queryRepos,
  queryBlogs,
  shuffleArr,
  wrapInHolders,
} from "@/plugins/data";

import { ALL_PRODUCTS } from "../../../shared/product";
import { BlogData, RepoData } from "../../../shared/types";
import { FirestoreQuery } from "../../../shared/types/FirestoreQuery";

@Component({
  components: {
    MaterialButton,
    LargeRepoCard,
    LargeBlogCard,
    RepoOrBlogCard,
    ProductLogo,
  },
})
export default class Home extends Vue {
  private uiModule = getModule(UIModule, this.$store);

  public recentBlogs: Record<string, BlogData[]> = {};
  public recentRepos: Record<string, RepoData[]> = {};

  public newsletterEmail = "";

  private RECENTLY_ADDED_QUERY: FirestoreQuery = {
    orderBy: [
      {
        fieldPath: "stats.dateAdded",
        direction: "desc",
      },
    ],
    limit: 5,
  };

  mounted() {
    const promises: Promise<unknown>[] = [];

    // For each product load 2 recent repos and 2 recent blogs
    // TODO: One day this should use Firestore bundles
    for (const product of Object.values(ALL_PRODUCTS)) {
      const blogPromise = this.fetchRecentBlogs(product.key);
      const repoPromise = this.fetchRecentRepos(product.key);
      promises.push(blogPromise, repoPromise);
    }

    this.uiModule.waitFor(Promise.all(promises));
  }

  public async fetchRecentRepos(product: string) {
    const res = await queryRepos(product, this.RECENTLY_ADDED_QUERY);
    const docs = res.docs.map((d) => d.data);

    // We take the most recent 10, shuffle, and pick 3. That way the
    // most recent additions don't get stuck on the homepage.
    const recentRepos = shuffleArr(docs).slice(0, 3);
    Vue.set(this.recentRepos, product, recentRepos);
  }

  public async fetchRecentBlogs(product: string) {
    const res = await queryBlogs(product, this.RECENTLY_ADDED_QUERY);
    const docs = res.docs.map((d) => d.data);

    // We take the most recent 10, shuffle, and pick 3. That way the
    // most recent additions don't get stuck on the homepage.
    const recentBlogs = shuffleArr(docs).slice(0, 3);
    Vue.set(this.recentBlogs, product, recentBlogs);
  }

  get hasContent() {
    const hasRepos = Object.values(this.recentRepos).some(
      (arr) => arr.length > 0
    );
    const hasBlogs = Object.values(this.recentBlogs).some(
      (arr) => arr.length > 0
    );

    return hasRepos && hasBlogs;
  }

  get products() {
    return Object.values(ALL_PRODUCTS).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  get productsRandomized() {
    // Calculate the day of the year:
    // https://stackoverflow.com/a/8619946/324977
    const now = new Date();
    const diff = now.getTime() - new Date(now.getFullYear(), 0, 0).getTime();
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));

    const configs = Object.values(ALL_PRODUCTS);

    // Use the day of the year to change the order of product display
    const startInd = day % configs.length;
    return [...configs.slice(startInd), ...configs.slice(0, startInd)];
  }

  get recentProjects() {
    const allRepos = Object.values(this.recentRepos).flatMap((arr) => arr);
    const allBlogs = Object.values(this.recentBlogs).flatMap((arr) => arr);

    const projects = wrapInHolders(allBlogs, allRepos);

    // Add 30m of jitter so that the exact time the server added this doesn't
    // matter so much.
    for (const p of projects) {
      p.data.stats.dateAdded +=
        Math.random() * 1000 * 60 * 15 * Math.round(Math.random() - 1);
    }

    return projects
      .sort((a, b) => {
        return b.data.stats.dateAdded - a.data.stats.dateAdded;
      })
      .slice(0, 14);
  }

  get loading() {
    return this.uiModule.loading;
  }

  get newsletterLink() {
    return `https://docs.google.com/forms/d/e/1FAIpQLSemI2L4-6KCt0Pbze4sxBMLjXdo8Q3YukHg_dSEhdgb9njtgQ/viewform?usp=pp_url&entry.174388885=${this.newsletterEmail}`;
  }
}
</script>

<style scoped lang="postcss">
.home-grid-base {
  @apply grid gap-4;
  @apply grid-cols-8 px-8;
  @apply lg:grid-cols-12 lg:px-0;
}
</style>
