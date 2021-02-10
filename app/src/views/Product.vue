<template>
  <HeaderSidebarLayout>
    <template v-slot:header>
      <!-- Header (Mobile) -->
      <div class="mobile-only">
        <div
          :class="[product.classes.bg]"
          class="mobile-only flex flex-row items-center px-6 py-4"
        >
          <div
            :class="[product.classes.iconBorder]"
            class="p-1 w-10 h-10 border-4 bg-white rounded-full"
          >
            <!-- TODO: Need to make sure these images are square! -->
            <img :src="`/logos/${product.key}.png`" />
          </div>

          <h1 class="text-2xl ml-2" :class="[product.classes.text]">
            {{ product.name }}
          </h1>
        </div>
      </div>

      <!-- Header (Desktop) -->
      <div class="desktop-only">
        <div
          :class="[product.classes.bg]"
          class="py-20 grid grid-cols-10 gap-4"
        >
          <div
            :class="[product.classes.text]"
            class="col-start-2 col-span-5 text-white"
          >
            <h1 class="text-3xl font-semibold">
              {{ product.name }}
            </h1>
            <p class="mt-2">{{ product.description }}</p>
            <a :href="product.docsUrl" target="blank">
              <MaterialButton type="secondary" class="mt-8">
                Official Docs
                <font-awesome-icon icon="external-link-alt" class="ml-1" />
              </MaterialButton>
            </a>
          </div>

          <div class="col-start-8 col-span-2">
            <div
              :class="[product.classes.iconBorder]"
              class="w-2/3 p-4 border-4 bg-white rounded-full"
            >
              <!-- TODO: Need to make sure these images are square! -->
              <img :src="`/logos/${product.key}.png`" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:sidebar>
      <!-- Side bar -->
      <div>
        <p class="uppercase font-medium mt-4 mb-2">Sort</p>

        <RadioGroup
          prefix="sort"
          :keys="['Recently Added', 'Recently Updated']"
          :values="['added', 'updated']"
        />

        <p class="uppercase font-medium mt-4 mb-2">Type</p>

        <CheckboxGroup
          prefix="type"
          :keys="['Open Source', 'Blog Posts']"
          :values="['open-source', 'blog']"
          v-model="types"
        />

        <p class="uppercase font-medium mt-4 mb-2">Category</p>

        <CheckboxGroup
          prefix="category"
          :keys="product.tags.map((t) => t.key)"
          :values="product.tags.map((t) => t.value)"
          v-model="categories"
        />
      </div>
    </template>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-20">
      <div class="col-span-10 px-6 lg:px-0 lg:col-start-2 lg:col-span-8">
        <!-- Open Source -->
        <div v-if="showOpenSource">
          <h2 class="text-2xl mt-8">Open Source</h2>

          <div v-if="repos.length === 0" class="mt-4">
            No projects matching your filters...
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LargeRepoCard
              class="mt-4"
              v-for="repo in repos"
              :key="repo.name"
              :link="repoPath(repo)"
              :product="product.key"
              :repo="repo"
            />
          </div>
        </div>

        <!-- Blog Posts -->
        <div v-if="showBlogPosts">
          <h2 class="text-2xl mt-8">Blog Posts</h2>

          <div v-if="blogs.length === 0" class="mt-4">
            No blog posts matching your filters...
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LargeBlogCard
              class="mt-4"
              v-for="blog in blogs"
              :key="blog.title"
              :product="product.key"
              :blog="blog"
            />
          </div>
        </div>
      </div>
    </div>
  </HeaderSidebarLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import { BlogData, RepoData } from "../../../shared/types";

import UIModule from "@/store/ui";

import MaterialButton from "@/components/MaterialButton.vue";
import LargeRepoCard from "@/components/LargeRepoCard.vue";
import LargeBlogCard from "@/components/LargeBlogCard.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import CheckboxGroup, {
  CheckboxGroupEntry,
} from "@/components/CheckboxGroup.vue";
import HeaderSidebarLayout from "@/components/HeaderSidebarLayout.vue";

import { ProductConfig, ALL_PRODUCTS } from "@/model/product";
import { fetchBlogs, fetchRepos } from "@/plugins/data";

@Component({
  components: {
    MaterialButton,
    LargeRepoCard,
    LargeBlogCard,
    RadioGroup,
    CheckboxGroup,
    HeaderSidebarLayout,
  },
})
export default class Product extends Vue {
  private uiModule = getModule(UIModule, this.$store);

  public types: CheckboxGroupEntry[] = [];
  public categories: CheckboxGroupEntry[] = [];

  private allRepos: RepoData[] = [];
  private allBlogs: BlogData[] = [];

  mounted() {
    const reposPromise = fetchRepos(this.product.key, {
      limit: 10,
    }).then((data) => this.allRepos.push(...data));

    const blogsPromise = fetchBlogs(this.product.key, {
      limit: 10,
    }).then((data) => this.allBlogs.push(...data));

    this.uiModule.waitFor(Promise.all([reposPromise, blogsPromise]));
  }

  public repoPath(repo: RepoData) {
    return `/products/${this.product.key}/repos/${repo.id}`;
  }

  get product(): ProductConfig {
    return ALL_PRODUCTS[this.$route.params["product"]];
  }

  get showOpenSource(): boolean {
    return this.types.some((t) => t.value === "open-source" && t.checked);
  }

  get showBlogPosts(): boolean {
    return this.types.some((t) => t.value === "blog" && t.checked);
  }

  get selectedCategories(): Set<string> {
    return new Set(
      this.categories.filter((x) => x.checked).map((x) => x.value)
    );
  }

  get repos() {
    // TODO: This filter should be done in the VueX module as a db query
    return this.allRepos.filter((x) => {
      return (
        x.metadata.tags &&
        x.metadata.tags.some((t) => this.selectedCategories.has(t))
      );
    });
  }

  get blogs() {
    // TODO: This filter should be done in the VueX module as a db query
    return this.allBlogs.filter((x) => {
      return (
        x.metadata.tags &&
        x.metadata.tags.some((t) => this.selectedCategories.has(t))
      );
    });
  }
}
</script>

<style scoped lang="postcss"></style>
