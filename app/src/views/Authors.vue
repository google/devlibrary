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
    <div class="grid gap-4 mb-8" v-if="loaded">
      <!-- Author Cards -->
      <div
        class="py-4 px-4 lg:px-6 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        <!-- Author Card -->
        <div
          v-for="author in authors"
          :key="author.id"
          class="card px-5 py-4 flex flex-col items-center text-center"
        >
          <CircleImage
            :src="author.metadata.photoURL"
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
    <p class="text-sm col-start-2 col-span-8 opacity-50">
      If you believe you should be on this page, or if you're on this page and
      would like to update your information, open an Issue or send us a Pull
      Request
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
.card {
  @apply rounded-lg border border-gray-200 overflow-hidden transition-shadow hover:shadow;
}

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
</style>
