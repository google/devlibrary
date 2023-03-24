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
    <!-- Header -->
    <div
      class="header-image full-bleed-header-image px-std border-b border-gray-100"
      style="
        --header-bg-image-desktop: url('/img/banners/desktop/authors-wide.png');
        --header-bg-image-mobile: url('/img/banners/mobile/authors-wide.png');
      "
    >
      <h1 class="full-bleed-hero-heading">Authors</h1>
      <p class="mt-1 hero-description">
        All content on Dev Library is contributed by developers from around the
        world. Browse through the portfolio of individual authors or connect
        with them !
      </p>
    </div>
    <img src="/img/banners/desktop/authors-clipart.png" class="hero-clipart" />

    <!-- Body -->
    <div id="pagebody" class="grid grid-cols-10  mb-20 px-std pt-4 lg:pt-8">
      <div v-if="$mq === 'desktop'" class="lg:col-span-2">
        <AuthorFilters v-model="filters" :product="product"/>
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
              <AuthorFilters v-model="filters" :product="product" :mobile="true"/>
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

      <!-- Search bar -->
      <div class="col-span-10 lg:col-span-8 pl-4 ">

      <div class="frc mb-3">
        <div
          class="frc rounded-lg max-w-lg min-w-0 border border-gray-200 px-2 w-80"
        >
          <font-awesome-icon
            icon="search"
            size="sm"
            class="text-mgray-700 opacity-70"
          />
          <input
            class="px-2 py-1 flex-grow min-w-0"
            type="text"
            id="authorSearchBar"
            @input="setTempAuthorFilter"
            :value="authorFilter"
            placeholder="Search"
          />
          <font-awesome-icon
            v-if="authorFilter.length > 0"
            @click="authorFilter = ''"
            icon="times-circle"
            class="text-mgray-700 cursor-pointer opacity-70"
          />
        </div>
        <MaterialButton
          @click.native="authorFilter = tempAuthorFilter"
          type="primary"
          class="ml-4"
          id="authorSearchButton"
        >
          Go
        </MaterialButton>
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

            <div v-for="item in filters.productAreas" :key="item.value">
              <div
                v-if="item.checked"
                class="mr-2 mb-4 filter-chip"
                @click="removeFilterProductAreas(item.value)"
              >
                <span class="mr-2">{{ item.key }}</span>
                <font-awesome-icon icon="times" class="ml-px" size="sm" />
              </div>
            </div>
          </div>

      <div
        v-if="showNoMatchesMessage"
        class="text-mgray-700 opacity-70 py-8 px-1"
      >
        <font-awesome-icon :icon="['fas', 'exclamation-circle']" class="mr-1" />
        No authors matching your search.
      </div>

      <!-- Author Cards -->
      <div
        class="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
      >
        <!-- Author Card -->
        <div
          v-for="author in displayedAuthors"
          v-show="showAuthor(author)"
          :key="author.id"
          class="card card-clickable px-5 py-4 flex flex-col items-center text-center "
        >
          <CircleImage
            v-if="
              authorImageLoaded[author.id] ||
              authorImageLoaded[author.id] == undefined
            "
            :src="author.metadata.photoURL"
            :lazy="true"
            class="flex-shrink-0 avatar border-none"
            size="small"
          />
          <div v-else v-html="getDynamicAuthorImage(author)"></div>
          <div>
            <div class="mt-2 wrap-lines-1 font-medium font-display">
              {{ author.metadata.name }}
            </div>

            <!-- Icons -->
            <div class="mt-2 flex flex-row justify-center gap-2 text-sm">
              <a
                v-if="author.metadata.githubURL"
                :href="author.metadata.githubURL"
                target="_blank"
                class="icon-link"
              >
                <font-awesome-icon :icon="['fab', 'github']" />
              </a>
              <a
                v-if="author.metadata.mediumURL"
                :href="author.metadata.mediumURL"
                target="_blank"
                class="icon-link"
              >
                <font-awesome-icon :icon="['fab', 'medium']" />
              </a>
            </div>

            <router-link
              :to="`/authors/${author.id}`"
              class="mt-2 flex flex-row justify-center"
            >
              <MaterialButton type="text">View profile</MaterialButton>
            </router-link>
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- Link -->
    <p class="text-xs px-std mt-2 mb-6 text-mgray-700" v-show="loaded">
      If your content is in the Dev Library and you're missing from this page,
      or if you're on this page and would like to update your information, open
      an Issue or send us a Pull Request
      <a
        href="https://github.com/google/devlibrary"
        class="cursor-pointer underline"
        target="_blank"
        >here</a
      >.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import UIModule from "@/store/ui";
import { ALL_PRODUCTS } from "../../../shared/product";

import MaterialButton from "@/components/MaterialButton.vue";
import CircleImage from "@/components/CircleImage.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { ProductConfig } from "../../../shared/types";
import AuthorFilters from "@/components/AuthorFilters.vue";
import { FirestoreQuery } from "../../../shared/types/FirestoreQuery";

import {
  CheckboxGroupEntry,
} from "@/components/CheckboxGroup.vue";

import { ColorJson } from "../assets/ts/profile-colors";
import { AuthorData, BreadcrumbLink } from "../../../shared/types";
import {
  emptyPageResponse,
  nextPage,
  PagedResponse,
  queryAuthors,
  queryUsingAuthorData
} from "@/plugins/data";

@Component({
  components: {
    MaterialButton,
    CircleImage,
    Breadcrumbs,
    AuthorFilters
  },
})
export default class Authors extends Vue {
  private uiModule = getModule(UIModule, this.$store);

  public getBreadcrumbs(): BreadcrumbLink[] {
    return [{ name: "Authors", path: "" }];
  }

  public filters = {
    types: [] as CheckboxGroupEntry[],
    productAreas: [] as CheckboxGroupEntry[],
  };

  public authorFilter = "";
  public tempAuthorFilter = "";
  public authorSelectFilter = "";
  public showFilterOverlay = false;

  public authorImageLoaded: { [key: string]: boolean } = {};
  public urlParams = new URLSearchParams(window.location.search);

  private pagesToShow = 1;
  public allAuthors: AuthorData[] = [];
  public allAuthorDetailedData = new Map();
  public authorData: PagedResponse<AuthorData> = emptyPageResponse<AuthorData>(
    `/authors`,
    {},
    60
  );

  async mounted() {
    const searchButton = document.getElementById("authorSearchBar");
    searchButton?.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("authorSearchButton")?.click();
      }
    });
    const authorData = emptyPageResponse<AuthorData>(
      `/authors`,
      {
        orderBy: [{ fieldPath: "metadata.name", direction: "asc" }],
      },
      60
    );
    const authorsPromise = nextPage(authorData);
    const reloadPromise = Promise.all([authorsPromise]).then(async () => {
      this.pagesToShow = 1;
      for (const author of authorData.pages.flatMap((p) => p)) {
        this.authorImageLoaded[author.id] = await this.getImage(author);
      }
      this.authorData = authorData;
    });
    this.uiModule.waitFor(reloadPromise);

    const res = await queryAuthors({
      orderBy: [{ fieldPath: "metadata.name", direction: "asc" }],
    });
    this.allAuthors = res.docs
      .map((d) => d.data)
      .sort((a, b) => {
        return a.metadata.name
          .toLowerCase()
          .localeCompare(b.metadata.name.toLowerCase());
      });
    for (const author of this.allAuthors) {
      this.authorImageLoaded[author.id] = await this.getImage(author);
    }
  }

  public showAuthor(a: AuthorData): boolean {
    if (this.authorFilter.length === 0) {
      return true;
    }

    return a.metadata.name
      .toLowerCase()
      .includes(this.authorFilter.toLowerCase());
  }

  public removeFilterType(value: string) {
    const f = this.filters.types.find((x) => x.value === value);
    if (f) {
      f.checked = false;
    }
  }

  public removeFilterProductAreas(value: string) {
    const f = this.filters.productAreas.find((x) => x.value === value);
    if (f) {
      f.checked = false;
    }
  }

  public resetFilters() {
    for (const c of this.filters.productAreas) {
      c.checked = false;
    }

    for (const t of this.filters.types) {
      t.checked = false;
    }
  }

  get loaded() {
    return this.authors.length > 0;
  }

  get showNoMatchesMessage() {
    return (
      this.authorFilter.length > 0 &&
      !this.allAuthors.some((a) => this.showAuthor(a))
    );
  }

  get hasContent() {
    return this.authorData.currentPage >= 0;
  }

  get canLoadMore() {
    const canLoadMoreRemote = this.authorData.hasNext;

    const canLoadMoreLocal = this.visibleAuthors.length < this.authors.length;

    return canLoadMoreRemote || canLoadMoreLocal;
  }

  get displayedAuthors() {
    if (this.authorFilter != "" || this.authorSelectFilter != "") {
      return this.allAuthors;
    } else {
      return this.visibleAuthors;
    }
  }

  @Watch("queryParams")
  public async onQueryParamsChanged(q: FirestoreQuery) {

    const selectedProducts = []
    if(q.where){
      if(q.where.length > 0){
        for(const condition of q.where) {
          for(const ele of condition.value) {
            selectedProducts.push(ele)
          }
        }
      }
    }

    const onlyTypeFilter = selectedProducts.every(elem => ["open-source", "blog"].includes(elem))

    if(onlyTypeFilter){
      const x= Object.values(ALL_PRODUCTS).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
      for(const ele of x) {
        selectedProducts.push(ele.key)
      }
    }


    if(selectedProducts.length > 0){
      this.authorSelectFilter = "filter"

      let returnOpenSource = false
      let returnBlogs = false

      if(selectedProducts.includes("open-source")){
        returnOpenSource = true
      }
      if(selectedProducts.includes("blog")){
        returnBlogs = true
      }

      if(!returnOpenSource && !returnBlogs){
        returnOpenSource = true
        returnBlogs = true
      }

      const res = await queryUsingAuthorData(selectedProducts, returnBlogs, returnOpenSource)
      this.allAuthors = res
    } else {
      this.authorSelectFilter = ""
    }
  }

  @Watch("filters", { deep: true })
  public async onFiltersTypeChanged() {
    let hasTypeParams = false;
    let hasProductParams = false;
    let typeParams = "";
    let categoryParams = "";
    let url = `?sort=name`;

    for (const filterType of this.filters.types) {
      if (filterType.checked) {
        if (hasTypeParams) {
          typeParams += ",";
        }
        typeParams += `${filterType.value}`;
        hasTypeParams = true;
      }
    }
    for (const filterCategory of this.filters.productAreas) {
      if (filterCategory.checked) {
        if (hasProductParams) {
          categoryParams += ",";
        }
        categoryParams += `${filterCategory.value}`;
        hasProductParams = true;
      }
    }
    if (hasTypeParams) {
      url += `&type=${typeParams}`;
    }
    if (hasProductParams) {
      url += `&productareas=${categoryParams}`;
    }
    window.history.replaceState(null, "", url);
  }

  @Watch("sortBy")
  public onSortByChanged() {
    this.onFiltersTypeChanged()
  }

  public setTempAuthorFilter(event: { target: { value: string } }) {
    this.tempAuthorFilter = event.target.value;
  }

  public async loadMore() {
    const promises = [];

    if (this.authorData.hasNext) {
      promises.push(nextPage(this.authorData));
    }

    await this.uiModule.waitFor(Promise.all(promises));
    this.pagesToShow++;
  }

  public async getImage(author: AuthorData) {
    if (author) {
      const imageExists = await this.imageExists(author.metadata.photoURL);
      if (!imageExists) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  public async imageExists(imgUrl: string) {
    if (!imgUrl) {
      return false;
    }
    return new Promise((res) => {
      const image = new Image();
      image.onload = () => res(true);
      image.onerror = () => res(false);
      image.src = imgUrl;
    });
  }

  private getHashCode(text: string): number {
    let hash = 0,
      i,
      chr,
      len;
    if (text.length == 0) return hash;
    for (i = 0, len = text.length; i < len; i++) {
      chr = text.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  public getDynamicAuthorImage(author: AuthorData) {
    const name = author?.metadata.name.replace(/[().]/gi, "");
    const separatedNames = name?.split(" ");

    let initials = "";
    if (separatedNames && separatedNames?.length > 0) {
      initials += separatedNames[0].charAt(0).toUpperCase();
    }

    const hash = this.getHashCode(initials || "");
    const colorData = ColorJson[hash % ColorJson.length];
    const imageHtml = `<div class="dynamic-author-image-medium"
      style="background-color: ${colorData.background}; color: ${colorData.color}">
      ${initials}</div>`;

    return imageHtml;
  }

  get authors(): AuthorData[] {
    if (this.authorData.pages.length <= 0) {
      return [];
    }
    return this.authorData.pages.flatMap((p) => p);
  }

  get visibleAuthors(): AuthorData[] {
    const maxToShow = 60 * this.pagesToShow;
    return this.authors.slice(0, maxToShow);
  }

  get queryTags(): string[] | null {
    // If no selection, consider them all checked
    const noneCategoryChecked = this.filters.productAreas.every(
      (c) => !c.checked
    );
    if (noneCategoryChecked) {
      return null;
    }

    return this.filters.productAreas.filter((x) => x.checked).map((x) => x.value);
  }


  get queryTypes(): string[] | null {
    // If no selection, consider them all checked
    const noneCategoryChecked = this.filters.types.every(
      (c) => !c.checked
    );
    if (noneCategoryChecked) {
      return null;
    }

    return this.filters.types.filter((x) => x.checked).map((x) => x.value);
  }


  get product(): ProductConfig[] {
    return Object.values(ALL_PRODUCTS).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  get queryParams(): FirestoreQuery {
    const tags = this.queryTags;
    const types = this.queryTypes;

    const q: FirestoreQuery = {orderBy: [],};

    if (tags) {
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

    if (types) {
      if (types.length > 0) {
        if(q.where){
          q.where.push(
          {
            fieldPath: "metadata.tags",
            operator: "array-contains-any",
            value: types,
          },
        );
        } else {
          q.where = [
          {
            fieldPath: "metadata.tags",
            operator: "array-contains-any",
            value: types,
          },
        ];
        }
      }
    }

    return q;
  }
}
</script>

<style scoped lang="postcss">
.avatar {
  width: 60px;
  height: 60px;
}

.icon-link {
  @apply relative text-gray-500 hover:text-gray-900;
}

a {
  @apply cursor-pointer;
}

input {
  outline: none;
}

#pagebody {
  min-height: 60vh;
}

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
