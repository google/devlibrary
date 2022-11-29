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
  <div class="flex flex-col card card-clickable p-4" :id="`${repo.id}-card`">
    <!-- Title -->
    <router-link :to="link" class="wrap-lines-3">
      <h3>{{ repo.metadata.name }}</h3>
    </router-link>

    <!-- Tags -->
    <div v-if="showTags" class="card-tags mt-4 frc flex-wrap gap-2">
      <TagChip
        v-for="t in repo.metadata.tags"
        :key="t"
        :label="getTag(t).label"
        :textColor="getTag(t).textColor"
        :bgColor="getTag(t).bgColor"
      />
    </div>

    <!-- Author photo and name -->
    <div class="frc mt-6">
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
          <span class="font-display text-lg">{{ repo.metadata.owner }}</span>
        </router-link>
      </template>
      <template v-else>
        <CircleImage
          v-if="authorImageLoaded"
          :lazy="true"
          size="card-avatar"
          class="mr-2"
          :src="authorPhotoUrl"
        />
        <div v-else v-html="dynamicAuthorImage"></div>
        <span class="font-display text-lg">{{ repo.metadata.owner }}</span>
      </template>
      <ProductLogo
        v-if="showLogo"
        size="xtiny"
        :productKey="repo.product"
        class="product-logo ml-auto"
      />
    </div>

    <!-- Description -->
    <div class="mt-4 wrap-lines-3">
      {{ repo.metadata.longDescription }}
    </div>

    <div class="flex-grow"><!-- spacer --></div>

    <!-- Timestamp -->
    <div class="mt-4 frc text-sm gap-1 text-mgray-700">
      <font-awesome-icon :icon="['fab', 'github']" size="lg" class="mr-1" />
      <span>GitHub</span>
      <span>•</span>
      <span class="flex-grow wrap-lines-1"
        >Updated {{ renderDaysAgo(repo.stats.lastUpdated) }}</span
      >
    </div>

    <!-- Button -->
    <div class="mt-6 flex flex-row-reverse">
      <router-link :to="link"
        ><MaterialButton type="secondary"
          >Learn more</MaterialButton
        ></router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { RepoData } from "../../../shared/types";

import MaterialButton from "@/components/MaterialButton.vue";
import TagChip from "@/components/TagChip.vue";
import ProductLogo from "@/components/ProductLogo.vue";
import CircleImage from "@/components/CircleImage.vue";
import { getApiHost } from "@/plugins/data";
import { ColorJson } from "../assets/ts/profile-colors";

import * as dates from "@/plugins/dates";
import * as product from "@/model/product";

@Component({
  components: {
    MaterialButton,
    TagChip,
    ProductLogo,
    CircleImage,
  },
})
export default class LargeRepoCard extends Vue {
  @Prop() repo!: RepoData;
  @Prop({ default: true }) showTags!: boolean;
  @Prop({ default: false }) showLogo!: boolean;

  public authorImageLoaded = false;

  async mounted() {
    if (this.isStale(this.repo.stats.lastUpdated)) {
      document.getElementById(`${this.repo.id}-card`)!.className +=
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
    return product.getTag(this.repo.product, value);
  }

  get authorPhotoUrl(): string {
    if (this.authorId) {
      return `${getApiHost()}/api/authorPhoto?id=${this.authorId}`;
    } else if (this.repo.metadata.owner) {
      return `https://avatars.githubusercontent.com/${this.repo.metadata.owner}`;
    }

    return '';
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
      this.repo.metadata.authorIds &&
      this.repo.metadata.authorIds.length > 0
    ) {
      return this.repo.metadata.authorIds[0];
    }

    return undefined;
  }

  get link() {
    return `/products/${this.repo.product}/repos/${this.repo.id}`;
  }

  get dynamicAuthorImage() {
    const name = this.repo.metadata.owner.replace(/[().]/gi, "");
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
