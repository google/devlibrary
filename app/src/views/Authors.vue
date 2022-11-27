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
      class="header-image py-10 lg:py-20 px-std border-b border-gray-100"
      style="
        --header-bg-image-desktop: url('/img/banners/desktop/authors-wide.png');
        --header-bg-image-mobile: url('/img/banners/mobile/authors-wide.png');
      "
    >
      <h1>Authors</h1>
      <p class="mt-1">
        All content on Dev Library is contributed by our incredible authors!
      </p>
    </div>

    <!-- Body -->
    <div id="pagebody" class="mb-4 px-std">
      <!-- Search bar -->
      <div class="frc">
        <div
          class="mt-4 frc rounded-lg max-w-lg min-w-0 border border-gray-200 px-2 w-80"
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
          class="ml-4 mt-4"
          id="authorSearchButton"
        >
          Go
        </MaterialButton>
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
        class="py-4 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        <!-- Author Card -->
        <div
          v-for="author in displayedAuthors"
          v-show="showAuthor(author)"
          :key="author.id"
          class="card card-clickable px-5 py-4 flex flex-col items-center text-center"
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

    <!-- Pagination -->
    <div
      v-show="canLoadMore && authorFilter === ''"
      class="mt-2 mb-6 flex flex-col items-center place-content-center"
    >
      <MaterialButton v-if="canLoadMore" type="text" @click.native="loadMore">
        <div class="frc">
          <span>Load more</span>
          <font-awesome-icon icon="chevron-down" class="pt-px ml-2" />
        </div>
      </MaterialButton>
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
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import UIModule from "@/store/ui";

import MaterialButton from "@/components/MaterialButton.vue";
import CircleImage from "@/components/CircleImage.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

import { ColorJson } from "../assets/ts/profile-colors";
import { AuthorData, BreadcrumbLink } from "../../../shared/types";
import {
  emptyPageResponse,
  nextPage,
  PagedResponse,
  queryAuthors,
} from "@/plugins/data";

@Component({
  components: {
    MaterialButton,
    CircleImage,
    Breadcrumbs,
  },
})
export default class Authors extends Vue {
  private uiModule = getModule(UIModule, this.$store);

  public getBreadcrumbs(): BreadcrumbLink[] {
    return [{ name: "Authors", path: "" }];
  }

  public authorFilter = "";
  public tempAuthorFilter = "";

  public authorImageLoaded: { [key: string]: boolean } = {};

  private pagesToShow = 1;
  public allAuthors: AuthorData[] = [];
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
    if (this.authorFilter != "") {
      return this.allAuthors;
    } else {
      return this.visibleAuthors;
    }
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
</style>
