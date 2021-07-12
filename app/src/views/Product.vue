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
  <HeaderSidebarLayout>
    <template v-slot:header>
      <!-- Header (Mobile) -->
      <div class="mobile-only">
        <div
          :class="[productStyle.bg]"
          class="mobile-only flex flex-row items-center px-6 py-4"
        >
          <ProductLogo size="tiny" :productKey="product.key" />

          <h1 class="text-2xl ml-2" :class="[productStyle.text]">
            {{ product.name }}
          </h1>
        </div>
      </div>

      <!-- Header (Desktop) -->
      <div class="desktop-only">
        <div
          :class="[productStyle.bg]"
          class="py-20 grid grid-cols-10 gap-4"
        >
          <div
            :class="[productStyle.text]"
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
          :keys="['Recently Updated', 'Recently Added']"
          :values="['updated', 'added']"
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
          :keys="product.tags.map((t) => t.label)"
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
              :repo="repo"
            />
          </div>

          <div class="flex flex-row justify-center mt-4 lg:mt-6">
            <MaterialButton
              v-if="repoData.hasNext"
              type="outlined"
              @click.native="loadNext(repoData)"
            >
              Load More
            </MaterialButton>
          </div>
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
              :blog="blog"
            />
          </div>

          <div class="flex flex-row justify-center mt-4 lg:mt-6">
            <MaterialButton
              v-if="blogData.hasNext"
              type="outlined"
              @click.native="loadNext(blogData)"
            >
              Load More
            </MaterialButton>
          </div>
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
import ProductLogo from "@/components/ProductLogo.vue";

import {
  PagedResponse,
  nextPage,
  prevPage,
  emptyPageResponse,
} from "@/plugins/data";

import { ProductConfig } from "../../../shared/types";
import { ALL_PRODUCTS } from "../../../shared/product";
import { FirestoreQuery } from "../../../shared/types/FirestoreQuery";
import { getStyle, ProductStyle } from "@/model/product";

@Component({
  components: {
    MaterialButton,
    LargeRepoCard,
    LargeBlogCard,
    RadioGroup,
    CheckboxGroup,
    HeaderSidebarLayout,
    ProductLogo,
  },
})
export default class Product extends Vue {
  private uiModule = getModule(UIModule, this.$store);

  public sort = "updated";
  public types: CheckboxGroupEntry[] = [];
  public categories: CheckboxGroupEntry[] = [];

  private perPage = 4;

  public repoData: PagedResponse<RepoData> = emptyPageResponse<RepoData>(
    `/products/${this.product.key}/repos`,
    {},
    this.perPage
  );
  public blogData: PagedResponse<BlogData> = emptyPageResponse<BlogData>(
    `/products/${this.product.key}/blogs`,
    {},
    this.perPage
  );

  mounted() {
    // Loading will be handled by the first "onQueryParamsChanged" firing
    // which will happen when the page loads and the default values hit
  }

  @Watch("queryParams")
  public async onQueryParamsChanged(q: FirestoreQuery) {
    console.log("onQueryParamsChanged", q);

    const repoData = emptyPageResponse<RepoData>(
      `/products/${this.product.key}/repos`,
      q,
      this.perPage
    );
    const reposPromise = nextPage(repoData);

    const blogData = emptyPageResponse<BlogData>(
      `/products/${this.product.key}/blogs`,
      q,
      this.perPage
    );
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

  get queryParams(): FirestoreQuery {
    const orderBy = this.queryOrderBy;
    const tags = this.queryTags;

    const q: FirestoreQuery = {
      orderBy: [
        {
          fieldPath: orderBy,
          direction: "desc",
        },
      ],
    };

    if (tags) {
      q.where = [
        {
          fieldPath: "metadata.tags",
          operator: "array-contains-any",
          value: tags,
        },
      ];
    }

    return q;
  }

  get hasContent() {
    return this.blogData.currentPage >= 0 || this.repoData.currentPage >= 0;
  }

  public async loadNext(data: PagedResponse<unknown>) {
    const p = nextPage(data);
    this.uiModule.waitFor(p);
  }

  public async loadPrev(data: PagedResponse<unknown>) {
    const p = prevPage(data);
    this.uiModule.waitFor(p);
  }

  get product(): ProductConfig {
    return ALL_PRODUCTS[this.$route.params["product"]];
  }

  get productStyle(): ProductStyle {
    return getStyle(this.$route.params["product"]);
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
    if (this.repoData.pages.length <= 0) {
      return [];
    }
    return this.repoData.pages.flatMap((p) => p);
  }

  get blogs(): BlogData[] {
    if (this.blogData.pages.length <= 0) {
      return [];
    }
    return this.blogData.pages.flatMap((p) => p);
  }
}
</script>

<style scoped lang="postcss"></style>
