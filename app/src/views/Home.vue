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
      class="header-image grid grid-cols-12 py-8 lg:py-10 xl:py-12 px-std border-b border-gray-100"
      style="
        --header-bg-image-desktop: url('/img/banners/desktop/home-wide.png');
        --header-bg-image-mobile: url('/img/banners/mobile/home-wide.png');
      "
    >
      <div class="col-span-12 lg:col-span-5 px-1">
        <h1>What will you build?</h1>

        <div>
          <!-- Right-padding added on mobile to improve text flow -->
          <p class="mt-4 lg:mt-6 pr-4 lg:pr-0">
            Welcome to Dev Library - a showcase of open-source projects and blog
            posts built with Google technologies. Created by you, curated by
            Google engineers.
          </p>
          <div class="mt-4 lg:mt-6">
            <MaterialButton type="primary" @click.native="showSubmitDialog"
              >Submit</MaterialButton
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Products -->
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 py-6 px-std">
      <div
        v-for="p in products"
        :key="p.key"
        class="card px-3 lg:px-6 py-2 lg:py-6 flex flex-col"
      >
        <router-link :to="`/products/${p.key}`" class="frc">
          <ProductLogo
            :productKey="p.key"
            :size="$mq === 'mobile' ? 'xtiny' : 'tiny'"
            class="mr-3"
          />
          <h3 class="product-name">{{ p.name }}</h3>
        </router-link>
        <div class="desktop-only flex-grow">
          <div class="text-mgray-800 mt-3 wrap-lines-4">
            {{ p.description }}
          </div>
        </div>
        <div class="desktop-only mt-4">
          <router-link :to="`/products/${p.key}`" class="mr-auto">
            <MaterialButton type="secondary">Learn more</MaterialButton>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Newsletter banner -->
    <div class="w-full p-6 lg:p-10 bg-gblue-600">
      <h1 class="text-white text-center text-2xl lg:text-3xl">
        Subscribe to our newsletter to stay up to date:
      </h1>
      <div class="flex flex-row justify-center text-base mt-6 mb-2">
        <input
          class="flex-grow max-w-md rounded-sm px-2 mr-2"
          type="email"
          v-model="newsletterEmail"
          placeholder="Email Address"
        />
        <a :href="newsletterLink" target="_blank">
          <MaterialButton type="secondary">Subscribe</MaterialButton>
        </a>
      </div>
    </div>

    <!-- Recently Added projects -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-std py-8"
    >
      <div class="col-span-1 lg:col-span-2 lg:px-2">
        <h2>Recently Added</h2>
        <div class="desktop-only">
          <p class="text-mgray-800 font-sans text-sm mt-2 mb-4 lg:w-3/4">
            Check out the latest projects we've added to the Dev Library. To see
            all projects, choose one of the product areas below.
          </p>
          <div class="flex flex-row gap-1 mb-3">
            <div
              v-for="p in products"
              :key="p.key"
              class="rounded-lg p-1 hover:shadow hover:bg-gray-50 hover:border-gray-50 transition-all"
            >
              <ProductLogo :productKey="p.key" size="tiny" />
            </div>
          </div>
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
import { EVENT_BUS, NAME_SHOW_SUBMIT_DIALOG } from "@/plugins/events";

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

  public showSubmitDialog() {
    EVENT_BUS.$emit(NAME_SHOW_SUBMIT_DIALOG);
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
.product-name {
  @apply flex flex-row items-center;
  min-height: 3.75rem;
}

@screen sm {
  .product-name {
    min-height: 0;
  }
}
</style>
