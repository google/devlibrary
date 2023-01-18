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
    <div class="flex flex-col bg-white" :class="{ mobile, desktop: !mobile }">
        <div class="rounded-lg flex-shrink" :class="{ border: !mobile }">
            <div class="px-5 py-4 uppercase border-b border-gray-200 text-gray-500 font-medium text-xs tracking-widest">
                GUIDES MENU
            </div>

            <div class="sections">
                <div class="section">
                    <PillGroup prefix="guideGroup"
                        :keys="['Injecting machine learning into your web apps']"
                        :values="['Injecting machine learning into your web apps']" v-model="guideGroup"
                        :start-empty="false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import PillGroup from "@/components/PillGroup.vue";
@Component({
    components: {
        PillGroup,
    },
})
export default class GuidesMenu extends Vue {
    @Prop({ default: false }) mobile!: boolean;
    @Prop() value!: { guideGroup: string | string[] };
    public guideGroup = "";
    public filtersChanged = false;
    public defaultFilters = {
        guideGroup: "Injecting machine learning into your web apps",
    };
    public loaded = false;

    get filterValues() {
        return {
            guideGroup: this.guideGroup,
        };
    }


    @Watch("value", { deep: true })
    public onValueChange() {
        if (
            Array.isArray(this.value.guideGroup) &&
            this.value.guideGroup.length === 0
        ) {
            this.guideGroup = "";
        }
    }

    @Watch("filterValues", { deep: true })
    public onFilterValuesChange() {
        if (!this.loaded) {
            this.defaultFilters = JSON.parse(JSON.stringify(this.filterValues));
            this.loaded = true;
        }

        if (
            JSON.stringify(this.defaultFilters) != JSON.stringify(this.filterValues)
        ) {
            this.filtersChanged = true;
        } else {
            this.filtersChanged = false;
        }
        this.$emit("input", this.filterValues);
    }
}
</script>

<style scoped lang="postcss">
.desktop {
    @apply border-gray-200;
    position: sticky;
    top: 80px;
}

.mobile .sections {
    overflow-y: scroll;
    max-height: 60vh;
}

.mobile {
    @apply border-transparent;
}

.section:not(:first-of-type) {
    @apply border-t;
}

.section {
    @apply px-2 py-3;
}
</style>
