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
      class="homepage-header header-image grid grid-cols-12 py-8 lg:pt-14 lg:pb-12 xl:pt-14 xl:pb-16 px-std border-b border-gray-100"
      style="
        --header-bg-image-desktop: url('/img/banners/desktop/home-wide.png');
        --header-bg-image-mobile: url('/img/banners/mobile/home-wide.png');
      "
    >
      <div class="col-span-12 lg:col-span-6 px-1">
        <h1 class="text-4xl">
          The platform for Google curated open-source projects
        </h1>

        <div>
          <!-- Right-padding added on mobile to improve text flow -->
          <p class="text-xl mt-9 mb-8 pr-4 lg:pr-0">
            Explore open-source projects and content featuring Google tools and
            technologies contributed by developers from around the world. Find
            the inspiration you need for your next project!
          </p>
          <div class="mt-4 lg:mt-6">
            <MaterialButton type="primary">
              <a href="#all-products" class="section">
                <span>Browse by product</span>
              </a>
            </MaterialButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Value Prop Cards -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16 px-std md:px-20 lg:px-32 xl:px-44 value-prop-cards"
    >
      <div
        class="card bg-white px-3 lg:px-6 py-2 lg:py-6 flex flex-col text-center items-center place-content-center"
      >
        <div class="value-prop-image">
          <img src="../../public/img/guided-learning.svg" class="w-1/3" />
        </div>
        <h2 class="text-3xl mb-6">Are you looking for guided learning?</h2>
        <p class="text-lg px-8 pb-8">
          Visit each product page to filter projects by Content Type, Category
          or Expertise level.
        </p>
        <MaterialButton type="text" class="mb-12">
          <div class="frc">
            <a href="#all-products" class="text-lg">See all products</a>
          </div>
        </MaterialButton>
      </div>
      <div
        class="card bg-white px-3 lg:px-6 py-2 lg:py-6 flex flex-col text-center items-center place-content-center"
      >
        <div class="value-prop-image">
          <img src="../../public/img/speakers.svg" class="w-1/3" />
        </div>
        <h2 class="text-3xl mb-6">Are you looking for speakers / experts?</h2>
        <p class="text-lg px-8 pb-8">
          Find and connect with product experts, speakers and authors in the
          community.
        </p>
        <MaterialButton type="text" class="mb-12">
          <div class="frc">
            <a href="/authors" class="text-lg"> Browse authors </a>
          </div>
        </MaterialButton>
      </div>
      <div
        class="card bg-white px-3 lg:px-6 py-2 lg:py-6 flex flex-col text-center items-center place-content-center"
      >
        <div class="value-prop-image">
          <img src="../../public/img/inspiration.svg" class="w-1/3" />
        </div>
        <h2 class="text-3xl mb-6">Are you looking to showcase your work?</h2>
        <p class="text-lg px-8 pb-8">
          Submit your projects and blogs to Dev Library to inspire other
          developers.
        </p>
        <MaterialButton type="text" class="mb-12">
          <div class="frc">
            <a href="/about" class="text-lg">Learn more</a>
          </div>
        </MaterialButton>
      </div>
    </div>

    <!-- Products -->
    <div id="all-products"></div>
    <h1 class="ml-12 mt-10">All products</h1>
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
        <h2 class="text-3xl">Latest projects</h2>
        <div class="desktop-only">
          <p class="mt-2 mb-4 lg:w-3/4 leading-6">
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
        v-for="p in recentProjects.slice(0, displayedLatestProducts)"
        :key="p.id"
        :project="p"
        :showLogo="true"
        :showTags="false"
      />
    </div>
    <div
      v-show="displayedLatestProducts < recentProjects.length"
      class="mt-2 mb-20 flex flex-col items-center place-content-center"
    >
      <MaterialButton
        type="text"
        @click.native="incrementDisplayedLatestProducts"
      >
        <div class="frc">
          <span>Load more</span>
          <font-awesome-icon icon="chevron-down" class="pt-px ml-2" />
        </div>
      </MaterialButton>
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
  fetchRepo,
  fetchBlog,
} from "@/plugins/data";

import { ALL_PRODUCTS } from "../../../shared/product";
import {
  BlogData,
  BlogOrRepoDataHolder,
  RepoData,
} from "../../../shared/types";
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
  public displayedLatestProducts = 6;

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

  async mounted() {
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

  public incrementDisplayedLatestProducts() {
    this.displayedLatestProducts += 4;
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
