<template>
  <div
    v-show="show"
    class="m-4 p-4 rounded shadow bg-gray-900 text-white border-gray-100 max-w-md"
  >
    <p>
      We serve cookies on this site to analyze traffic, remember your
      preferences, and optimize your experience.
    </p>
    <div class="flex flex-row mt-2 text-blue-500">
      <span class="flex-grow"><!-- spacer --></span>
      <a
        href="https://policies.google.com/technologies/cookies"
        target="_blank"
      >
        <MaterialButton>More Details</MaterialButton>
      </a>
      <MaterialButton @click.native="onAccepted">OK</MaterialButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MaterialButton from "@/components/MaterialButton.vue";

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
    // See:
    // - https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out
    // - https://matteo-gabriele.gitbook.io/vue-gtag/opt-in-out
    this.$gtag.optIn();

    // After optIn make sure we trigger a page view to capture the current page
    this.$gtag.pageview({
      // eslint-disable-next-line
      page_title: this.$route.name || "Unknown", 
      // eslint-disable-next-line
      page_path: this.$route.path,
      // eslint-disable-next-line
      page_location: window.location.href
    });
  }
}
</script>

<style scoped lang="postcss"></style>
