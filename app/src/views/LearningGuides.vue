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



<!-- About -->
<template>
    <div class="about">
        <Breadcrumbs :links="getBreadcrumbs()" />
        <!-- Hero -->
        <div class="header-image full-bleed-header-image px-std border-b border-gray-100" style="
        --header-bg-image-desktop: url('/img/banners/desktop/learning-guides-wide.png');
        --header-bg-image-mobile: url('/img/banners/mobile/authors-wide.png');
      ">
            <h1 class="full-bleed-hero-heading">Learning guides</h1>
            <p class="mt-1 hero-description">
                Browse through curated collections of high quality resources contributed and authored by developers.
            </p>
        </div>
        <img src="/img/banners/desktop/learning-guides-clipart.png" class="hero-clipart" />
    </div>
    <!-- Body -->
    <!-- <div class="grid grid-cols-10 gap-4 mb-20 px-std pt-4 lg:pt-8"> -->
    <!-- Cards -->
    <!-- <div class="col-span-10 lg:col-span-8">
            <div id="projects">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4"> -->
    <!-- <RepoOrBlogCard v-for="project in displayedProjects" :key="project.data.id" :project="project" /> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import {
//     BlogData,
//     RepoData,
//     BlogOrRepoDataHolder,
// } from "../../../shared/types";

import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { BreadcrumbLink } from '../../../shared/types';

// import {
//     PagedResponse,
//     emptyPageResponse,
//     wrapInHolders,
// } from "@/plugins/data";

// import { ProductConfig } from "../../../shared/types";
// import { ALL_PRODUCTS } from "../../../shared/product";

@Component({
    components: {
        Breadcrumbs,
    },
})

export default class LearningGuides extends Vue {
    public getBreadcrumbs(): BreadcrumbLink[] {
        return [{ name: "LearningGuides", path: "" }];
    }

    // private perPage = 12;

    // get displayedProjects() {
    //     return this.visibleProjects;
    // }


    // get visibleProjects(): BlogOrRepoDataHolder[] {
    //     return this.sortedProjects;
    // }

    // get product(): ProductConfig {
    //     return ALL_PRODUCTS[this.$route.params["product"]];
    // }

    // public repoData: PagedResponse<RepoData> = emptyPageResponse<RepoData>(
    //     `/products/${this.product.key}/repos`,
    //     {},
    //     this.perPage
    // );
    // public blogData: PagedResponse<BlogData> = emptyPageResponse<BlogData>(
    //     `/products/${this.product.key}/blogs`,
    //     {},
    //     this.perPage
    // );

    // get repos(): RepoData[] {
    //     if (this.repoData.pages.length <= 0) {
    //         return [];
    //     }
    //     return this.repoData.pages.flatMap((p) => p);
    // }

    // get blogs(): BlogData[] {
    //     if (this.blogData.pages.length <= 0) {
    //         return [];
    //     }

    //     return this.blogData.pages.flatMap((p) => p);
    // }



    // get sortedProjects(): BlogOrRepoDataHolder[] {
    //     const blogs = this.blogs;
    //     const repos = this.repos;
    //     const projects = wrapInHolders(blogs, repos);
    //     console.log("blogData: " + this.blogData);
    //     console.log("blogs: " + blogs)
    //     console.log("projects: " + projects)

    //     // Locally join and sort
    //     return projects.sort((a, b) => {
    //         const dataA = a.data;
    //         const dataB = b.data;
    //         return dataB.stats.lastUpdated - dataA.stats.lastUpdated;
    //     });
    // }
}
</script>

<!-- <style scoped lang="postcss">
a {
    @apply underline;
}

.section {
    @apply px-4 col-span-6;
    @apply lg: px-0 lg:col-start-2 lg:col-span-4;
}
</style> -->
