<template>
  <div v-show="loading" class="slider">
    <div class="line"></div>
    <div class="subline inc"></div>
    <div class="subline dec"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import UIModule from "@/store/ui";

@Component({
  components: {},
})
export default class ProgressBar extends Vue {
  public uiModule = getModule(UIModule, this.$store);

  get loading() {
    return this.uiModule.loading;
  }
}
</script>

<style scoped lang="postcss">
/**
 * See: https://codepen.io/shalimano/pen/wBmNGJ 
 */
.slider {
  position: absolute;
  width: 100%;
  height: 5px;
  overflow-x: hidden;
}

.line {
  position: absolute;
  opacity: 0.4;
  width: 150%;
  height: 5px;
  @apply bg-blue-400;
}

.subline {
  position: absolute;
  height: 5px;
  @apply bg-blue-400;
}

.inc {
  animation: increase 2s infinite;
}

.dec {
  animation: decrease 2s 0.5s infinite;
}

@keyframes increase {
  from {
    left: -5%;
    width: 5%;
  }
  to {
    left: 130%;
    width: 100%;
  }
}
@keyframes decrease {
  from {
    left: -80%;
    width: 80%;
  }
  to {
    left: 110%;
    width: 10%;
  }
}
</style>
