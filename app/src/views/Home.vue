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
            Welcome to <strong>devlibrary.withgoogle.com</strong>, a showcase of
            what developers like you have built with Google technologies.
          </p>
          <p class="mt-4 lg:mt-10">Browse and learn, or submit your own!</p>
        </div>

        <div class="mt-8">
          <MaterialButton
            type="primary"
            class="mr-2"
            @click.native="scrollToProducts()"
            >Explore</MaterialButton
          >
          <MaterialButton type="secondary">
            <a href="https://forms.gle/E54pxK3JzpXMGyqN7" target="blank">
              SUBMIT</a
            ></MaterialButton
          >
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
              :link="repoPath(p, repo)"
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

import { ALL_PRODUCTS, ProductConfig } from "@/model/product";
import { queryRepos, queryBlogs } from "@/plugins/data";

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

  private RECENTLY_ADDED_QUERY: FirestoreQuery = {
    orderBy: [
      {
        fieldPath: "stats.dateAdded",
        direction: "desc",
      },
    ],
    limit: 2,
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

    Vue.set(this.recentRepos, product, docs);
  }

  public async fetchRecentBlogs(product: string) {
    const res = await queryBlogs(product, this.RECENTLY_ADDED_QUERY);
    const docs = res.docs.map((d) => d.data);

    Vue.set(this.recentBlogs, product, docs);
  }

  public scrollToProducts() {
    const header = document.getElementById("header");
    window.scrollTo({
      behavior: "smooth",
      top: header?.getBoundingClientRect().bottom,
    });
  }

  public repoPath(product: ProductConfig, repo: RepoData) {
    return `/products/${product.key}/repos/${repo.id}`;
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
