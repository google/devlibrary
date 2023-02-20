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

<!-- About -->
<template>
  <div class="about">
    <Breadcrumbs :links="getBreadcrumbs()"></Breadcrumbs>
    <!-- Hero -->
    <div
      class="header-image full-bleed-header-image px-std border-b border-gray-100"
      style="
        --header-bg-image-desktop: url('/img/banners/desktop/about-wide.png');
        --header-bg-image-mobile: url('/img/banners/mobile/authors-wide.png');
      "
    >
      <h1 class="full-bleed-hero-heading">About</h1>
      <p class="mt-1 hero-description">
        Dev Library is a curated platform for technical content written or built
        using Google technologies like Android, Angular, Flutter, Firebase,
        Google Cloud, Machine Learning and Google Assistant.
      </p>
    </div>
    <img src="/img/banners/desktop/about-clipart.png" class="hero-clipart" />
    <div
      id="header"
      class="grid gap-4 grid-cols-6 py-6 lg:py-10 border-b border-gray-100"
    >
      <div class="section">
        <div class="mt-6 lg:mt-10 lg:text-lg">
          <p>
            <span
              ><strong>Dev Library</strong> is a curated platform for technical
              content written or built using any of the following Google
              technologies:</span
            >
          </p>

          <ul class="ml-6 mt-2 list-disc">
            <li>Android</li>
            <li>Angular</li>
            <li>Flutter</li>
            <li>Firebase</li>
            <li>Google Cloud</li>
            <li>Machine Learning</li>
            <li>Google Assistant</li>
            <li>Google Maps Platform</li>
          </ul>
          <p class="mt-4">Currently we accept two kinds of content:</p>

          <ul class="ml-6 mt-2 list-disc">
            <li>GitHub repositories</li>
            <li>Blog posts</li>
          </ul>

          <p class="mt-4">
            This platform will evolve as we receive more submissions and we are
            working to accept a wider range of content, so stay tuned!
          </p>
          <p class="mt-8 flex flex-wrap gap-4">
            <a href="mailto:library-google-dev@google.com">
              <MaterialButton @click.native="showSubmitDialog" type="primary"
                >Submit your content</MaterialButton
              >
            </a>
          </p>
        </div>
      </div>
    </div>

    <!-- Policies -->
    <div class="grid gap-4 grid-cols-6">
      <div class="section mt-6 lg:mt-10">
        <h1>Policies</h1>

        <div class="mt-6 lg:mt-10 lg:text-lg">
          <p class="mt-6 font-bold">Terms of Service</p>
          <p class="mt-4">
            <a
              href="https://developers.google.com/terms/site-terms"
              target="_blank"
              >https://developers.google.com/terms/site-terms</a
            >
          </p>
          <p class="mt-6 font-bold">Privacy Policy</p>
          <p class="mt-4">
            <a href="https://policies.google.com/privacy" target="_blank"
              >https://policies.google.com/privacy</a
            >
          </p>
          <p class="mt-6 font-bold">Copyright Infringement</p>
          <p class="mt-4">
            If you think someone is infringing your intellectual property
            rights, you can send a notice that complies with the listed
            <a
              target="_blank"
              href="https://support.google.com/legal/answer/3463239?hl=en&ref_topic=4558877"
              >Copyright Infringement Notification</a
            >
            requirements to
            <a href="mailto:dmca-agent@google.com">dmca-agent@google.com</a>,
            and we’ll take appropriate action. For example, we suspend or close
            the Google Accounts of repeat copyright infringers as described in
            our
            <a
              target="_blank"
              href="https://support.google.com/legal/topic/4558877?hl=en&ref_topic=4556931"
              >Copyright Help Center</a
            >.
          </p>
        </div>
      </div>

      <!-- Frequently asked questions -->
      <div class="section mt-6 lg:mt-10">
        <h1>Frequently Asked Questions</h1>

        <div class="mt-6 lg:mt-10 lg:text-lg mb-16">
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(0)"
          >
            <p class="pb-2">What is Dev Library?</p>
            <font-awesome-icon
              :icon="FaqData[0] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[0]" class="pb-2 border-b">
            <p class="mt-4">
              Dev Library is a platform for showcasing open-source projects and
              technical blogs featuring Google technologies.
            </p>
            <p class="mt-2">
              Any developer who has built an open-source project using Google's
              technologies, or has written about a solution they solved using
              Google's tools, can apply to have their project or content
              featured on the site.
            </p>
            <p class="mt-2">
              Google experts then review each submission for quality, relevance
              and uniqueness. If approved, the project is included on the site.
            </p>
          </div>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(1)"
          >
            <p class="pb-2">What is the purpose of this site?</p>
            <font-awesome-icon
              :icon="FaqData[1] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[1]" class="pb-2 border-b">
            <p class="mt-4">
              We noticed all of the amazing open-source projects being built
              with Google's tools and technologies. We wanted to create a place
              that would provide visibility for the talented developers behind
              the projects, and introduce high-quality projects to a wide
              audience of developers.
            </p>
            <p class="mt-2">
              You can browse through the projects and content featured on the
              site for inspiration, search for a particular product or keyword,
              or submit your project for review and the possibility of being
              included on the site.
            </p>
          </div>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(2)"
          >
            <p class="pb-2">
              Are there any benefits to contributing to the site?
            </p>
            <font-awesome-icon
              :icon="FaqData[2] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[2]" class="pb-2 border-b">
            <p class="mt-4">
              What is hard work without any recognition! Recognizing talented
              developers is one of the intended goals of this site. Contributors
              are rewarded with:
            </p>
            <ul class="ml-6 mt-2 list-disc">
              <li>Dedicated Author page</li>
              <li>Contributor badge on their Google Developer Profile</li>
              <li>Feature in our monthly newsletter</li>
              <li>Content reviewed by Google engineers</li>
              <li>
                Amplification to inspire & help developers to build with Google
              </li>
            </ul>
          </div>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(3)"
          >
            <p class="pb-2">
              I want to learn how to code. Is this the right resource for me?
            </p>
            <font-awesome-icon
              :icon="FaqData[3] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[3]" class="pb-2 border-b">
            <p class="mt-4">
              No. If you are completely new to computer programming, Google
              <a target="_blank" href="https://grasshopper.app/">Grasshopper</a>
              teaches adult learners to write JavaScript, free of charge.
            </p>
            <p class="mt-2">
              If you're a beginner with some basic coding knowledge, we
              encourage you to browse the site. You may learn something useful
              from the open source projects and libraries.
            </p>
          </div>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(4)"
          >
            <p class="pb-2">
              Will this remove the need for documentation and guides?
            </p>
            <font-awesome-icon
              :icon="FaqData[4] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[4]" class="pb-2 border-b">
            <p class="mt-4">
              No. We hope you'll find inspiring and useful pieces of code built
              by developers worldwide, but this site is not meant to replace
              Google's official documentation.
            </p>
          </div>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(5)"
          >
            <p class="pb-2">
              How do I submit my content to be featured on the site?
            </p>
            <font-awesome-icon
              :icon="FaqData[5] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[5]" class="pb-2 border-b">
            <ol class="ml-6 mt-2 list-disc">
              <li>Find the Submit button on the DevLibrary Homepage.</li>
              <li>You will be redirected to the Advocu Form link.</li>
              <li>Fill in your personal and content details.</li>
              <li>Click Submit.</li>
              <li>
                You will receive an email informing you that your submission has
                been received. Note: Once submitted, you can't edit the form.
              </li>
            </ol>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(6)"
          >
            <p class="pb-2">How many submissions can an individual make?</p>
            <font-awesome-icon
              :icon="FaqData[6] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[6]" class="pb-2 border-b">
            <p class="mt-4">
              The more the merrier. You can make as many submissions as you
              want. We have no limit to quality content being served on our
              site.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(7)"
          >
            <p class="pb-2">What happens after I submit?</p>
            <font-awesome-icon
              :icon="FaqData[7] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[7]" class="pb-2 border-b">
            <p class="mt-4">
              Google experts from each product area review submissions for
              quality, freshness, and uniqueness. If it is deemed appropriate,
              they will approve the content to be featured on the site. You will
              then receive an email about the acceptance of your work.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(8)"
          >
            <p class="pb-2">Why did my submission get rejected?</p>
            <font-awesome-icon
              :icon="FaqData[8] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[8]" class="pb-2 border-b">
            <p class="mt-4">
              Submissions are rejected for various reasons, such as:
            </p>
            <ul class="ml-6 mt-2 list-disc">
              <li>
                <strong>Absence of a GitHub license</strong>: : Before
                submitting a project, ensure you have either an Apache 2.0 or
                MIT license.
              </li>
              <li>
                <strong>Incoherent README</strong>: Make sure you don't have an
                empty README. To get accepted, we encourage having a properly
                written, structured, and well-explained README with visuals, if
                needed.
              </li>
              <li>
                <strong>Improper Versioning</strong>: Make sure your project
                follows the latest software updates.
              </li>
              <li>
                <strong>Monetised</strong>: If we find out that the blogs are
                behind a paywall (in Medium), have ads, or are getting monetized
                in any form, we don’t accept them.
              </li>
              <li>
                <strong>Language</strong>: Although we are working toward
                localization, we currently can only support content in English.
              </li>
              <li>
                <strong>Freshness</strong>: If the content is fairly old, or
                hasn’t been updated for a long time, chances of rejection are
                higher.
              </li>
            </ul>

            <p class="mt-2">
              For a more detailed explanation, read our
              <a
                target="_blank"
                href="https://devlibrary.advocu.com/assets/docs/contributors_guidelines.pdf"
                >contributor guidelines</a
              >
              to fix the errors, update the content and re-submit.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(9)"
          >
            <p class="pb-2">When will I get updates about my submission?</p>
            <font-awesome-icon
              :icon="FaqData[9] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[9]" class="pb-2 border-b">
            <p class="mt-4">
              As soon as you submit your content, you will receive an email
              confirming that your content has been submitted. It generally
              takes 2-4 weeks for the content to be reviewed. Post the review we
              will send out an email stating whether the submission was accepted
              or not. If you don’t see an email, make sure to check your spam or
              promotions folder and add Dev Library emails to your allowlist so
              you don’t miss out on the updates.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(10)"
          >
            <p class="pb-2">
              My content was approved. How long will it take for my content to
              appear on the site?
            </p>
            <font-awesome-icon
              :icon="FaqData[10] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[10]" class="pb-2 border-b">
            <p class="mt-4">
              Once approved, the content is added to the site within one week.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(11)"
          >
            <p class="pb-2">How do I request for content to be removed?</p>
            <font-awesome-icon
              :icon="FaqData[11] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[11]" class="pb-2 border-b">
            <p class="mt-4">
              To remove your content, please raise a Pull Request on the Dev
              Library’s
              <a target="_blank" href="https://github.com/google/devlibrary">
                GitHub repo </a
              >.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(12)"
          >
            <p class="pb-2">How do I raise another issue?</p>
            <font-awesome-icon
              :icon="FaqData[12] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[12]" class="pb-2 border-b">
            <p class="mt-4">
              To raise an issue, post your issue on the
              <a target="_blank" href="https://github.com/google/devlibrary">
                Dev Library repo</a
              >
              or fill
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeuN1VqnMXszkW37Wylsskv8GZgta9zKqSfB1rqCHrgKxqDzw/viewform?resourcekey=0-V-7D7mf0f5jF2ApHTVWNrg"
                >this form</a
              >
              to write your queries to us.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(13)"
          >
            <p class="pb-2">
              What is the best way to connect with other authors?
            </p>
            <font-awesome-icon
              :icon="FaqData[13] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[13]" class="pb-2 border-b">
            <p class="mt-4">
              Join on our
              <a target="_blank" href="https://discord.gg/AbwzvEqdCu"
                >Discord server</a
              >
              where you will find the dedicated channel
              #dev-library-discussions. This is the best way to chat with other
              contributors whether you want to discuss new topics, new projects,
              share your experience or give feedback, this is the place to go!
            </p>
          </div>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(14)"
          >
            <p class="pb-2">
              Will I get a notification/ email if my submission gets rejected?
            </p>
            <font-awesome-icon
              :icon="FaqData[14] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[14]" class="pb-2 border-b">
            <p class="mt-4">Yes, we will send you a rejection email.</p>
          </div>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(15)"
          >
            <p class="pb-2">
              What is the best way to reach out to follow stand-out projects
              from Dev Library?
            </p>
            <font-awesome-icon
              :icon="FaqData[15] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[15]" class="pb-2 border-b">
            <p class="mt-4">
              You can
              <a target="_blank" href="https://forms.gle/Wco9K4ePqgCW5sre6"
                >subscribe to our newsletter here</a
              >. We curate some best submissions in each tech stack every month
              with this newsletter.
            </p>
            <p class="mt-4">
              We have also written some blog posts detailing unique projects and
              how developers have used the platform to showcase their
              contributions. You can
              <a
                href="https://developers.googleblog.com/search/label/Google%20Dev%20Library"
                target="_blank"
                >access the archive here</a
              >.
            </p>
          </div>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(16)"
          >
            <p class="pb-2">
              How do I get the Dev Library Contributor's Badge for my Google
              Developer Profile?
            </p>
            <font-awesome-icon
              :icon="FaqData[16] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[16]" class="pb-2 border-b">
            <p class="mt-6">
              If your content is accepted to be showcased on the platform, you
              are eligible for the contributor badge. We will send you an email
              with instructions to claim your contributor badge. Contributor
              badges are sent out once every 2-3 months.
            </p>
          </div>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(17)"
          >
            <p class="pb-2">Why is the content on my profile grayed out?</p>
            <font-awesome-icon
              :icon="FaqData[17] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[17]" class="pb-2 border-b">
            <p class="mt-6 mb-20">
              Content which was last updated more than 18 months back is grayed
              out. We encourage you to keep your content updated as per the
              latest product guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MaterialButton from "@/components/MaterialButton.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { BreadcrumbLink } from "../../../shared/types";
import { EVENT_BUS, NAME_SHOW_SUBMIT_DIALOG } from "@/plugins/events";

@Component({
  components: {
    MaterialButton,
    Breadcrumbs,
  },
})
export default class About extends Vue {
  public getBreadcrumbs(): BreadcrumbLink[] {
    return [{ name: "About", path: "" }];
  }

  public FaqData = new Array(18).fill(false);

  public showSubmitDialog() {
    EVENT_BUS.$emit(NAME_SHOW_SUBMIT_DIALOG);
  }

  public toggleFaq(index: number) {
    Vue.set(this.FaqData, index, !this.FaqData[index]);
  }
}
</script>

<style scoped lang="postcss">
.materialbutton a {
  text-decoration: none;
}

a {
  @apply underline text-blue-600 hover:text-blue-800;
}

.section {
  @apply px-4 col-span-6;
  @apply lg:px-0 lg:col-start-2 lg:col-span-4;
}

.faq-title {
  color: #1a73e8;
  cursor: pointer;
  padding: 2px;
}
</style>
