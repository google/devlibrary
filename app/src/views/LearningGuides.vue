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
        <Breadcrumbs :links="getBreadcrumbs()" />
        <!-- Header -->
        <div class="header-image full-bleed-header-image px-std border-b border-gray-100" style="
            --header-bg-image-desktop: url('/img/banners/desktop/learning-guides-wide.png');
            --header-bg-image-mobile: url('img/banners/mobile/authors-wide.png');
        ">
            <h1 class="full-bleed-hero-heading">Learning guides</h1>
            <p class="mt-1 hero-description">
                Browse through curated collections of high quality resources contributed and authored by
                developers.
            </p>
        </div>
        <img src="/img/banners/desktop/learning-guides-clipart.png" class="hero-clipart" />
        <!-- Body -->
        <div class="grid grid-cols-10 gap-4 mb-20 px-std pt-4 lg:pt-8">
            <!-- Filters (Desktop) -->
            <div v-if="$mq === 'desktop'" class="lg:col-span-2">
                <GuidesMenu />
            </div>

            <!-- Filters (Mobile) -->
            <div v-if="$mq === 'mobile'" v-show="showFilterOverlay" class="mobile-only scrim z-10">
                <!-- scrim -->
            </div>
            <transition name="slide-in-left">
                <div v-if="$mq === 'mobile'" v-show="showFilterOverlay"
                    class="mobile-only fixed right-0 top-0 pt-20 w-full h-full z-10">
                    <div class="bg-white rounded-l overflow-hidden w-2/3 ml-auto">
                        <GuidesMenu :mobile="true" />
                        <div class="border-t border-gray-200 flex flex-row-reverse gap-2 p-2">
                            <MaterialButton type="primary" @click.native="showFilterOverlay = false">Done
                            </MaterialButton>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- Cards -->
            <div class="col-span-10 lg:col-span-8">
                <div id="projects">
                    <h2>Injecting machine learning into your web apps</h2>
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <RepoOrBlogCard v-for="project in projects" :key="project.data.id" :project="project" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { BlogData, BreadcrumbLink, RepoData, BlogOrRepoDataHolder } from '../../../shared/types';
import RepoOrBlogCard from "@/components/RepoOrBlogCard.vue";
import GuidesMenu from '@/components/GuidesMenu.vue';
import {
    wrapInHolders,
    fetchBlog,
    fetchRepo
} from "@/plugins/data";

@Component({
    components: {
        RepoOrBlogCard,
        Breadcrumbs,
        GuidesMenu,
    },
})

export default class LearningGuides extends Vue {
    public getBreadcrumbs(): BreadcrumbLink[] {
        return [{ name: "LearningGuides", path: "" }];
    }



    // private perPage = 12;
    public showFilterOverlay = false;
    public projects: BlogOrRepoDataHolder[] = [];

    mounted() {
        this.displayProjects();
    }



    public async displayProjects() {
        const repos: RepoData[] = [];
        const repoData1 = await fetchRepo("ml", "YaleDHLab-pix-plot");
        if (repoData1) repos.push(repoData1);
        const repoData2 = await fetchRepo("ml", "victordibia-handtrack");
        if (repoData2) repos.push(repoData2);
        const repoData3 = await fetchRepo("firebase", "radi-cho-tfjs-firebase");
        if (repoData3) repos.push(repoData3);
        console.info(repos);

        const blogs: BlogData[] = [];
        // console.log(typeof fetchBlog("cloud", "blog-topics-developers-practitioners-automating-income-taxes-document-ai"));
        // Promise.resolve(fetchBlog("cloud", "blog-topics-developers-practitioners-automating-income-taxes-document-ai")).then;
        const blogData = await fetchBlog("cloud", "blog-topics-developers-practitioners-automating-income-taxes-document-ai");
        if (blogData) blogs.push(blogData);
        this.projects = wrapInHolders(blogs, repos);
        this.projects.sort((a, b) => {
            const dataA = a.data;
            const dataB = b.data;
            return dataB.stats.lastUpdated - dataA.stats.lastUpdated;
        });
    }


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
