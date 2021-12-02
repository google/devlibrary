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
    <template v-if="loaded" v-slot:header>
      <!-- Header (Desktop) -->
      <div class="desktop-only">
        <div
          :class="[productStyle.bg, productStyle.text]"
          class="py-20 grid grid-cols-10 gap-4"
        >
          <div class="col-start-2 col-span-7">
            <h1 :class="[productStyle.text]">
              {{ repo.metadata.name }}
            </h1>
            <p class="mt-2">
              {{ repo.metadata.longDescription }}
            </p>

            <p v-if="authors.length > 0" class="flex gap-2 mt-2">
              <AuthorLink
                v-for="author in authors"
                :key="author.id"
                :author="author"
                class="opacity-80 hover:opacity-100"
              />
            </p>

            <a
              target="blank"
              :href="`https://github.com/${repo.metadata.owner}/${repo.metadata.repo}`"
            >
              <MaterialButton type="secondary" class="mt-8">
                View on GitHub
                <font-awesome-icon icon="external-link-alt" class="ml-1" />
              </MaterialButton>
            </a>
          </div>

          <div class="col-start-9 col-span-2">
            <p class="pt-1">
              {{ repo.stats.stars }}
              <font-awesome-icon fixed-width icon="star" />
            </p>
            <p class="pt-1">
              {{ repo.stats.forks }}
              <font-awesome-icon fixed-width icon="code-branch" />
            </p>
          </div>
        </div>
      </div>

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
          <li><a :href="product.docsUrl" target="_blank">Official Docs</a></li>
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
    <div class="grid grid-cols-10 gap-4 mb-10 lg:mb-20">
      <div
        v-if="content != null"
        class="col-span-10 px-8 lg:px-0 lg:col-start-2 lg:col-span-8"
      >
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
            v-if="s.content.length > 0"
            class="prose mt-4 lg:mt-8"
            :key="`content-${s.name}`"
            v-html="sanitize(s.content)"
          ></div>
        </template>
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import DOMPurify from "dompurify";

import MaterialButton from "@/components/MaterialButton.vue";
import AuthorLink from "@/components/AuthorLink.vue";
import HeaderBodyLayout from "@/components/HeaderBodyLayout.vue";
import UIModule from "@/store/ui";

import { ALL_PRODUCTS } from "../../../shared/product";
import {
  AuthorData,
  RepoData,
  RepoPage,
  ProductConfig,
} from "../../../shared/types";
import * as util from "../../../shared/util";
import { fetchAuthor, fetchRepo, fetchRepoPage } from "@/plugins/data";
import { getStyle, ProductStyle } from "@/model/product";

// Global HLJS
// eslint-disable-next-line
declare const hljs: any;

@Component({
  components: {
    MaterialButton,
    AuthorLink,
    HeaderBodyLayout,
  },
})
export default class Repo extends Vue {
  public product!: ProductConfig;
  public repo: RepoData | null = null;
  public content: RepoPage | null = null;
  public authors: AuthorData[] = [];

  private productKey!: string;
  private id!: string;

  private uiModule = getModule(UIModule, this.$store);

  async mounted() {
    this.productKey = this.$route.params["product"];
    this.id = this.$route.params["repo"];
    this.product = ALL_PRODUCTS[this.productKey];

    const p = this.loadContent();

    this.uiModule.waitFor(p);

    // After contetn has loaded, highlight all code blocks with HLJS
    p.then(() => {
      hljs && hljs.highlightAll();
    });
  }

  async loadContent() {
    this.repo = await fetchRepo(this.productKey, this.id);

    const authorIds = this.repo.metadata.authorIds || [];
    for (const aid of authorIds) {
      // We don't want a failed author fetch to block the rest of the page rendering
      try {
        const data = await fetchAuthor(aid);
        this.authors.push(data);
      } catch (e) {
        console.warn(`Failed to fetch author ${aid}`, e);
      }
    }

    const pagePath =
      this.$route.params["page"] ||
      util.cleanPagePath(this.repo.metadata.content);
    const pageKey = btoa(pagePath);

    this.content = await fetchRepoPage(this.productKey, this.id, pageKey);
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
}
</script>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply font-bold text-gblue-600;
}

a {
  @apply hover:underline;
}

.prose {
  max-width: 900px;
}
</style>
