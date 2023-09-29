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
            <h1 class="full-bleed-hero-heading">Hero Content</h1>
            <p class="mt-1 hero-description">
                Check out the content handpicked by curators and highlighted developer topics from Google technologies and developer solutions.
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
                <!-- Show guides menu button (mobile) -->
                <div class="mobile-only">
                    <div class="flex flex-row mr-2 mb-4">
                        <div class="filter-chip" @click="showFilterOverlay = true">
                            <font-awesome-icon icon="filter" size="sm" class="mr-2" />
                            <span>GUIDES MENU</span>
                        </div>
                    </div>
                </div>
                <div id="projects">
                    <h2 class="guide-selection-heading">{{ filters.guideGroup.toString() }}</h2>
                    <p class="guide-selection-description">{{ description }}</p>
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
import MaterialButton from "@/components/MaterialButton.vue";
import PillGroup from "@/components/PillGroup.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import RepoOrBlogCard from "@/components/RepoOrBlogCard.vue";
import GuidesMenu from '@/components/GuidesMenu.vue';
import { wrapInHolders, fetchBlog, fetchRepo } from "@/plugins/data";

@Component({
    components: {
        MaterialButton,
        RepoOrBlogCard,
        Breadcrumbs,
        GuidesMenu,
        PillGroup,
    },
})

export default class LearningGuides extends Vue {
    public getBreadcrumbs(): BreadcrumbLink[] {
        return [{ name: "Learning Guides", path: "" }];
    }

    public showFilterOverlay = false;
    public projects: BlogOrRepoDataHolder[] = [];
    public filters = {
        guideGroup: [],
    };
    public description = "";

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
            this.displayProjects(guideParams);
        }
    }

    public async displayProjects(guideGroup: string) {
        const repos: RepoData[] = [];
        const blogs: BlogData[] = [];
        const addAndSortProjects = (blogs: BlogData[], repos: RepoData[]) => {
            this.projects = wrapInHolders(blogs, repos);
            this.projects.sort((a, b) => {
                const dataA = a.data;
                const dataB = b.data;
                return dataB.stats.lastUpdated - dataA.stats.lastUpdated;
            });
        }

        // Conditional logic to show projects based on Guide Menu selection
        if (guideGroup === "August 2023") {
            this.description = "Hero Content from August 2023 : Spotlights from Google Cloud, Makersuite, Bard and Jetpack Compose !";
            const blogData1 = await fetchRepo("ml", "2023-08-07-meeting_minutes_gcp_serverless");
            if (blogData1) repos.push(blogData1);
            const blogData2 = await fetchRepo("cloud", "article-hub-getting-started-with-google-makersuite");
            if (blogData2) repos.push(blogData2);
            const blogData3 = await fetchRepo("cloud", "let-bard-answer-your-questions-from-google-sheets-with-the-palm-api-and-google-apps-script-3867e4680c0f");
            if (blogData3) repos.push(blogData3);
            const blogData4 = await fetchBlog("android", "mastering-jetpack-compose-state-management-a-deep-dive-into-modern-ui-data-flow-8392e298e56");
            if (blogData4) blogs.push(blogData4);
            const blogData5 = await fetchBlog("android", "understanding-figma-as-a-developer-auto-layout-4d9773daf1d9");
            if (blogData5) blogs.push(blogData5);
            addAndSortProjects(blogs, repos);
        } else if (guideGroup === "September 2023") {
            this.description = "Hero Content from September  2023: Spotlights from Google Cloud, MediaPipe and Jetpack Compose!";
            const repoData1 = await fetchRepo("ml", "KevKibe-RealTime-Gesture-Recognition-using-Mediapipe");
            if (repoData1) repos.push(repoData1);
            const blogData1 = await fetchBlog("ml", "deploying-tensorflow-model-on-a-microcontroller");
            if (blogData1) blogs.push(blogData1);
            const blogData2 = await fetchBlog("cloud", "2023-09-01-palm-recommendation");
            if (blogData2) blogs.push(blogData2);
            const blogData3 = await fetchBlog("cloud", "how-to-manage-google-cloud-compute-engine-with-python");
            if (blogData3) blogs.push(blogData3);
            const repoData2 = await fetchBlog("android", "GIGAMOLE-ComposeLevitation");
            if (repoData2) blogs.push(repoData2);
            const repoData3 = await fetchBlog("android", "ErfanSn-AR-Touch");
            if (repoData3) blogs.push(repoData3);
            addAndSortProjects(blogs, repos);
        } else {
            this.projects = [];
        }
    }
}
</script>

<style scoped lang="postcss">

</style>
