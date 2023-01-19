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
            <!-- Guides Menu (Desktop) -->
            <div v-if="$mq === 'desktop'" class="lg:col-span-2">
                <GuidesMenu v-model="filters" />
            </div>
            <!-- Guides Menu (Mobile) -->
            <div v-if="$mq === 'mobile'" v-show="showFilterOverlay" class="mobile-only scrim z-10">
                <!-- scrim -->
            </div>
            <transition name="slide-in-left">
                <div v-if="$mq === 'mobile'" v-show="showFilterOverlay"
                    class="mobile-only fixed right-0 top-0 pt-20 w-full h-full z-10">
                    <div class="bg-white rounded-l overflow-hidden w-2/3 ml-auto">
                        <GuidesMenu :mobile="true" v-model="filters" />
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
                    <h2 class="guide-selection-heading">{{ filters.guideGroup.toString() }}</h2>
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <RepoOrBlogCard v-for="project in projects" :key="project.data.id" :project="project" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { BlogData, BreadcrumbLink, RepoData, BlogOrRepoDataHolder } from '../../../shared/types';
import PillGroup from "@/components/PillGroup.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import RepoOrBlogCard from "@/components/RepoOrBlogCard.vue";
import GuidesMenu from '@/components/GuidesMenu.vue';
import { wrapInHolders, fetchBlog, fetchRepo } from "@/plugins/data";

@Component({
    components: {
        RepoOrBlogCard,
        Breadcrumbs,
        GuidesMenu,
        PillGroup,
    },
})

export default class LearningGuides extends Vue {
    public getBreadcrumbs(): BreadcrumbLink[] {
        return [{ name: "LearningGuides", path: "" }];
    }

    public showFilterOverlay = false;
    public projects: BlogOrRepoDataHolder[] = [];
    public filters = {
        guideGroup: [],
    };

    @Watch("filters", { deep: true })
    public async onFiltersTypeChanged() {
        let hasGuideParams = false;
        let guideParams = "";

        if (
            typeof this.filters.guideGroup === "string" &&
            this.filters.guideGroup != ""
        ) {
            hasGuideParams = true;
            guideParams += `${this.filters.guideGroup}`;
        }

        if (hasGuideParams) {
            console.log(guideParams);
            this.displayProjects(guideParams);
        }
    }

    public async displayProjects(guideGroup: string) {
        const repos: RepoData[] = [];
        const blogs: BlogData[] = [];
        console.log(guideGroup);
        if (guideGroup === "Injecting machine learning into your web apps") {
            const repoData = [["ml", "YaleDHLab-pix-plot"], ["ml", "victordibia-handtrack"], ["firebase", "radi-cho-tfjs-firebase"]];
            repoData.forEach(async (repo) => {
                const res = await fetchRepo(repo[0], repo[1]);
                if (res) repos.push(res);
            })

            const blogData = await fetchBlog("cloud", "blog-topics-developers-practitioners-automating-income-taxes-document-ai");
            if (blogData) blogs.push(blogData);
            this.projects = wrapInHolders(blogs, repos);
            this.projects.sort((a, b) => {
                const dataA = a.data;
                const dataB = b.data;
                return dataB.stats.lastUpdated - dataA.stats.lastUpdated;
            });
            console.log(this.projects);
        } else {
            this.projects = [];
            console.log(this.projects);
        }
    }
}
</script>

<style scoped lang="postcss">

</style>
