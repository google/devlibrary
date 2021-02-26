<template>
  <HeaderSidebarLayout>
    <template v-slot:header>
      <!-- Header (Mobile) -->
      <div class="mobile-only">
        <div
          :class="[product.classes.bg]"
          class="mobile-only flex flex-row items-center px-6 py-4"
        >
          <ProductLogo size="tiny" :productKey="product.key" />

          <h1 class="text-2xl ml-2" :class="[product.classes.text]">
            {{ product.name }}
          </h1>
        </div>
      </div>

      <!-- Header (Desktop) -->
      <div class="desktop-only">
        <div
          :class="[product.classes.bg]"
          class="py-20 grid grid-cols-10 gap-4"
        >
          <div
            :class="[product.classes.text]"
            class="col-start-2 col-span-5 text-white"
          >
            <h1 class="text-3xl font-semibold">
              {{ product.name }}
            </h1>
            <p class="mt-2">{{ product.description }}</p>
            <a :href="product.docsUrl" target="blank">
              <MaterialButton type="secondary" class="mt-8">
                Official Docs
                <font-awesome-icon icon="external-link-alt" class="ml-1" />
              </MaterialButton>
            </a>
          </div>

          <div class="col-start-8 col-span-2">
            <ProductLogo size="large" :productKey="product.key" />
          </div>
        </div>
      </div>
    </template>

    <template v-slot:sidebar>
      <!-- Side bar -->
      <div>
        <p class="uppercase font-medium mt-4 mb-2">Sort</p>

        <RadioGroup
          prefix="sort"
          :keys="['Recently Added', 'Recently Updated']"
          :values="['added', 'updated']"
          v-model="sort"
        />

        <p class="uppercase font-medium mt-4 mb-2">Type</p>

        <CheckboxGroup
          prefix="type"
          :keys="['Open Source', 'Blog Posts']"
          :values="['open-source', 'blog']"
          v-model="types"
        />

        <p class="uppercase font-medium mt-4 mb-2">Category</p>

        <CheckboxGroup
          prefix="category"
          :keys="product.tags.map((t) => t.key)"
          :values="product.tags.map((t) => t.value)"
          v-model="categories"
        />
      </div>
    </template>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-20">
      <div
        v-show="hasContent"
        class="col-span-10 px-6 lg:px-0 lg:col-start-2 lg:col-span-8"
      >
        <!-- Open Source -->
        <div id="opensource" v-if="showOpenSource">
          <h2 class="text-2xl mt-8">Open Source</h2>

          <div v-if="repos.length === 0" class="mt-4">
            No projects matching your filters...
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LargeRepoCard
              class="mt-4"
              v-for="repo in repos"
              :key="repo.id"
              :link="repoPath(repo)"
              :product="product.key"
              :repo="repo"
            />
          </div>

          <!-- Next / Prev Buttons -->
          <PaginationControls
            class="mt-2"
            :data="repoData"
            @next="loadNext(repoData, '#opensource')"
            @prev="loadPrev(repoData, '#opensource')"
          />
        </div>

        <!-- Blog Posts -->
        <div id="blogposts" v-if="showBlogPosts">
          <h2 class="text-2xl mt-8">Blog Posts</h2>

          <div v-if="blogs.length === 0" class="mt-4">
            No blog posts matching your filters...
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LargeBlogCard
              class="mt-4"
              v-for="blog in blogs"
              :key="blog.id"
              :product="product.key"
              :blog="blog"
            />
          </div>

          <!-- Next / Prev Buttons -->
          <PaginationControls
            class="mt-2"
            :data="blogData"
            @next="loadNext(blogData, '#blogposts')"
            @prev="loadPrev(blogData, '#blogposts')"
          />
        </div>
      </div>
    </div>
  </HeaderSidebarLayout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import { BlogData, RepoData } from "../../../shared/types";

import UIModule from "@/store/ui";

import MaterialButton from "@/components/MaterialButton.vue";
import LargeRepoCard from "@/components/LargeRepoCard.vue";
import LargeBlogCard from "@/components/LargeBlogCard.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import CheckboxGroup, {
  CheckboxGroupEntry,
} from "@/components/CheckboxGroup.vue";
import HeaderSidebarLayout from "@/components/HeaderSidebarLayout.vue";
import PaginationControls from "@/components/PaginationControls.vue";
import ProductLogo from "@/components/ProductLogo.vue";

import { ProductConfig, ALL_PRODUCTS } from "@/model/product";
import {
  PagedResponse,
  blogsRef,
  nextPage,
  prevPage,
  reposRef,
  emptyPageResponse,
  reposQuery,
  blogsQuery,
} from "@/plugins/data";

interface QueryParams {
  tags: string[] | null;
  orderBy: string;
}

@Component({
  components: {
    MaterialButton,
    LargeRepoCard,
    LargeBlogCard,
    RadioGroup,
    CheckboxGroup,
    HeaderSidebarLayout,
    PaginationControls,
    ProductLogo,
  },
})
export default class Product extends Vue {
  private uiModule = getModule(UIModule, this.$store);

  public sort = "added";
  public types: CheckboxGroupEntry[] = [];
  public categories: CheckboxGroupEntry[] = [];

  private perPage = 4;

  public repoData: PagedResponse<RepoData> = emptyPageResponse(
    reposRef(this.product.key),
    this.perPage
  );
  public blogData: PagedResponse<BlogData> = emptyPageResponse(
    blogsRef(this.product.key),
    this.perPage
  );

  mounted() {
    // Loading will be handled by the first "onQueryParamsChanged" firing
    // which will happen when the page loads and the default values hit
  }

  @Watch("queryParams")
  public async onQueryParamsChanged(val: QueryParams) {
    console.log("onQueryParamsChanged", val);

    let reposQ = reposQuery(this.product.key);
    if (val.tags) {
      reposQ = reposQ.where("metadata.tags", "array-contains-any", val.tags);
    }
    reposQ = reposQ.orderBy(val.orderBy, "desc");

    const repoData = emptyPageResponse(reposQ, this.perPage);
    const reposPromise = nextPage(repoData);

    let blogsQ = blogsQuery(this.product.key);
    if (val.tags) {
      blogsQ = blogsQ.where("metadata.tags", "array-contains-any", val.tags);
    }
    blogsQ = blogsQ.orderBy(val.orderBy, "desc");

    const blogData = emptyPageResponse(blogsQ, this.perPage);
    const blogsPromise = nextPage(blogData);

    const reloadPromise = Promise.all([reposPromise, blogsPromise]).then(() => {
      this.repoData = repoData;
      this.blogData = blogData;
    });

    this.uiModule.waitFor(reloadPromise);
  }

  get queryTags(): string[] | null {
    // If no selection, consider them all checked
    const noneChecked = this.categories.every((c) => !c.checked);
    if (noneChecked) {
      return null;
    }

    return this.categories.filter((x) => x.checked).map((x) => x.value);
  }

  get queryOrderBy(): string {
    if (this.sort === "added") {
      return "stats.dateAdded";
    }

    if (this.sort === "updated") {
      return "stats.lastUpdated";
    }

    return "stats.dateAdded";
  }

  get queryParams(): QueryParams {
    const orderBy = this.queryOrderBy;
    const tags = this.queryTags;

    return {
      tags,
      orderBy,
    };
  }

  get hasContent() {
    return this.blogData.currentPage >= 0 || this.repoData.currentPage >= 0;
  }

  public async loadNext(data: PagedResponse<unknown>, target: string) {
    const p = nextPage(data).then(() => this.makeTopVisible(target));
    this.uiModule.waitFor(p);
  }

  public async loadPrev(data: PagedResponse<unknown>, target: string) {
    const p = prevPage(data).then(() => this.makeTopVisible(target));
    this.uiModule.waitFor(p);
  }

  private makeTopVisible(target: string) {
    const el = document.querySelector(target);
    if (el) {
      const { top } = el.getBoundingClientRect();
      const scrollNeeded = Math.max(0, 100 - top);
      scrollBy({
        top: -1 * scrollNeeded,
        behavior: "smooth",
      });
    }
  }

  public repoPath(repo: RepoData) {
    return `/products/${this.product.key}/repos/${repo.id}`;
  }

  get product(): ProductConfig {
    return ALL_PRODUCTS[this.$route.params["product"]];
  }

  get showAllTypes() {
    // If nothing is checked, show them all
    return this.types.every((t) => !t.checked);
  }

  get showOpenSource(): boolean {
    return (
      this.showAllTypes ||
      this.types.some((t) => t.value === "open-source" && t.checked)
    );
  }

  get showBlogPosts(): boolean {
    return (
      this.showAllTypes ||
      this.types.some((t) => t.value === "blog" && t.checked)
    );
  }

  get repos(): RepoData[] {
    if (this.repoData.currentPage < 0) {
      return [];
    }
    return this.repoData.pages[this.repoData.currentPage] || [];
  }

  get blogs(): BlogData[] {
    if (this.blogData.currentPage < 0) {
      return [];
    }
    return this.blogData.pages[this.blogData.currentPage] || [];
  }
}
</script>

<style scoped lang="postcss"></style>
