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
    <div class="section-inner">
    <div
      class="homepage-header header-image grid grid-cols-12 py-8 lg:pt-14 lg:pb-12 xl:pt-14 xl:pb-16 px-std border-b border-gray-100"
      style="
        --header-bg-image-desktop: url('/img/banners/desktop/home-wide.png');
        --header-bg-image-mobile: url('/img/banners/mobile/home-wide.png');
      "
    >
      <div class="col-span-12 lg:col-span-6 px-1">
        <h1 class="text-4xl">
          Now accepting AI project submissions
        </h1>

        <div>
          <!-- Right-padding added on mobile to improve text flow -->
          <p class="text-xl mt-9 mb-4 pr-4 lg:pr-0">
            Explore open source AI projects The Dev Library showcases a growing collection of Google-curated open source projects. See how developers are leveraging Google AI tools and technologies to build amazing things.
          </p>
          <div class="mt-4 lg:mt-6">
            <a
                target="blank"
                :href="`https://devlibrary.withgoogle.com/products/ml?sort=added`"
              >
              <MaterialButton type="primary"
                >Start exploring today</MaterialButton
              >
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- Featured developer tools -->
    <div
      class="dev-tools-cards"
    >
      <h2 class="text-3xl text-center pt-20">Featured developer tools</h2>
      <div class="section-inner grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10 pb-20 px-std">
        <div
          class="card bg-white px-3 lg:px-6 py-2 lg:py-6 flex flex-col text-center items-center place-content-center"
        >
          <div class="dev-tools-image">
            <img src="../../public/img/gemini-icon.png" class="w-1/3" />
          </div>
          <h2 class="text-2xl mb-6">
            Gemini API
          </h2>
          <p class="text-lg px-8 pb-8">
            Build and deploy production-ready generative AI experiences using Gemini models, APIs, and GenAI frameworks.
          </p>
          <MaterialButton type="primary" class="mb-12">
            <div class="frc">
              <a href="https://ai.google.dev/gemini-api/docs">Learn more</a>
            </div>
          </MaterialButton>
        </div>
        <div
          class="card bg-white px-3 lg:px-6 py-2 lg:py-6 flex flex-col text-center items-center place-content-center"
        >
          <div class="dev-tools-image">
            <img src="../../public/img/ai-studio-icon.png" class="w-1/3" />
          </div>
          <h2 class="text-2xl mb-6">Google AI Studio</h2>
          <p class="text-lg px-8 pb-8">
            Build generative AI applications quickly with Gemini in Google AI studio.
          </p>
          <MaterialButton type="primary" class="mb-12">
            <div class="frc">
              <a href="https://aistudio.google.com">Learn more</a>
            </div>
          </MaterialButton>
        </div>
        <div
          class="card bg-white px-3 lg:px-6 py-2 lg:py-6 flex flex-col text-center items-center place-content-center"
        >
          <div class="dev-tools-image">
            <img src="../../public/img/gemma-logo.png" class="w-1/3" />
          </div>
          <h2 class="text-2xl mb-6">
            Gemma
          </h2>
          <p class="text-lg px-8 pb-8">
            Built on the same cutting-edge research and technology as Gemini, Gemma is a family of lightweight, open models, meticulously crafted for you.
          </p>
          <MaterialButton type="primary" class="mb-12">
            <div class="frc">
              <a href="https://ai.google.dev/gemma">Learn more</a>
            </div>
          </MaterialButton>
        </div>
      </div>
    </div>

    <!-- Value Prop Cards -->
    <div>
      <h2 class="text-3xl text-center pt-20">Why contribute to Dev Library</h2>
      <div class="section-inner grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10 px-std">
        <div
          class="card bg-white px-3 lg:px-6 py-2 lg:py-6 flex flex-col text-center items-center place-content-center"
        >
          <div class="value-prop-image">
            <img src="../../public/img/featured-content.svg" class="w-1/3" />
          </div>
          <h2 class="text-2xl mb-6">
            Learn from community content
          </h2>
          <p class="text-lg px-8 pb-8">
            Learn from projects and blogs created by fellow developers.
          </p>
          <MaterialButton type="secondary" class="mb-12">
            <div class="frc">
              <a href="#all-products">See all products</a>
            </div>
          </MaterialButton>
        </div>
        <div
          class="card bg-white px-3 lg:px-6 py-2 lg:py-6 flex flex-col text-center items-center place-content-center"
        >
          <div class="value-prop-image">
            <img src="../../public/img/speakers.svg" class="w-1/3" />
          </div>
          <h2 class="text-2xl mb-6">Connect with experts and authors</h2>
          <p class="text-lg px-8 pb-8">
            Find dev experts, content creators and authors in the
            community.
          </p>
          <MaterialButton type="secondary" class="mb-12">
            <div class="frc">
              <a href="/authors"> Browse authors </a>
            </div>
          </MaterialButton>
        </div>
        <div
          class="card bg-white px-3 lg:px-6 py-2 lg:py-6 flex flex-col text-center items-center place-content-center"
        >
          <div class="value-prop-image">
            <img src="../../public/img/inspiration.svg" class="w-1/3" />
          </div>
          <h2 class="text-2xl mb-6">
            Discover latest projects from in-focus dev topics
          </h2>
          <p class="text-lg px-8 pb-8">
            Check out inspiring projects build with Google developer solutions.
          </p>
          <MaterialButton type="secondary" class="mb-12">
            <div class="frc">
              <a href="/products/ml">Learn more</a>
            </div>
          </MaterialButton>
        </div>
      </div>
    </div>

    <!-- Products -->
    <div id="all-products"></div>
    <div class="section-inner">
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
    </div>

    <!-- Videos -->
    <div class="w-full p-6 lg:p-10 video-playlist h-max-20">
      <div class="section-inner px-std">
      <div class="text-center pb-10">
        <h1 class="text-2xl lg:text-3xl pb-5">Meet our Authors</h1>
        <a
          href="https://www.youtube.com/playlist?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ"
          target="_blank"
        >
          <MaterialButton type="primary">More Authors</MaterialButton>
        </a>
      </div>
      <div class="mb-5 grid gap-x-12 grid-cols-1 md:grid-cols-5">
        <div class="col-span-3 video-aspect-ratio">
          <iframe
            class="w-full h-full"
            width="640"
            height="360"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            :src="promoVideo.embedUrl"
            :title="promoVideo.title"
          ></iframe>
          <h2 class="p-5">{{ promoVideo.title }}</h2>
        </div>
        <ul
          class="playlist-list col-span-2 grid gap-4 h-full overflow-y-auto p-0"
        >
          <li
            class="z-10 align-start"
            v-for="v in promoVideoPlaylist"
            :key="v.videoUrl"
          >
            <a
              class="grid gap-x-3 grid-cols-5"
              target="_blank"
              :href="v.videoUrl"
            >
              <iframe
                class="video-aspect-ratio w-full h-full -z-1 relative col-span-2"
                :src="v.embedUrl"
                :title="v.title"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
              <p class="text-lg col-span-3">
                {{ v.title }}
              </p>
            </a>
          </li>
        </ul>
      </div>
      </div>
    </div>
    <!-- Impact banner -->
    <div class="w-full p-6 lg:p-10 bg-gblue-600">
      <div class="section-inner">
      <h1 class="text-white text-center text-2xl lg:text-3xl">Our impact</h1>
      <div
        class="grid grid-cols-4 justify-center text-center text-white w-75 mt-6 mb-2"
      >
        <div class="flex flex-col">
          <span class="impact-number">700+</span>
          <span class="impact-text">Authors</span>
        </div>
        <div class="flex flex-col">
          <span class="impact-number">80+</span>
          <span class="impact-text">Countries</span>
        </div>
        <div class="flex flex-col">
          <span class="impact-number">800+</span>
          <span class="impact-text">Blogs</span>
        </div>
        <div class="flex flex-col">
          <span class="impact-number">700+</span>
          <span class="impact-text">Projects</span>
        </div>
      </div>
      </div>
    </div>

    <!-- Recently Added projects -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-std py-8 section-inner"
    >
      <div class="col-span-1 lg:col-span-2 lg:px-2">
        <h2 class="text-3xl">Latest dev projects</h2>
        <div class="desktop-only">
          <p class="mt-2 mb-4 lg:w-3/4 leading-6">
            Check out the latest projects added to Dev Library. To see
            all projects, choose one of the products below.
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
import { Component, Model, Vue } from "vue-property-decorator";
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
import { getPromoVideoMain, getPromoVideoPlaylist } from "../model/videos";
import { FirestoreQuery } from "../../../shared/types/FirestoreQuery";
import { EVENT_BUS, NAME_SHOW_SUBMIT_DIALOG } from "@/plugins/events";
import { conversionEvent } from "@/plugins/gtag";

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
  public promoVideo = getPromoVideoMain();
  public promoVideoPlaylist = getPromoVideoPlaylist();

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
    conversionEvent("subscribe");
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

.playlist-list {
  max-height: 520px;
}

.video-playlist {
  background: #f1f3f4;
}

.video-aspect-ratio {
  aspect-ratio: 16/9;
}
</style>
