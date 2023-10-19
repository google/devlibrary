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
  <div class="content-bg">
    <Breadcrumbs v-if="loaded" :links="getBreadcrumbs()" class="bg-white" />
    <HeaderBodyLayout>
      <template v-if="loaded" v-slot:header>
        <!-- Header (Desktop) -->
        <div class="desktop-only">
          <div
            class="header-image full-bleed-header-image repo-hero px-std border-b border-gray-100"
            style="
              --header-bg-image-desktop: url('/img/banners/desktop/product-wide.png');
            "
          >
            <div class="grid">
              <h1>
                {{ repo.metadata.name }}
              </h1>
              <div class="repo-items">
                <p class="repo-item">
                  <font-awesome-icon fixed-width icon="star" />
                  {{ repo.stats.stars }}
                </p>
                <p class="repo-item">
                  <font-awesome-icon fixed-width icon="code-branch" />
                  {{ repo.stats.forks }}
                </p>
              </div>
              <p v-if="authors.length > 0" class="flex gap-2 mt-2">
                <AuthorLink
                  v-for="author in authors"
                  :key="author.id"
                  :author="author"
                  class="opacity-80 hover:opacity-100"
                />
              </p>
              <p class="text-gray-500 text-sm">
                Added on {{ (new Date(repo.stats.dateAdded)).toLocaleDateString('en-us', { day: "numeric" , year:"numeric", month:"long"}) }}
              </p>
              <p class="mt-2 hero-description">
                {{ repo.metadata.longDescription }}
              </p>
              <a
                target="blank"
                :href="`https://github.com/${repo.metadata.owner}/${repo.metadata.repo}`"
              >
                <MaterialButton type="primary" class="mt-8">
                  View on GitHub
                  <font-awesome-icon icon="external-link-alt" class="ml-1" />
                </MaterialButton>
              </a>
            </div>
          </div>
        </div>
        <img
          src="/img/banners/desktop/product-clipart.png"
          class="product-hero-clipart"
        />

        <!-- Header (Mobile) -->
        <div class="mobile-only">
          <div :class="[productStyle.bg, productStyle.text]" class="py-4 px-8">
            <h2 :class="[productStyle.text]" class="mb-2">
              {{ repo.metadata.name }}
            </h2>
            <p class="opacity-80 text-sm">
              {{ repo.metadata.shortDescription }}
            </p>
            <p v-if="authors.length > 0" class="flex gap-2 mt-4">
              <AuthorLink
                v-for="author in authors"
                :key="author.id"
                :author="author"
                class="opacity-80 hover:opacity-100"
              />
            </p>
          </div>
        </div>
      </template>

      <template v-if="loaded" v-slot:sidebar>
        <!-- Side bar -->
        <div>
          <p class="uppercase font-medium mt-4 mb-2">{{ product.name }}</p>
          <ul class="text-sm">
            <li>
              <router-link :to="`/products/${productKey}`"
                >All Projects</router-link
              >
            </li>
            <li>
              <a :href="product.docsUrl" target="_blank">Official Docs</a>
            </li>
          </ul>

          <p class="uppercase font-medium mt-4 mb-2">Project</p>
          <ul class="text-sm">
            <li><router-link :to="fullPagePath()">Home</router-link></li>
            <li v-for="p in repo.metadata.pages" :key="p.path">
              <router-link :to="fullPagePath(p.path)">{{ p.name }}</router-link>
            </li>
            <li>
              <router-link :to="fullPagePath('license')">License</router-link>
            </li>
          </ul>

          <div v-if="repo.metadata.links">
            <p class="uppercase font-medium mt-4 mb-2">Links</p>
            <ul class="text-sm">
              <li v-for="l in repo.metadata.links" :key="l.href">
                <a :href="l.href" target="_blank">{{ l.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <!-- Body -->
      <div class="grid grid-cols-10 px-2 lg:gap-4 lg:grid-cols-10 lg:mb-0">
        <div
          v-if="content != null"
          class="grid grid-cols-10 col-span-10 lg:col-span-7"
        >
          <div class="col-span-10">
            <template v-for="(s, i) in content.sections">
              <!-- Only show headers for sections after the first one -->
              <h2
                v-if="i > 0 && s.name.length > 0"
                class="mt-8 mb-2"
                :key="`header-${s.name}`"
              >
                {{ s.name }}
              </h2>
              <!-- The 'prose' class comes from the Tailwind typography plugin -->
              <div
                class="bg-white mt-8 ml-2 mr-2 lg:mr-0 lg:ml-4"
                :key="`section-${s.name}`"
              >
                <div
                  class="font-bold border-b pl-8 pt-3 pb-3"
                  :key="`header-${s.name}`"
                >
                  {{ content.path }}
                </div>
                <div
                  v-if="s.content.length > 0"
                  class="prose mt-4 lg:mt-2 p-8"
                  :key="`content-${s.name}`"
                  v-html="sanitize(s.content)"
                ></div>
              </div>
            </template>
          </div>
        </div>
        <div class="grid grid-cols-10 col-span-10 px-1 pt-8 mb-8 lg:col-span-3">
          <div
            class="mx-2 lg:mx-0 col-span-10 lg:col-start-1"
            v-if="content != null && projects.length > 0"
          >
            <div class="bg-white border-b pl-4 pb-2 pt-4">Related Content</div>
            <RepoOrBlogCard
              v-for="project in projects"
              class="bg-white"
              :key="project.data.id"
              :project="project"
              :showLogo="true"
              :showTags="false"
            />
          </div>
        </div>

        <!-- For debugging only: refresh content button -->
        <div v-if="showRefreshButton" class="fixed z-50 bottom-4 right-4">
          <MaterialButton
            type="primary"
            class="mt-8"
            @click.native="refreshContent()"
          >
            Refresh
          </MaterialButton>
        </div>
      </div>
    </HeaderBodyLayout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import DOMPurify from "dompurify";

import MaterialButton from "@/components/MaterialButton.vue";
import AuthorLink from "@/components/AuthorLink.vue";
import HeaderBodyLayout from "@/components/HeaderBodyLayout.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import UIModule from "@/store/ui";
import RepoOrBlogCard from "@/components/RepoOrBlogCard.vue";

import { ALL_PRODUCTS } from "../../../shared/product";
import {
  AuthorData,
  BreadcrumbLink,
  RepoData,
  RepoPage,
  ProductConfig,
} from "../../../shared/types";
import * as util from "../../../shared/util";
import {
  fetchAuthor,
  fetchRepo,
  fetchRepoPage,
  wrapInHolders,
  recommendedRepos,
} from "@/plugins/data";
import { waitForHljsLoad } from "@/plugins/preload";
import { getStyle, ProductStyle } from "@/model/product";

// Global HLJS
// eslint-disable-next-line
declare const hljs: any;

@Component({
  components: {
    MaterialButton,
    AuthorLink,
    HeaderBodyLayout,
    Breadcrumbs,
    RepoOrBlogCard,
  },
})
export default class Repo extends Vue {
  public product!: ProductConfig;
  public repo: RepoData | null = null;
  public content: RepoPage | null = null;
  public authors: AuthorData[] = [];
  public reposRecommended: RepoData[] = [];

  public getBreadcrumbs(): BreadcrumbLink[] {
    return [
      { name: this.product?.name ?? "Product", path: "../" },
      { name: this.repo?.metadata.name ?? "Repo", path: "" },
    ];
  }

  private productKey!: string;
  private id!: string;

  private uiModule = getModule(UIModule, this.$store);

  async mounted() {
    this.productKey = this.$route.params["product"];
    this.id = this.$route.params["repo"];
    this.product = ALL_PRODUCTS[this.productKey];

    const p = this.loadContent();

    this.uiModule.waitFor(p);

    // After content has loaded, highlight all code blocks with HLJS
    p.then(() => waitForHljsLoad()).then(() => {
      hljs && hljs.highlightAll();
    });
  }

  async loadContent() {
    const repo = await fetchRepo(this.productKey, this.id);
    if (repo) {
      this.repo = repo;
    } else {
      this.$router.push("/404");
      return;
    }

    // fetch recommended repo data for the repo
    this.reposRecommended = await recommendedRepos(
      this.productKey,
      {},
      repo.metadata.tags,
      repo.metadata.expertise,
      repo.id
    );

    const authorIds = this.repo.metadata.authorIds || [];
    for (const aid of authorIds) {
      // We don't want a failed author fetch to block the rest of the page rendering
      try {
        const data = await fetchAuthor(aid);
        if (data) {
          this.authors.push(data);
        } else {
          console.warn(`Author not found: ${aid}`);
        }
      } catch (e) {
        console.warn(`Failed to fetch author ${aid}`, e);
      }
    }

    const pagePath =
      this.$route.params["page"] ||
      util.cleanPagePath(this.repo.metadata.content);
    const pageKey = btoa(pagePath);

    const content = await fetchRepoPage(this.productKey, this.id, pageKey);
    if (content) {
      for (const section of content.sections) {
        let indexCursor = 0;
        while (
          section.content
            .substring(indexCursor)
            .includes('src="https://github.com')
        ) {
          const startIndex =
            section.content
              .substring(indexCursor)
              .indexOf('src="https://github.com') +
            indexCursor +
            5;
          const endIndex =
            startIndex + section.content.substring(startIndex).indexOf('"');
          const imageHtml = section.content.substring(startIndex, endIndex);
          const imageExists = await this.imageExists(imageHtml);
          if (!imageExists) {
            const formattedImageHtml = imageHtml
              .replace(
                "https://github.com",
                "https://raw.githubusercontent.com"
              )
              .replace("/blob", "");
            section.content = section.content.replace(
              imageHtml,
              formattedImageHtml
            );
          }
          indexCursor = endIndex;
        }
      }
      this.content = content;
    } else {
      this.$router.push("/404");
      return;
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

  public fullPagePath(path?: string) {
    const base = `/products/${this.productKey}/repos/${this.repo?.id}`;
    if (!path) {
      return base;
    }

    return `${base}/pages/${util.cleanPagePath(path)}`;
  }

  public sanitize(dirty: string) {
    // TODO: Should probably do this on the server for the best security
    return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
  }

  public async refreshContent() {
    const res = fetch(
      `http://localhost:5001/ugc-site-dev/us-central1/forceRefreshRepo?product=${this.productKey}&id=${this.id}`,
      { mode: "no-cors" }
    );

    this.uiModule.waitFor(res);
    res.then(() => location.reload());
  }

  get productStyle(): ProductStyle {
    return getStyle(this.productKey);
  }

  get showRefreshButton() {
    return process.env.NODE_ENV === "development";
  }

  get loaded() {
    return this.repo != null;
  }

  get projects() {
    return wrapInHolders([], this.reposRecommended).sort((a, b) => {
      return b.data.stats.lastUpdated - a.data.stats.lastUpdated;
    });
  }
}
</script>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply font-bold text-gblue-600;
}

a {
  @apply hover:underline;
}

.content-bg {
  background-color: #f8f9fa;
}
</style>
