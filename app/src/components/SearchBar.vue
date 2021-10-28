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
  <div class="relative">
    <div class="stack">
      <input
        type="text"
        class="stack-child w-32 lg:w-40 xl:w-52 bg-gray-100 text-gray-500 text-sm lg:text-base pl-7 pr-6 py-1 shadow-inner rounded"
        placeholder="Search"
        @focusin="focus = true"
        @blur="focus = false"
        v-model="query"
      />

      <font-awesome-icon
        icon="search"
        size="sm"
        class="stack-child self-center text-gray-400 ml-2"
      />

      <font-awesome-icon
        v-if="query.length > 0"
        @click="clear()"
        icon="times-circle"
        size="sm"
        class="stack-child self-center justify-self-end cursor-pointer text-gray-400 mr-1"
      />
    </div>

    <!-- Results -->
    <div
      v-if="showResults"
      class="absolute right-0 top-full mt-1 w-72 lg:w-96 bg-white border rounded overflow-hidden shadow-lg"
    >
      <div class="px-2 py-1 border-b border-gray-200">
        <span class="font-bold uppercase tracking-widest text-xs">Results</span>
      </div>
      <div class="font-sans">
        <div v-if="searching" class="px-2 py-1 opacity-50">Searching...</div>
        <div v-else-if="results.length === 0" class="px-2 py-1 opacity-50">
          No results...
        </div>

        <div v-else>
          <a
            v-for="res in displayResults"
            :key="res.link"
            :href="res.link"
            class="frc cursor-pointer hover:bg-gray-50 border-b border-gray-100"
          >
            <div class="pl-2">
              <font-awesome-icon :icon="res.icon" fixed-width />
            </div>
            <div class="px-3 py-2">
              <p class="font-medium font-display">{{ res.title }}</p>
              <p class="text-sm wrap-lines-2">
                {{ res.description }}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { elasticSearch } from "@/plugins/data";
import { Component, Vue, Watch } from "vue-property-decorator";
import { SearchResult } from "../../../shared/types";

@Component
export default class SearchBar extends Vue {
  public query = "";
  public focus = false;
  public searching = false;
  public results: SearchResult[] = [];
  public searchFn = this.debounce(this.search, 500);

  private debounce(func: Function, wait: number) {
    let timeout: number;

    return function executedFunction() {
      const later = () => {
        clearTimeout(timeout);
        func();
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  private clear() {
    this.query = "";
    this.results = [];
    this.searching = false;
  }

  private async search() {
    const q = this.query;
    if (q === "") {
      this.clear();
      return;
    }

    this.searching = true;
    const res = await elasticSearch(q);
    this.searching = false;

    console.log(`Results for ${q}`, res.length);
    this.results = res;
  }

  @Watch("query")
  public async onQueryChange() {
    if (this.query.length === 0) {
      this.searching = false;
      this.results = [];
    } else {
      this.searching = true;
      this.searchFn();
    }
  }

  public toDisplay(res: SearchResult) {
    if (res.type === "repo") {
      return {
        icon: ["fab", "github"],
        title: res.data.metadata.repo,
        description: res.data.metadata.shortDescription,
        link: `/products/${res.data.product}/repos/${res.data.id}`,
      };
    } else if (res.type === "blog") {
      return {
        icon: ["fas", "clipboard-list"],
        title: res.data.metadata.author,
        description: res.data.metadata.title,
        link: res.data.metadata.link,
      };
    } else {
      return {
        icon: "user",
        title: res.data.metadata.name,
        description: "DevLibrary Author",
        link: `/authors/${res.data.id}`,
      };
    }
  }

  get displayResults() {
    return this.results.map(this.toDisplay);
  }

  get showResults() {
    return (
      this.searching ||
      (this.focus && this.query.length > 0) ||
      this.results.length > 0
    );
  }
}
</script>

<style scoped lang="postcss">
.stack {
  display: grid;
}

.stack-child {
  grid-area: 1 / 1 / 2 / 2;
}
</style>
