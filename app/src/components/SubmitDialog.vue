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
    v-if="show"
    class="scrim z-50 frc justify-center"
    @click="(e) => e.preventDefault()"
  >
    <div
      class="my-8 mx-6 px-6 py-5 rounded-lg shadow-lg bg-white border-gray-100 max-w-md"
    >
      <p>
        You are about to be redirected to <b class="font-bold">Advocu</b>, an
        external platform which we use to curate submissions to Dev Library.
      </p>
      <div class="flex flex-row gap-2 mt-2">
        <span class="flex-grow"><!-- spacer --></span>
        <MaterialButton type="text" @click.native="show = false"
          >Cancel</MaterialButton
        >
        <MaterialButton type="primary" @click.native="goToForm"
          >Continue</MaterialButton
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MaterialButton from "@/components/MaterialButton.vue";

import { EVENT_BUS, NAME_SHOW_SUBMIT_DIALOG } from "@/plugins/events";

@Component({
  components: {
    MaterialButton,
  },
})
export default class SubmitDialog extends Vue {
  public show = false;

  mounted() {
    EVENT_BUS.$on(NAME_SHOW_SUBMIT_DIALOG, () => {
      this.show = true;
    });
  }

  beforeDestroy() {
    EVENT_BUS.$off(NAME_SHOW_SUBMIT_DIALOG);
  }

  goToForm() {
    this.show = false;
    window.open(
      "https://devlibrary.advocu.com/home/applications/form",
      "_blank"
    );
  }
}
</script>

<style scoped lang="postcss"></style>
