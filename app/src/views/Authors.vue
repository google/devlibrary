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
    <div class="grid grid-cols-10 gap-4 bg-gray-50 border-b border-gray-100">
      <div class="col-start-2 col-span-8">
        <div class="py-10">
          <h1 class="text-2xl lg:text-3xl font-semibold">Authors</h1>
          <p class="mt-1">
            All content on Dev Library is contributed by our incredible authors!
          </p>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-8" v-if="loaded">
      <!-- Author Cards -->
      <div class="col-start-2 col-span-8">
        <div
          class="py-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="author in authors"
            :key="author.id"
            class="card px-3 py-3 flex flex-row items-center"
          >
            <router-link
              :to="`/authors/${author.id}`"
              class="flex-shrink-0 mr-2"
            >
              <CircleImage
                :src="author.metadata.photoURL"
                class="border-gray-200"
                size="small"
              />
            </router-link>
            <div>
              <router-link
                :to="`/authors/${author.id}`"
                class="wrap-lines-1 text-lg font-bold font-display"
              >
                {{ author.metadata.name }}
              </router-link>
              <div class="flex flex-row gap-2 text-sm">
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
            </div>
          </div>
        </div>
      </div>

      <!-- Link -->
      <p class="text-sm col-start-2 col-span-8 opacity-50">
        If you're listed on this page and would like to update your information,
        open an Issue or send us a Pull Request
        <a
          href="https://github.com/google/devlibrary"
          class="cursor-pointer underline"
          target="_blank"
          >here</a
        >.
      </p>
    </div>
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

  public authors: AuthorData[] = [];

  mounted() {
    this.uiModule.waitFor(this.loadContent());
  }

  get loaded() {
    return this.authors.length > 0;
  }

  private async loadContent() {
    // TODO: When we get more authors we will probably want to paginate this, but it's ok
    //       for now.
    const res = await queryAuthors({
      orderBy: [{ fieldPath: "metadata.name", direction: "asc" }],
    });

    this.authors = res.docs.map((d) => d.data);
  }
}
</script>

<style scoped lang="postcss">
.card {
  @apply rounded overflow-hidden border border-gray-50 shadow transition-shadow hover:shadow-lg;
}

.icon-link {
  @apply relative text-gray-500 hover:text-gray-900;
}

a {
  @apply cursor-pointer;
}

.wrap-lines-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
