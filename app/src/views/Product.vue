<template>
  <HeaderSidebarLayout>
    <template v-slot:header>
      <!-- Header -->
      <div
        :class="[`bg-${product.key}-bg`]"
        class="py-20 grid grid-cols-10 gap-4"
      >
        <div
          :class="[`text-${product.key}-text`]"
          class="col-start-2 col-span-5 text-white"
        >
          <h1 class="font-display text-3xl font-semibold">
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
            :class="[`border-${product.key}-accent`]"
            class="w-2/3 p-4 border-4 bg-white rounded-full"
          >
            <!-- TODO: Need to make sure these images are square! -->
            <img :src="`/logos/${product.key}.png`" />
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
          :keys="['Recently Updated', 'Most Popular', 'Trending Now']"
          :values="['updated', 'popular', 'trending']"
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
          :keys="['Android', 'iOS', 'Web', 'Games', 'Node', 'Admin']"
          :values="['android', 'ios', 'web', 'games', 'node', 'admin']"
          v-model="categories"
        />
      </div>
    </template>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-20">
      <div class="col-start-2 col-span-8">
        <!-- Open Source -->
        <div v-if="showOpenSource">
          <h2 class="font-display text-2xl mt-8">Open Source</h2>

          <div v-if="projects.length === 0" class="mt-4">
            No projects matching your filters...
          </div>

          <div class="grid grid-cols-2 gap-4">
            <LargeProjectCard
              class="mt-4"
              v-for="project in projects"
              :key="project.name"
              :project="project"
            />
          </div>
        </div>

        <!-- Blog Posts -->
        <div v-if="showBlogPosts">
          <h2 class="font-display text-2xl mt-8">Blog Posts</h2>

          <div v-if="blogs.length === 0" class="mt-4">
            No blog posts matching your filters...
          </div>

          <div class="grid grid-cols-2 gap-4">
            <LargeBlogCard
              class="mt-4"
              v-for="blog in blogs"
              :key="blog.title"
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

import ProjectModule from "@/store/project";
import BlogModule from "@/store/blog";

import MaterialButton from "@/components/MaterialButton.vue";
import LargeProjectCard from "@/components/LargeProjectCard.vue";
import LargeBlogCard from "@/components/LargeBlogCard.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import CheckboxGroup, {
  CheckboxGroupEntry,
} from "@/components/CheckboxGroup.vue";
import HeaderSidebarLayout from "@/components/HeaderSidebarLayout.vue";

import { ProductConfig, ALL_PRODUCTS } from "@/model/product";

@Component({
  components: {
    MaterialButton,
    LargeProjectCard,
    LargeBlogCard,
    RadioGroup,
    CheckboxGroup,
    HeaderSidebarLayout,
  },
})
export default class Product extends Vue {
  private projectsModule = getModule(ProjectModule, this.$store);
  private blogsModule = getModule(BlogModule, this.$store);

  public types: CheckboxGroupEntry[] = [];
  public categories: CheckboxGroupEntry[] = [];

  mounted() {
    // Tell the store to load projects
    this.projectsModule.fetchProjects();
    this.blogsModule.fetchBlogs();
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

  get projects() {
    // TODO: This filter should be done in the VueX module as a db query
    return this.projectsModule.gitHubProjects.filter((x) => {
      return (
        x.metadata.tags &&
        x.metadata.tags.some((t) => this.selectedCategories.has(t))
      );
    });
  }

  get blogs() {
    // TODO: This filter should be done in the VueX module as a db query
    return this.blogsModule.Blogs.filter((x) => {
      return (
        x.metadata.tags &&
        x.metadata.tags.some((t) => this.selectedCategories.has(t))
      );
    });
  }
}
</script>

<style scoped lang="postcss"></style>
