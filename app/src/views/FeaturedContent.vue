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
        --header-bg-image-desktop: url('/img/banners/desktop/featured-content-wide.png');
        --header-bg-image-mobile: url('img/banners/mobile/authors-wide.png');
        ">
            <h1 class="full-bleed-hero-heading">Featured Content</h1>
            <p class="mt-1 hero-description">
                Check out inspiring projects build by developers using the latest Google technologies and developer solutions. Featured content includes handpicked projects from curators and in-focus developer topics.
            </p>
        </div>
        <img src="/img/banners/desktop/featured-content-clipart.png" class="hero-clipart" />
        <!-- Body -->
        <div class="grid grid-cols-10 gap-4 mb-20 px-std pt-4 lg:pt-8">
            <!-- Featured Content Menu (Desktop) -->
            <div v-if="$mq === 'desktop'" class="lg:col-span-2">
                <FeaturedContentMenu v-model="filters" />
            </div>
            <!-- Featured Content Menu (Mobile) -->
            <div v-if="$mq === 'mobile'" v-show="showFilterOverlay" class="mobile-only scrim z-10">
                <!-- scrim -->
            </div>
            <transition name="slide-in-left">
                <div v-if="$mq === 'mobile'" v-show="showFilterOverlay"
                    class="mobile-only fixed right-0 top-0 pt-20 w-full h-full z-10">
                    <div class="bg-white rounded-l overflow-hidden w-2/3 ml-auto">
                        <FeaturedContentMenu :mobile="true" v-model="filters" />
                        <div class="border-t border-gray-200 flex flex-row-reverse gap-2 p-2">
                            <MaterialButton type="primary" @click.native="showFilterOverlay = false">Done
                            </MaterialButton>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- Cards -->
            <div class="col-span-10 lg:col-span-8">
                <!-- Show Featured Content menu button (mobile) -->
                <div class="mobile-only">
                    <div class="flex flex-row mr-2 mb-4">
                        <div class="filter-chip" @click="showFilterOverlay = true">
                            <font-awesome-icon icon="filter" size="sm" class="mr-2" />
                            <span>Featured Content Menu</span>
                        </div>
                    </div>
                </div>
                <div id="projects">
                    <h2 class="featured-content-selection-heading">{{ filters.contentGroup.toString() }}</h2>
                    <p class="featured-content-selection-description">{{ description }}</p>
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <RepoOrBlogCard v-for="project in projects" 
                        :key="project.data.id" 
                        :project="project" />
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
import FeaturedContentMenu from '@/components/FeaturedContentMenu.vue';
import { wrapInHolders, fetchBlog, fetchRepo } from "@/plugins/data";

@Component({
    components: {
        MaterialButton,
        RepoOrBlogCard,
        Breadcrumbs,
        FeaturedContentMenu,
        PillGroup,
    },
})

export default class FeaturedContent extends Vue {
    public getBreadcrumbs(): BreadcrumbLink[] {
        return [{ name: "Featured Content", path: "" }];
    }

    public showFilterOverlay = false;
    public projects: BlogOrRepoDataHolder[] = [];
    public filters = {
        contentGroup: [],
    };
    public description = "";

    @Watch("filters", { deep: true })
    public async onFiltersTypeChanged() {
        let hasContentParams = false;
        let contentParams = "";

        if (
            typeof this.filters.contentGroup === "string" &&
            this.filters.contentGroup != ""
        ) {
            hasContentParams = true;
            contentParams += `${this.filters.contentGroup}`;
        }

        if (hasContentParams) {
            this.displayProjects(contentParams);
        }
    }

    public async displayProjects(contentGroup: string) {
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

        // Conditional logic to show projects based on Featured Content Menu selection
        if (contentGroup === "October 202") {
            this.description = "Discover content from Google Cloud, Android 14 and GenAI published in October!";
            const blogData1 = await fetchBlog("cloud", "integrate-google-bard-in-flutter");
            if (blogData1) blogs.push(blogData1);
            const blogData2 = await fetchBlog("cloud", "serverless-data-pipelines-in-gcp-using-dataform-and-bigquery-remote-functions-9ee235d0cb18");
            if (blogData2) blogs.push(blogData2);
            const blogData3 = await fetchBlog("cloud", "dltips-en-tensorflow-callback-gpu-memory-consumption");
            if (blogData3) blogs.push(blogData3);
            const blogData4 = await fetchBlog("ml", "how-generative-ai-improves-the-productivity-of-software-developers-821e8453bd8d");
            if (blogData4) blogs.push(blogData4);
            const blogData5 = await fetchBlog("android", "jetpack-compose-for-maps");
            if (blogData5) blogs.push(blogData5);
            const blogData6 = await fetchBlog("android", "developers-take-note-android-14s-privacy-security-upgrades-37d379c3d005");
            if (blogData6) blogs.push(blogData6);
            const repoData1 = await fetchRepo("android", "Taaveez-Taaveez-android");
            if (repoData1) repos.push(repoData1);
            addAndSortProjects(blogs, repos);
        }
        else if (contentGroup === "September 2023") {
            this.description = "Discover projects published in September from Google Cloud, MediaPipe and Jetpack Compose!";
            const repoData1 = await fetchRepo("ml", "KevKibe-RealTime-Gesture-Recognition-using-Mediapipe");
            if (repoData1) repos.push(repoData1);
            const repoData2 = await fetchRepo("android", "GIGAMOLE-ComposeLevitation");
            if (repoData2) repos.push(repoData2);
            const repoData3 = await fetchRepo("android", "ErfanSn-AR-Touch");
            if (repoData3) repos.push(repoData3);
            const blogData1 = await fetchBlog("cloud", "2023-09-01-palm-recommendation");
            if (blogData1) blogs.push(blogData1);
            const blogData2 = await fetchBlog("cloud", "how-to-manage-google-cloud-compute-engine-with-python");
            if (blogData2) blogs.push(blogData2);
            const blogData3 = await fetchBlog("cloud", "deploying-a-google-cloud-generative-ai-app-in-a-website-with-cloud-run-7c8aa5db344");
            if (blogData3) blogs.push(blogData3);
            const blogData4 = await fetchBlog("cloud", "how-to-use-gen-ai-for-social-media-marketing-with-palm-api-and-maker-suite-6ab7bf515d0d");
            if (blogData4) blogs.push(blogData4);
            addAndSortProjects(blogs, repos);
        } else if (contentGroup === "August 2023") {
            this.description = "Discover content from Makersuite, Bard and Jetpack Compose published in August!";
            const blogData1 = await fetchBlog("ml", "2023-08-07-meeting_minutes_gcp_serverless");
            if (blogData1) blogs.push(blogData1);
            const blogData2 = await fetchBlog("cloud", "article-hub-getting-started-with-google-makersuite");
            if (blogData2) blogs.push(blogData2);
            const blogData3 = await fetchBlog("cloud", "let-bard-answer-your-questions-from-google-sheets-with-the-palm-api-and-google-apps-script-3867e4680c0f");
            if (blogData3) blogs.push(blogData3);
            const blogData4 = await fetchBlog("android", "mastering-jetpack-compose-state-management-a-deep-dive-into-modern-ui-data-flow-8392e298e56");
            if (blogData4) blogs.push(blogData4);
            const blogData5 = await fetchBlog("android", "understanding-figma-as-a-developer-auto-layout-4d9773daf1d9");
            if (blogData5) blogs.push(blogData5);
            const blogData6 = await fetchBlog("ml", "pulse-discover-how-googles-automl-can-help-define-problems-improve-manor");
            if (blogData6) blogs.push(blogData6);
            const blogData7 = await fetchBlog("cloud", "2023-08-07-meeting_minutes_gcp_serverless");
            if (blogData7) blogs.push(blogData7);
            const repoData1 = await fetchRepo("ml", "python-dontrepeatyourself-Smile-Detection-with-Python-OpenCV-and-Deep-Learning.json");
            if (repoData1) repos.push(repoData1);
            const repoData2 = await fetchRepo("ml", "python-dontrepeatyourself-Smile-Detection-with-Python-OpenCV-and-Deep-Learning");
            if (repoData2) repos.push(repoData2);
            const repoData3 = await fetchRepo("ml", "jays0606-mediapipe-facelandmark-demo");
            if (repoData3) repos.push(repoData3);
            addAndSortProjects(blogs, repos);
        } else {
            this.projects = [];
        }
    }
}
</script>

<style scoped lang="postcss">

</style>
