<template>
  <HeaderSidebarLayout v-if="this.repo != null">
    <template v-slot:header>
      <!-- Header -->
      <div class="bg-firebase-bg py-20 grid grid-cols-10 gap-4">
        <div class="col-start-2 col-span-7 text-white">
          <h1 class="text-3xl font-semibold">
            {{ repo.metadata.name }}
          </h1>
          <p class="mt-2">
            {{ repo.metadata.longDescription }}
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

        <div class="col-start-9 col-span-2 text-white">
          <p class="pt-1">
            {{ repo.stats.stars }} <font-awesome-icon fixed-width icon="star" />
          </p>
          <p class="pt-1">
            {{ repo.stats.forks }}
            <font-awesome-icon fixed-width icon="code-branch" />
          </p>
        </div>
      </div>
    </template>

    <template v-slot:sidebar>
      <!-- Side bar -->
      <div>
        <p class="uppercase font-medium mt-4 mb-2">{{ product.name }}</p>
        <!-- TODO: This content needs to be real -->
        <ul class="text-sm">
          <li><a>All Projects</a></li>
          <li><a>Official Docs</a></li>
        </ul>

        <!-- TODO: This content needs to be real -->
        <p class="uppercase font-medium mt-4 mb-2">Project</p>
        <ul class="text-sm">
          <li><a>Home</a></li>
          <li><a>Installation</a></li>
          <li><a>Getting Started</a></li>
        </ul>

        <!-- TODO: This content needs to be real -->
        <p class="uppercase font-medium mt-4 mb-2">Related</p>
        <ul class="text-sm">
          <li><a>firebase/quickstart-js</a></li>
          <li><a>firebasee/quickstart-ios</a></li>
        </ul>
      </div>
    </template>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-20">
      <div v-if="content != null" class="col-start-2 col-span-8">
        <template v-for="(s, i) in content.sections">
          <h2 v-if="i > 0" class="text-2xl mt-8 mb-2" :key="`header-${s.path}`">
            {{ s.name }}
          </h2>
          <!-- The 'prose' class comes from the Tailwind typography plugin -->
          <div
            class="prose my-4"
            :key="`content-${s.path}`"
            v-html="s.content"
          ></div>
        </template>
      </div>
    </div>
  </HeaderSidebarLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import MaterialButton from "@/components/MaterialButton.vue";
import HeaderSidebarLayout from "@/components/HeaderSidebarLayout.vue";
import { ProductConfig, ALL_PRODUCTS } from "@/model/product";
import ProjectsModule from "@/store/project";
import { firestore } from "@/plugins/firebase";

import { RepoData, RepoPage } from "../../../shared/types";

@Component({
  components: {
    MaterialButton,
    HeaderSidebarLayout,
  },
})
export default class Repo extends Vue {
  public product!: ProductConfig;
  public repo: RepoData | null = null;
  public content: RepoPage | null = null;

  private productKey!: string;
  private id!: string;

  private projectsModule = getModule(ProjectsModule, this.$store);

  async mounted() {
    this.productKey = this.$route.params["product"];
    this.id = this.$route.params["repo"];

    this.product = ALL_PRODUCTS[this.productKey];

    const opts = { product: this.productKey, id: this.id };
    await this.projectsModule.fetchRepo(opts);
    this.repo = this.projectsModule.repoByProductAndId(opts);

    if (this.repo === null) {
      throw new Error("Could not load repo!");
    }

    // TODO: Where should this be done?
    const pageKey = btoa(this.repo.metadata.content);
    const pageRef = firestore()
      .collection("products")
      .doc(this.productKey)
      .collection("repos")
      .doc(this.repo.id)
      .collection("pages")
      .doc(pageKey);

    const snap = await pageRef.get();
    this.content = snap.data() as RepoPage;
  }
}
</script>

<style scoped lang="postcss"></style>
