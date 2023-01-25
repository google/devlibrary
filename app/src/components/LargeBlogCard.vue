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
  <div class="flex flex-col card card-clickable p-4" :id="`${blog.id}-card`">
    <!-- Title -->
    <a :href="blog.metadata.link" class="wrap-lines-3">
      <h3>{{ blog.metadata.title }}</h3>
    </a>

    <!-- Tags -->
    <div v-if="showTags" class="card-tags frc mt-4 flex-wrap gap-2">
      <TagChip
        v-for="t in blog.metadata.tags"
        :key="t"
        :label="getTag(t).label"
        :textColor="getTag(t).textColor"
        :bgColor="getTag(t).bgColor"
      />
    </div>

    <!-- Author photo and name -->
    <div class="frc mt-6 mb-4">
      <!-- Link to author (if present) -->
      <template v-if="authorId">
        <router-link :to="`/authors/${authorId}`" class="frc">
          <CircleImage
            v-if="authorImageLoaded"
            :lazy="true"
            size="card-avatar"
            class="mr-2"
            :src="authorPhotoUrl"
          />
          <div v-else v-html="dynamicAuthorImage"></div>
          <span class="font-display text-lg">{{ blog.metadata.author }}</span>
        </router-link>
      </template>

      <!-- Standard avatar -->
      <template v-else>
        <div
          class="w-6 h-6 mr-2 bg-gray-200 text-gray-400 rounded-full frc justify-center"
        >
          <font-awesome-icon icon="user" />
        </div>
        <span class="font-display text-lg">{{ blog.metadata.author }}</span>
      </template>

      <ProductLogo
        v-if="showLogo"
        size="xtiny"
        :productKey="blog.product"
        class="product-logo ml-auto"
      />
    </div>

    <span class="flex-grow"><!-- spacer --></span>

    <!-- Timestamp -->
    <div class="frc mt-4 text-sm gap-1 text-mgray-700">
      <font-awesome-icon
        :icon="['fas', 'clipboard-list']"
        size="lg"
        class="mr-1 text-gray-500"
      />
      <span>Blog</span>
      <span>•</span>
      <span class="flex-grow wrap-lines-1"
        >Updated {{ renderDaysAgo(blog.stats.lastUpdated) }}</span
      >
    </div>

    <!-- Button -->
    <div class="mt-6 flex flex-row-reverse">
      <a :href="blog.metadata.link" target="_blank"
        ><MaterialButton type="secondary"> Read post </MaterialButton></a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BlogData } from "../../../shared/types";

import MaterialButton from "@/components/MaterialButton.vue";
import TagChip from "@/components/TagChip.vue";
import CircleImage from "@/components/CircleImage.vue";
import ProductLogo from "@/components/ProductLogo.vue";
import { ColorJson } from "../assets/ts/profile-colors";

import * as dates from "@/plugins/dates";
import * as product from "@/model/product";
import { getApiHost } from "@/plugins/data";

@Component({
  components: {
    MaterialButton,
    TagChip,
    ProductLogo,
    CircleImage,
  },
})
export default class LargeBlogCard extends Vue {
  @Prop() blog!: BlogData;
  @Prop({ default: true }) showTags!: boolean;
  @Prop({ default: false }) showLogo!: boolean;

  public authorImageLoaded = false;

  async mounted() {
    if (this.isStale(this.blog.stats.lastUpdated)) {
      document.getElementById(`${this.blog.id}-card`)!.className +=
        " stale-card";
    }
    this.authorImageLoaded = await this.getImage();
  }

  public isStale(lastUpdated: number) {
    const daysAgo = dates.renderDaysAgo(lastUpdated);
    if (daysAgo.includes("months ago")) {
      const monthsAgo = daysAgo.split(" months ago");
      if (parseInt(monthsAgo[0]) > 18) {
        return true;
      }
    }
    return false;
  }

  public renderDaysAgo(lastUpdated: number) {
    return dates.renderDaysAgo(lastUpdated);
  }

  public getTag(value: string) {
    return product.getTag(this.blog.product, value);
  }

  public async getImage() {
    if (this.authorPhotoUrl) {
      const imageExists = await this.imageExists(this.authorPhotoUrl);
      if (!imageExists) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  public async imageExists(imgUrl: string) {
    if (!imgUrl) {
      return false;
    }
    return new Promise((res) => {
      const image = new Image();
      image.onload = () => res(true);
      image.onerror = () => res(false);
      image.src = imgUrl;
    });
  }

  private getHashCode(text: string): number {
    let hash = 0,
      i,
      chr,
      len;
    if (text.length == 0) return hash;
    for (i = 0, len = text.length; i < len; i++) {
      chr = text.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  get authorId() {
    if (
      this.blog.metadata.authorIds &&
      this.blog.metadata.authorIds.length > 0
    ) {
      return this.blog.metadata.authorIds[0];
    }

    return undefined;
  }

  get authorPhotoUrl() {
    if (this.authorId) {
      return `${getApiHost()}/api/authorPhoto?id=${this.authorId}`;
    }

    return undefined;
  }

  get dynamicAuthorImage() {
    const name = this.blog.metadata.author.replace(/[().]/gi, "");
    const separatedNames = name?.split(" ");

    let initials = "";
    if (separatedNames && separatedNames?.length > 0) {
      initials += separatedNames[0].charAt(0).toUpperCase();
    }

    const hash = this.getHashCode(initials || "");
    const colorData = ColorJson[hash % ColorJson.length];
    const imageHtml = `<div class="dynamic-author-image-small"
      style="background-color: ${colorData.background}; color: ${colorData.color}">
      ${initials}</div>`;

    return imageHtml;
  }
}
</script>

<style scoped lang="postcss"></style>
