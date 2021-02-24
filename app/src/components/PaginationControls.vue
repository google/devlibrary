<template>
  <div class="flex">
    <span class="flex-grow"><!-- spacer --></span>
    <MaterialButton
      v-if="showPrev"
      @click.native="() => $emit('prev')"
      type="text"
      ><font-awesome-icon icon="angle-left" class="mr-1" size="sm" />
      Prev
    </MaterialButton>
    <MaterialButton
      v-if="showNext"
      @click.native="() => $emit('next')"
      type="text"
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
