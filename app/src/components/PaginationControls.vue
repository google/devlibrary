<template>
  <div class="flex">
    <span class="flex-grow"><!-- spacer --></span>
    <MaterialButton @click.native="maybePrev" :disable="!showPrev" type="text"
      ><font-awesome-icon icon="angle-left" class="mr-1" size="sm" />
      Prev
    </MaterialButton>
    <MaterialButton @click.native="maybeNext" :disable="!showNext" type="text"
      >Next<font-awesome-icon icon="angle-right" class="ml-1" size="sm" />
    </MaterialButton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import MaterialButton from "@/components/MaterialButton.vue";
import { PagedResponse } from "@/plugins/data";

@Component({
  components: {
    MaterialButton,
  },
})
export default class PaginationControls<T> extends Vue {
  @Prop() data!: PagedResponse<T>;

  public maybeNext() {
    if (this.showNext) {
      this.$emit("next");
    }
  }

  public maybePrev() {
    if (this.showPrev) {
      this.$emit("prev");
    }
  }

  get showNext() {
    return (
      this.data.hasNext || this.data.currentPage < this.data.pages.length - 1
    );
  }

  get showPrev() {
    return this.data.currentPage > 0;
  }
}
</script>

<style scoped lang="postcss"></style>
