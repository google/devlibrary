<template>
  <HeaderSidebarLayout>
    <template v-slot:header>
      <!-- Header -->
      <div class="bg-firebase-bg py-20 grid grid-cols-10 gap-4">
        <div class="col-start-2 col-span-7 text-white">
          <h1 class="font-display text-3xl font-semibold">
            Firebase Quickstarts for Android
          </h1>
          <p class="mt-2">
            A collection of quickstart samples demonstrating the Firebase APIs
            on Android. For more information, see https://firebase.google.com
          </p>

          <MaterialButton type="secondary" class="mt-8">
            View on GitHub
            <font-awesome-icon icon="external-link-alt" class="ml-1" />
          </MaterialButton>
        </div>

        <div class="col-start-9 col-span-2 text-white">
          <p class="pt-1">123 <font-awesome-icon fixed-width icon="star" /></p>
          <p class="pt-1">
            456 <font-awesome-icon fixed-width icon="code-branch" />
          </p>
        </div>
      </div>
    </template>

    <template v-slot:sidebar>
      <!-- Side bar -->
      <div>
        <p class="uppercase font-medium mt-4 mb-2">Firebase</p>
        <ul class="text-sm">
          <li><a>All Projects</a></li>
          <li><a>Official Docs</a></li>
        </ul>

        <p class="uppercase font-medium mt-4 mb-2">Project</p>
        <ul class="text-sm">
          <li><a>Home</a></li>
          <li><a>Installation</a></li>
          <li><a>Getting Started</a></li>
        </ul>

        <p class="uppercase font-medium mt-4 mb-2">Related</p>
        <ul class="text-sm">
          <li><a>firebase/quickstart-js</a></li>
          <li><a>firebasee/quickstart-ios</a></li>
        </ul>
      </div>
    </template>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 mb-20">
      <div class="col-start-2 col-span-8">
        <h2 class="font-display text-2xl mt-8 mb-2">Section Header</h2>
        <div>
          <p class="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus
            nulla nec nunc gravida malesuada. Fusce vel ipsum in sem semper
            pellentesque. Morbi pharetra sapien mi, et ornare purus elementum
            sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nam scelerisque et mauris id consequat. Vestibulum eget finibus
            augue. Quisque libero tortor, elementum eget maximus sit amet,
            volutpat a metus. Curabitur volutpat ultricies tortor, a mollis odio
            gravida non.
          </p>

          <pre class="bg-gray-100 my-2 py-2 px-4">
public static void main(String[] args) {
  System.out.println("Hello, World!");
}</pre
          >
        </div>

        <h2 class="font-display text-2xl mt-8 mb-2">Bar Baz et Qux</h2>
        <div>
          <p class="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus
            nulla nec nunc gravida malesuada. Fusce vel ipsum in sem semper
            pellentesque. Morbi pharetra sapien mi, et ornare purus elementum
            sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nam scelerisque et mauris id consequat. Vestibulum eget finibus
            augue. Quisque libero tortor, elementum eget maximus sit amet,
            volutpat a metus. Curabitur volutpat ultricies tortor, a mollis odio
            gravida non.
          </p>
          <p class="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus
            nulla nec nunc gravida malesuada. Fusce vel ipsum in sem semper
            pellentesque. Morbi pharetra sapien mi, et ornare purus elementum
            sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nam scelerisque et mauris id consequat. Vestibulum eget finibus
            augue. Quisque libero tortor, elementum eget maximus sit amet,
            volutpat a metus. Curabitur volutpat ultricies tortor, a mollis odio
            gravida non.
          </p>
        </div>
      </div>
    </div>
  </HeaderSidebarLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MaterialButton from "@/components/MaterialButton.vue";
import HeaderSidebarLayout from "@/components/HeaderSidebarLayout.vue";

@Component({
  components: {
    MaterialButton,
    HeaderSidebarLayout,
  },
})
export default class Project extends Vue {}
</script>

<style scoped lang="postcss"></style>
