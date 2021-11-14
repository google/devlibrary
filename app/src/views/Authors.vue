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
      <div class="mt-4 frc rounded-lg max-w-lg border border-gray-200 px-2">
        <font-awesome-icon
          icon="search"
          size="sm"
          class="text-mgray-700 opacity-70"
        />
        <input
          class="px-2 py-1 flex-grow"
          type="text"
          v-model="authorFilter"
          placeholder="Search for authors"
        />
        <font-awesome-icon
          v-if="authorFilter.length > 0"
          @click="authorFilter = ''"
          icon="times-circle"
          class="text-mgray-700 cursor-pointer opacity-70"
        />
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
          v-for="author in authors"
          v-show="showAuthor(author)"
          :key="author.id"
          class="card card-clickable px-5 py-4 flex flex-col items-center text-center"
        >
          <CircleImage
            :src="author.metadata.photoURL"
            :lazy="true"
            class="flex-shrink-0 avatar border-none"
            size="small"
          />
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

import { AuthorData } from "../../../shared/types";
import { queryAuthors } from "@/plugins/data";

@Component({
  components: {
    MaterialButton,
    CircleImage,
  },
})
export default class Authors extends Vue {
  private uiModule = getModule(UIModule, this.$store);

  public authorFilter = "";
  public authors: AuthorData[] = [];

  mounted() {
    this.uiModule.waitFor(this.loadContent());
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
      !this.authors.some((a) => this.showAuthor(a))
    );
  }

  private async loadContent() {
    // TODO: When we get more authors we will probably want to paginate this, but it's ok
    //       for now.
    const res = await queryAuthors({
      orderBy: [{ fieldPath: "metadata.name", direction: "asc" }],
    });

    this.authors = res.docs
      .map((d) => d.data)
      .sort((a, b) => {
        return a.metadata.name
          .toLowerCase()
          .localeCompare(b.metadata.name.toLowerCase());
      });
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
