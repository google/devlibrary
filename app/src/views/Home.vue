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
            Welcome to Dev Library, a showcase of what developers like you have
            built with Google technologies. Browse and learn, or
            <a
              class="underline"
              href="https://forms.gle/E54pxK3JzpXMGyqN7"
              target="_blanke"
              >submit your own!</a
            >
          </p>
        </div>

        <div class="lg:text-lg">
          <div class="mt-4 lg:mt-10">
            Subscribe to our newsletter to stay up to date:
            <div class="flex flex-row mt-2 text-base">
              <input
                class="flex-grow rounded shadow-inner border border-gray-200 px-2 mr-2"
                type="email"
                v-model="newsletterEmail"
                placeholder="Enter your email address..."
              />
              <a :href="newsletterLink" target="_blank">
                <MaterialButton type="primary"> Subscribe </MaterialButton>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <!-- 1-col spacer -->
      </div>

      <div class="col-span-4 hidden lg:block">
        <img src="@/assets/LibraryGoogleDev-Header.svg" />
      </div>

      <div class="col-span-2"><!-- Gutter --></div>
    </div>

    <div class="pt-4 pb-10 lg:pb-20">
      <!-- Iterate over each product -->
      <div
        class="home-grid-base"
        v-show="hasContent"
        v-for="p in products"
        :key="p.key"
      >
        <div
          class="desktop-only lg:flex flex-row-reverse col-start-1 col-span-1"
        >
          <ProductLogo class="mt-8" size="small" :productKey="p.key" />
        </div>

        <div class="flex flex-row mt-8 col-span-7 lg:col-span-11">
          <ProductLogo
            class="mobile-only mr-2"
            size="small"
            :productKey="p.key"
          />
          <div>
            <router-link
              :to="`/products/${p.key}`"
              class="font-display text-2xl"
              >{{ p.name }}</router-link
            >
            <p class="text-gray-500">Recently Added</p>
          </div>
        </div>

        <div class="col-start-1 col-span-8 lg:col-start-2 lg:col-span-10">
          <div class="home-grid-projects">
            <SmallRepoCard
              v-for="repo in recentRepos[p.key]"
              :key="repo.id"
              :repo="repo"
            />

            <SmallBlogCard
              v-for="blog in recentBlogs[p.key]"
              :key="blog.id"
              :blog="blog"
            />
          </div>
        </div>

        <div
          :key="p.key"
          class="col-span-8 lg:col-start-2 lg:col-span-10 flex flex-row-reverse"
        >
          <router-link :to="`/products/${p.key}`"
            ><MaterialButton type="text"
              >All {{ p.name }} Projects</MaterialButton
            ></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import MaterialButton from "@/components/MaterialButton.vue";
import SmallRepoCard from "@/components/SmallRepoCard.vue";
import SmallBlogCard from "@/components/SmallBlogCard.vue";
import ProductLogo from "@/components/ProductLogo.vue";

import UIModule from "@/store/ui";

import { queryRepos, queryBlogs, shuffleArr } from "@/plugins/data";

import { ALL_PRODUCTS } from "../../../shared/product";
import { BlogData, RepoData } from "../../../shared/types";
import { FirestoreQuery } from "../../../shared/types/FirestoreQuery";

@Component({
  components: {
    MaterialButton,
    SmallRepoCard,
    SmallBlogCard,
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
    limit: 10,
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

    // We take the most recent 10, shuffle, and pick 2. That way the
    // most recent additions don't get stuck on the homepage.
    const recentRepos = shuffleArr(docs).slice(0, 2);
    Vue.set(this.recentRepos, product, recentRepos);
  }

  public async fetchRecentBlogs(product: string) {
    const res = await queryBlogs(product, this.RECENTLY_ADDED_QUERY);
    const docs = res.docs.map((d) => d.data);

    // We take the most recent 10, shuffle, and pick 2. That way the
    // most recent additions don't get stuck on the homepage.
    const recentBlogs = shuffleArr(docs).slice(0, 2);
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

.home-grid-projects {
  @apply grid gap-4;
  @apply grid-cols-1 lg:grid-cols-2;
}
</style>
