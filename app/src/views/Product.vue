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
  <HeaderBodyLayout
    style="
      --header-bg-image-desktop: url('/img/banners/desktop/product-wide.png');
      --header-bg-image-mobile: url('/img/banners/mobile/product-wide.png');
    "
  >
    <template v-slot:header>
      <!-- Header (Mobile) -->
      <div class="mobile-only header-image">
        <div class="mobile-only frc px-std py-4 border-b border-gray-100">
          <ProductLogo size="small" :productKey="product.key" />

          <h1 class="ml-2">
            {{ product.name }}
          </h1>
        </div>
      </div>

      <!-- Header (Desktop) -->
      <div class="desktop-only header-image">
        <div
          class="lg:py-4 xl:py-10 px-std grid grid-cols-10 gap-4 border-b border-gray-100"
        >
          <div class="col-span-4 pt-2">
            <div class="frc">
              <ProductLogo
                class="mr-4"
                size="medium"
                :productKey="product.key"
              />
              <h1>
                {{ product.name }}
              </h1>
            </div>

            <p class="mt-2">{{ product.description }}</p>
            <a :href="product.docsUrl" target="blank">
              <MaterialButton type="secondary" class="mt-8">
                Official docs
                <font-awesome-icon icon="external-link-alt" class="ml-1" />
              </MaterialButton>
            </a>
          </div>
        </div>
      </div>
    </template>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-20 px-std pt-4 lg:pt-8">
      <!-- Filters (Desktop) -->
      <div v-if="$mq === 'desktop'" class="lg:col-span-2">
        <ProjectFilters v-model="filters" :product="product" />
      </div>

      <!-- Filters (Mobile) -->
      <div
        v-if="$mq === 'mobile'"
        v-show="showFilterOverlay"
        class="mobile-only scrim"
      >
        <!-- scrim -->
      </div>
      <transition name="slide-in-left">
        <div
          v-if="$mq === 'mobile'"
          v-show="showFilterOverlay"
          class="mobile-only fixed right-0 top-0 pt-20 w-full h-full"
        >
          <div class="bg-white rounded-l overflow-hidden w-2/3 ml-auto">
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

              <MaterialButton type="secondary" @click.native="resetFilters()"
                >Reset</MaterialButton
              >
            </div>
          </div>
        </div>
      </transition>

      <!-- Cards -->
      <div v-show="hasContent" class="col-span-10 lg:col-span-8">
        <!-- Filter Chips -->
        <div v-if="filters" class="flex flex-row flex-wrap">
          <!-- Show filters button (mobile) -->
          <div class="mobile-only">
            <div class="flex flex-row mr-2 mb-4">
              <div class="filter-chip" @click="showFilterOverlay = true">
                <font-awesome-icon icon="filter" size="sm" class="mr-2" />
                <span>Filters</span>
              </div>
            </div>
          </div>

          <div v-for="item in filters.types" :key="item.value">
            <div
              v-if="item.checked"
              class="mr-2 mb-4 filter-chip"
              @click="removeFilterType(item.value)"
            >
              <span class="mr-2">{{ item.key }}</span>
              <font-awesome-icon icon="times" class="ml-px" size="sm" />
            </div>
          </div>

          <div v-for="item in filters.categories" :key="item.value">
            <div
              v-if="item.checked"
              class="mr-2 mb-4 filter-chip"
              @click="removeFilterCategory(item.value)"
            >
              <span class="mr-2">{{ item.key }}</span>
              <font-awesome-icon icon="times" class="ml-px" size="sm" />
            </div>
          </div>
        </div>

        <div id="projects">
          <div
            v-if="visibleProjects.length === 0"
            class="mt-4 frc justify-center py-20 text-gray-400"
          >
            <font-awesome-icon
              :icon="['fas', 'exclamation-circle']"
              class="mr-2"
            />
            <span>No projects matching your filters.</span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <RepoOrBlogCard
              v-for="project in visibleProjects"
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
              <div class="frc">
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

const SORT_ADDED = "added";
const SORT_UPDATED = "updated";

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
    sort: SORT_ADDED,
    types: [] as CheckboxGroupEntry[],
    categories: [] as CheckboxGroupEntry[],
  };

  private pagesToShow = 1;
  private perPage = 12;

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
      this.pagesToShow = 1;
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
    if (this.filters.sort === SORT_ADDED) {
      return "stats.dateAdded";
    }

    if (this.filters.sort === SORT_UPDATED) {
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
    const canLoadMoreRemote =
      (this.showBlogPosts && this.blogData.hasNext) ||
      (this.showOpenSource && this.repoData.hasNext);

    const canLoadMoreLocal =
      this.visibleProjects.length < this.sortedProjects.length;

    return canLoadMoreRemote || canLoadMoreLocal;
  }

  public async loadMore() {
    const promises = [];

    if (this.repoData.hasNext) {
      promises.push(nextPage(this.repoData));
    }

    if (this.blogData.hasNext) {
      promises.push(nextPage(this.blogData));
    }

    await this.uiModule.waitFor(Promise.all(promises));
    this.pagesToShow++;
  }

  public removeFilterType(value: string) {
    const f = this.filters.types.find((x) => x.value === value);
    if (f) {
      f.checked = false;
    }
  }

  public removeFilterCategory(value: string) {
    const f = this.filters.categories.find((x) => x.value === value);
    if (f) {
      f.checked = false;
    }
  }

  public resetFilters() {
    for (const c of this.filters.categories) {
      c.checked = false;
    }

    for (const t of this.filters.types) {
      t.checked = false;
    }

    this.filters.sort = SORT_UPDATED;
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

  get sortedProjects(): BlogOrRepoDataHolder[] {
    const blogs = this.showBlogPosts ? this.blogs : [];
    const repos = this.showOpenSource ? this.repos : [];
    const projects = wrapInHolders(blogs, repos);

    // Locally join and sort
    return projects.sort((a, b) => {
      const dataA = a.data;
      const dataB = b.data;

      if (this.filters.sort === SORT_ADDED) {
        return dataB.stats.dateAdded - dataA.stats.dateAdded;
      } else {
        return dataB.stats.lastUpdated - dataA.stats.lastUpdated;
      }
    });
  }

  get visibleProjects(): BlogOrRepoDataHolder[] {
    // We load up to 1 full page of blogs and 1 full page of repos so
    // that our sort is stable across page loads, but this means we
    // only show part of the loaded data.
    const maxToShow = this.perPage * this.pagesToShow;
    return this.sortedProjects.slice(0, maxToShow);
  }
}
</script>

<style scoped lang="postcss">
.filter-chip {
  @apply flex flex-row items-center;
  @apply px-3 py-1 text-sm text-gblue-700 border border-gray-200 rounded-full;
  @apply cursor-pointer;
}

.filter-chip:hover {
  @apply bg-gblue-50;
}

.filter-chip:active {
  @apply bg-gblue-100;
}

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
