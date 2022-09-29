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
  <div
    v-show="show"
    class="m-4 p-4 rounded shadow bg-gray-900 text-white border-gray-100 max-w-md"
  >
    <p>
      We serve cookies on this site to analyze traffic, remember your
      preferences, and optimize your experience.
    </p>
    <div class="flex flex-row mt-2 text-gblue-600">
      <span class="flex-grow"><!-- spacer --></span>
      <a
        href="https://policies.google.com/technologies/cookies"
        target="_blank"
      >
        <MaterialButton type="text">More details</MaterialButton>
      </a>
      <MaterialButton type="text" @click.native="onAccepted">OK</MaterialButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MaterialButton from "@/components/MaterialButton.vue";
import { pageView } from "@/plugins/gtag";

@Component({
  components: {
    MaterialButton,
  },
})
export default class CookieBar extends Vue {
  private KEY = "library-google-dev-accept-cookies";

  public show = true;

  mounted() {
    const val = localStorage.getItem(this.KEY);
    const accepted = val === "true";

    this.show = !accepted;

    if (accepted) {
      this.grantConsent();
    }
  }

  public onAccepted() {
    localStorage.setItem(this.KEY, "true");
    this.show = false;
    this.grantConsent();
  }

  public grantConsent() {
    // After optIn make sure we trigger a page view to capture the current page
    pageView(this.$route);
  }
}
</script>

<style scoped lang="postcss"></style>
