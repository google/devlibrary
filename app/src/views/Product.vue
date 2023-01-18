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
    <Breadcrumbs :links="getBreadcrumbs()" />
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
          class="mobile-only scrim z-10"
        >
          <!-- scrim -->
        </div>
        <transition name="slide-in-left">
          <div
            v-if="$mq === 'mobile'"
            v-show="showFilterOverlay"
            class="mobile-only fixed right-0 top-0 pt-20 w-full h-full z-10"
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
          <!-- Search bar -->
          <div class="frc mb-4">
            <div
              class="frc rounded-lg min-w-0 max-w-lg border border-gray-200 px-2 w-80"
            >
              <font-awesome-icon
                icon="search"
                size="sm"
                class="text-mgray-700 opacity-70"
              />
              <input
                class="px-2 py-1 flex-grow min-w-0"
                type="text"
                id="productSearchBar"
                @input="setTempSearchFilter"
                :value="searchFilter"
                placeholder="Search"
              />
              <font-awesome-icon
                v-if="searchFilter.length > 0"
                @click="searchFilter = ''"
                icon="times-circle"
                class="text-mgray-700 cursor-pointer opacity-70"
              />
            </div>
            <MaterialButton
              @click.native="searchFilter = tempSearchFilter"
              type="primary"
              class="ml-4"
              id="productSearchButton"
            >
              Go
            </MaterialButton>
            <div class="desktop-only">
              <ProjectSort
                v-model="sortBy"
                :product="product"
                :defaultSort="sortBy"
              />
            </div>
          </div>
          <!-- Filter Chips -->
          <div v-if="filters" class="flex flex-row flex-wrap">
            <!-- Show filters button (mobile) -->
            <div class="mobile-only">
              <div class="flex flex-row mr-2 mb-4">
                <div class="filter-chip" @click="showFilterOverlay = true">
                  <font-awesome-icon icon="filter" size="sm" class="mr-2" />
                  <span>Filters</span>
                </div>
                <ProjectSort
                  v-model="sortBy"
                  :product="product"
                  :defaultSort="sortBy"
                />
              </div>
            </div>

            <div
              v-if="queryExpertise !== null && queryExpertise !== ''"
              class="mr-2 mb-4 filter-chip"
              @click="removeExpertiseLevel"
            >
              <span class="mr-2">{{ filters.expertiseLevel.toString() }}</span>
              <font-awesome-icon icon="times" class="ml-px" size="sm" />
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
              v-if="displayedProjects.length === 0"
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
                v-for="project in displayedProjects"
                :key="project.data.id"
                :project="project"
              />
            </div>

            <div
              class="flex flex-row justify-center mt-4 lg:mt-6"
              v-show="canLoadMore && searchFilter === ''"
            >
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
  </div>
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
import ProjectSort, {
  SORT_ADDED,
  SORT_UPDATED,
  SORT_STARS,
} from "@/components/ProjectSort.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
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
  queryRepos,
  queryBlogs,
} from "@/plugins/data";

import { ProductConfig } from "../../../shared/types";
import { ALL_PRODUCTS } from "../../../shared/product";
import { FirestoreQuery } from "../../../shared/types/FirestoreQuery";
import { BreadcrumbLink } from "../../../shared/types";
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
    ProjectSort,
    Breadcrumbs,
  },
})
export default class Product extends Vue {
  private uiModule = getModule(UIModule, this.$store);

  public getBreadcrumbs(): BreadcrumbLink[] {
    return [{ name: this.product.name, path: "" }];
  }

  public productLoaded = false;
  public urlParams = new URLSearchParams(window.location.search);
  public showFilterOverlay = false;
  public filters = {
    types: [] as CheckboxGroupEntry[],
    categories: [] as CheckboxGroupEntry[],
    expertiseLevel: [] as CheckboxGroupEntry[],
  };
  public sortBy = SORT_UPDATED;
  public searchFilter = "";
  public tempSearchFilter = "";

  private pagesToShow = 1;
  private perPage = 12;

  public allRepos: RepoData[] = [];
  public allBlogs: BlogData[] = [];
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
    const searchButton = document.getElementById("productSearchBar");
    searchButton?.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("productSearchButton")?.click();
      }
    });
  }

  @Watch("queryParams")
  public async onQueryParamsChanged(q: FirestoreQuery) {
    console.log("onQueryParamsChanged", q);

    if (this.searchFilter === "") {
      if (!this.productLoaded) {
        const repoData = await queryRepos(this.product.key, q);
        this.allRepos = repoData.docs.map((d) => d.data);
        const blogData = await queryBlogs(this.product.key, q);
        this.allBlogs = blogData.docs.map((d) => d.data);
      }
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

      const reloadPromise = Promise.all([reposPromise, blogsPromise]).then(
        () => {
          this.pagesToShow = 1;
          this.repoData = repoData;
          this.blogData = blogData;
        }
      );

      this.uiModule.waitFor(reloadPromise).then(() => {
        this.productLoaded = true;
      });
    } else {
      const repoData = await queryRepos(this.product.key, q);
      this.allRepos = repoData.docs.map((d) => d.data);
      const blogData = await queryBlogs(this.product.key, q);
      this.allBlogs = blogData.docs.map((d) => d.data);
    }
  }

  @Watch("productLoaded")
  public async onProductLoadedChanged() {
    const selectedSort = this.urlParams.get("sort");
    const selectedExpertise = this.urlParams.get("expertise");
    const selectedTypes = this.urlParams.get("type");
    const selectedCategories = this.urlParams.get("category");

    if (selectedSort !== null) {
      document.getElementById(`sort-${selectedSort}`)?.click();
    }
    if (selectedExpertise !== null) {
      document.getElementById(`expertiseLevel-${selectedExpertise}`)?.click();
    }
    if (selectedTypes !== null) {
      const selectedTypesArray = selectedTypes.split(",");
      for (const selectedType of selectedTypesArray) {
        document.getElementById(selectedType)?.click();
      }
    }
    if (selectedCategories !== null) {
      const selectedCategoriesArray = selectedCategories.split(",");
      for (const selectedCategory of selectedCategoriesArray) {
        document.getElementById(selectedCategory)?.click();
      }
    }
  }

  @Watch("sortBy")
  public onSortByChanged() {
    if (this.sortBy === SORT_STARS) {
      for (const type of this.filters.types) {
        type.checked = type.value === "open-source";
      }
    }
    this.onFiltersTypeChanged();
  }

  @Watch("filters", { deep: true })
  public async onFiltersTypeChanged() {
    let hasTypeParams = false;
    let hasCategoryParams = false;
    let hasExpertiseParams = false;
    let typeParams = "";
    let categoryParams = "";
    let expertiseParams = "";
    let url = `?sort=${this.sortBy}`;

    if (
      typeof this.filters.expertiseLevel === "string" &&
      this.filters.expertiseLevel != ""
    ) {
      hasExpertiseParams = true;
      expertiseParams += `${this.filters.expertiseLevel}`;
    }
    for (const filterType of this.filters.types) {
      if (filterType.checked) {
        if (hasTypeParams) {
          typeParams += ",";
        }
        typeParams += `${filterType.id}`;
        hasTypeParams = true;
      }
    }
    for (const filterCategory of this.filters.categories) {
      if (filterCategory.checked) {
        if (hasCategoryParams) {
          categoryParams += ",";
        }
        categoryParams += `${filterCategory.id}`;
        hasCategoryParams = true;
      }
    }
    if (hasExpertiseParams) {
      url += `&expertise=${expertiseParams}`;
    }
    if (hasTypeParams) {
      url += `&type=${typeParams}`;
    }
    if (hasCategoryParams) {
      url += `&category=${categoryParams}`;
    }
    window.history.replaceState(null, "", url);
  }

  get queryTags(): string[] | null {
    // If no selection, consider them all checked
    const noneCategoryChecked = this.filters.categories.every(
      (c) => !c.checked
    );
    if (noneCategoryChecked) {
      return null;
    }

    return this.filters.categories.filter((x) => x.checked).map((x) => x.value);
  }

  get queryExpertise(): string | null {
    if (this.filters.expertiseLevel == null) {
      return null;
    }
    return this.filters.expertiseLevel.toString();
  }

  get queryOrderBy(): string {
    switch (this.sortBy) {
      case SORT_UPDATED:
        return "stats.lastUpdated";
      case SORT_STARS:
        return "stats.stars";
      case SORT_ADDED:
      default:
        return "stats.dateAdded";
    }
  }

  get queryParams(): FirestoreQuery {
    const orderBy = this.queryOrderBy;
    let tags = this.queryTags;
    const expertise = this.queryExpertise;

    const q: FirestoreQuery = {
      orderBy: [
        {
          fieldPath: orderBy,
          direction: "desc",
        },
      ],
    };

    if (tags) {
      tags = tags?.filter(
        (tag) =>
          tag !== "Beginner" && tag !== "Intermediate" && tag !== "Advanced"
      );
      if (tags.length > 0) {
        q.where = [
          {
            fieldPath: "metadata.tags",
            operator: "array-contains-any",
            value: tags,
          },
        ];
      }
    }
    if (expertise) {
      if (q.where) {
        q.where?.push({
          fieldPath: "metadata.expertise",
          operator: "==",
          value: expertise.toUpperCase(),
        });
      } else {
        q.where = [
          {
            fieldPath: "metadata.expertise",
            operator: "==",
            value: expertise.toUpperCase(),
          },
        ];
      }
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

  get displayedProjects() {
    if (this.searchFilter != "") {
      return this.allSortedProjects.filter((project) => {
        const filter = this.searchFilter.toLowerCase();
        if (project.type === "repo") {
          if (
            project.data.metadata.name.toLowerCase().includes(filter) ||
            project.data.metadata.repo.toLowerCase().includes(filter) ||
            project.data.metadata.owner.toLowerCase().includes(filter) ||
            project.data.metadata.longDescription.toLowerCase().includes(filter)
          ) {
            return project;
          }
        } else {
          if (
            project.data.metadata.author.toLowerCase().includes(filter) ||
            project.data.metadata.title.toLowerCase().includes(filter)
          ) {
            return project;
          }
        }
      });
    } else {
      return this.visibleProjects;
    }
  }

  public setTempSearchFilter(event: { target: { value: string } }) {
    this.tempSearchFilter = event.target.value;
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

  public removeExpertiseLevel() {
    const el = document.getElementById(
      `expertiseLevel-${this.filters.expertiseLevel}`
    ) as HTMLInputElement | null;
    if (el) {
      el.checked = false;
      this.filters.expertiseLevel = [];
    }
  }

  public resetFilters() {
    for (const c of this.filters.categories) {
      c.checked = false;
    }

    this.removeExpertiseLevel();

    for (const t of this.filters.types) {
      t.checked = false;
    }
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

      if (this.sortBy === SORT_ADDED) {
        return dataB.stats.dateAdded - dataA.stats.dateAdded;
      } else if (this.sortBy === SORT_STARS) {
        if ("stars" in dataA.stats && "stars" in dataB.stats) {
          return dataB.stats.stars - dataA.stats.stars;
        }
        if ("stars" in dataA.stats) {
          return -1;
        }
        if ("stars" in dataB.stats) {
          return 1;
        }
        return 0;
      } else {
        return dataB.stats.lastUpdated - dataA.stats.lastUpdated;
      }
    });
  }

  get allSortedProjects(): BlogOrRepoDataHolder[] {
    const blogs = this.showBlogPosts ? this.allBlogs : [];
    const repos = this.showOpenSource ? this.allRepos : [];
    const projects = wrapInHolders(blogs, repos);

    // Locally join and sort
    return projects.sort((a, b) => {
      const dataA = a.data;
      const dataB = b.data;

      if (this.sortBy === SORT_ADDED) {
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
