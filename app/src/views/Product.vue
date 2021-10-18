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
        <div :class="[productStyle.bg]" class="py-20 grid grid-cols-10 gap-4">
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
                Official docs
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

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-20 px-6 pt-4 lg:pt-8">
      <!-- Show filters button -->
      <div class="mobile-only col-span-10">
        <div class="flex flex-row-reverse">
          <MaterialButton
            type="secondary"
            @click.native="showFilterOverlay = true"
          >
            <font-awesome-icon icon="filter" size="sm" class="mr-1" />
            <span>Filters</span>
          </MaterialButton>
        </div>
      </div>

      <!-- Filters (Desktop) -->
      <div v-if="$mq === 'desktop'" class="lg:col-span-2">
        <ProjectFilters v-model="filters" :product="product" />
      </div>

      <!-- Filters (Mobile) -->
      <div
        v-if="$mq === 'mobile'"
        v-show="showFilterOverlay"
        class="mobile-only fixed right-0 top-0 bg-black bg-opacity-10 w-full h-full"
      >
        <!-- scrim -->
      </div>
      <transition name="slide-in-left">
        <div
          v-if="$mq === 'mobile'"
          v-show="showFilterOverlay"
          class="mobile-only fixed right-0 top-0 pt-20 w-full h-full"
        >
          <div
            class="bg-white rounded-l overflow-hidden w-2/3 ml-auto shadow-lg"
          >
            <ProjectFilters
              v-model="filters"
              :product="product"
              :mobile="true"
            />
            <div
              class="border-t border-gray-200 flex flex-row-reverse gap-2 p-2"
            >
              <MaterialButton
                type="primary"
                @click.native="showFilterOverlay = false"
                >Done</MaterialButton
              >
            </div>
          </div>
        </div>
      </transition>

      <!-- Cards -->
      <div v-show="hasContent" class="col-span-10 lg:col-span-8">
        <div id="projects">
          <div
            v-if="projects.length === 0"
            class="mt-4 flex flex-row items-center justify-center py-20 text-gray-400"
          >
            <font-awesome-icon
              :icon="['fas', 'exclamation-circle']"
              class="mr-2"
            />
            <span>No projects matching your filters.</span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <RepoOrBlogCard
              v-for="project in projects"
              :key="project.data.id"
              :project="project"
            />
          </div>

          <div class="flex flex-row justify-center mt-4 lg:mt-6">
            <MaterialButton
              v-if="canLoadMore"
              type="text"
              @click.native="loadMore"
            >
              <div class="flex flex-row items-center">
                <span>Load more</span>
                <font-awesome-icon icon="chevron-down" class="pt-px ml-2" />
              </div>
            </MaterialButton>
          </div>
        </div>
      </div>
    </div>
  </HeaderBodyLayout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import {
  BlogData,
  RepoData,
  BlogOrRepoDataHolder,
} from "../../../shared/types";

import UIModule from "@/store/ui";

import MaterialButton from "@/components/MaterialButton.vue";
import RepoOrBlogCard from "@/components/RepoOrBlogCard.vue";
import ProjectFilters from "@/components/ProjectFilters.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import CheckboxGroup, {
  CheckboxGroupEntry,
} from "@/components/CheckboxGroup.vue";
import HeaderBodyLayout from "@/components/HeaderBodyLayout.vue";
import ProductLogo from "@/components/ProductLogo.vue";

import {
  PagedResponse,
  nextPage,
  emptyPageResponse,
  wrapInHolders,
} from "@/plugins/data";

import { ProductConfig } from "../../../shared/types";
import { ALL_PRODUCTS } from "../../../shared/product";
import { FirestoreQuery } from "../../../shared/types/FirestoreQuery";
import { getStyle, ProductStyle } from "@/model/product";

@Component({
  components: {
    MaterialButton,
    RepoOrBlogCard,
    RadioGroup,
    CheckboxGroup,
    HeaderBodyLayout,
    ProductLogo,
    ProjectFilters,
  },
})
export default class Product extends Vue {
  private uiModule = getModule(UIModule, this.$store);

  public showFilterOverlay = false;
  public filters = {
    sort: "updated",
    types: [] as CheckboxGroupEntry[],
    categories: [] as CheckboxGroupEntry[],
  };

  private perPage = 6;

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
    const noneChecked = this.filters.categories.every((c) => !c.checked);
    if (noneChecked) {
      return null;
    }

    return this.filters.categories.filter((x) => x.checked).map((x) => x.value);
  }

  get queryOrderBy(): string {
    if (this.filters.sort === "added") {
      return "stats.dateAdded";
    }

    if (this.filters.sort === "updated") {
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

  get canLoadMore() {
    return (
      (this.showBlogPosts && this.blogData.hasNext) ||
      (this.showOpenSource && this.repoData.hasNext)
    );
  }

  public async loadMore() {
    const promises = [];

    if (this.repoData.hasNext) {
      promises.push(nextPage(this.repoData));
    }

    if (this.blogData.hasNext) {
      promises.push(nextPage(this.blogData));
    }

    this.uiModule.waitFor(Promise.all(promises));
  }

  get product(): ProductConfig {
    return ALL_PRODUCTS[this.$route.params["product"]];
  }

  get productStyle(): ProductStyle {
    return getStyle(this.$route.params["product"]);
  }

  get showAllTypes() {
    // If nothing is checked, show them all
    return this.filters.types.every((t) => !t.checked);
  }

  get showOpenSource(): boolean {
    return (
      this.showAllTypes ||
      this.filters.types.some((t) => t.value === "open-source" && t.checked)
    );
  }

  get showBlogPosts(): boolean {
    return (
      this.showAllTypes ||
      this.filters.types.some((t) => t.value === "blog" && t.checked)
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

  get projects(): BlogOrRepoDataHolder[] {
    const blogs = this.showBlogPosts ? this.blogs : [];
    const repos = this.showOpenSource ? this.repos : [];
    const projects = wrapInHolders(blogs, repos);

    // Locally join and sort
    return projects.sort((a, b) => {
      const dataA = a.data;
      const dataB = b.data;

      if (this.filters.sort === "added") {
        return dataB.stats.dateAdded - dataA.stats.dateAdded;
      } else {
        return dataB.stats.lastUpdated - dataA.stats.lastUpdated;
      }
    });
  }
}
</script>

<style scoped lang="postcss">
/** slide-in-left transition */
.slide-in-left-leave-active,
.slide-in-left-enter-active {
  transition: 0.25s;
}
.slide-in-left-enter-to {
  transform: translate(0, 0);
}
.slide-in-left-enter,
.slide-in-left-leave-to {
  transform: translate(120%, 0);
}
</style>
