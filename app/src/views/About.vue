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
        Dev Library is a community platform which showcases technical content featuring
        Google technologies and developer solutions like Android, Angular, Flutter, Firebase,
        Google Cloud, Machine Learning, Google Assistant and Google Maps Platform.
      </p>
    </div>
    <img src="/img/banners/desktop/about-clipart.png" class="hero-clipart" />
    <div
      id="header"
      class="grid gap-4 grid-cols-6 py-6 lg:py-10 border-b border-gray-100"
    >
      <div class="section">
        <div class="mt-6 lg:mt-10 lg:text-lg">
          <p class="mt-4">
            While new submissions are temporarily closed, you can still explore our extensive project library for inspiration.
          </p>
          <p class="mt-8 flex flex-wrap gap-4">
            <a
                target="blank"
                :href="`https://devlibrary.withgoogle.com/products/ml?sort=added`"
              >
              <MaterialButton type="primary"
                >Start exploring today</MaterialButton
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
          <p class="mt-6 font-bold">Content Policy</p>
          <p class="mt-4">
            <a href="https://devlibrary.withgoogle.com/contentpolicy" target="_blank"
              >https://devlibrary.withgoogle.com/contentpolicy</a
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
        <p class="mt-6 font-bold">General</p>
        <div class="mt-6 lg:mt-10 lg:text-lg mb-16">
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(1)"
          >
            <p class="pb-2">What is Dev Library and what can I do on it?</p>
            <font-awesome-icon
              :icon="FaqData[1] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[1]" class="pb-2 border-b">
            <p class="mt-4">
              Dev Library has been created to showcase the amazing open source projects being built with Google's tools and technologies by developers around the world. Through Google Dev Library we want to provide visibility for the talented developers behind the projects, and introduce useful projects to the broader developer community to find inspiration.
            </p>
          </div>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(3)"
          >
            <p class="pb-2">
              What is the best way to stay up-to-date with projects from Google Dev Library?
            </p>
            <font-awesome-icon
              :icon="FaqData[3] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[3]" class="pb-2 border-b">
            <p class="mt-4">
              <a target="_blank" href="https://devlibrary.withgoogle.com/products/ml"> Check out</a> our AI products page to stay up to date with the latest projects added to the platform. Also, you can check out the <a href="https://developers.googleblog.com/search/label/Google%20Dev%20Library">Dev Library blog archives</a> for past highlights.
            </p>
          </div>
          <p class="mt-6 font-bold">Contributing to Dev Library</p>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(4)"
          >
            <p class="pb-2">
              What are the benefits of contributing to Google Dev Library?
            </p>
            <font-awesome-icon
              :icon="FaqData[4] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[4]" class="pb-2 border-b">
            <p class="mt-4">
              Developers and tech writers are encouraged to contribute to the platform for :-
              <ol class="ml-6 mt-2 list-disc">
                <li>Their own author profile page</li>
                <li>A shiny contributor badge for their Google Developer profile</li>
                <li>Inspiring developers to build with Google!</li>
              </ol>
            </p>
          </div>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(5)"
          >
            <p class="pb-2">
              How do I contribute my content to the website site?
            </p>
            <font-awesome-icon
              :icon="FaqData[5] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[5]" class="pb-2 border-b">
            <p>
            Please note we are currently not accepting new submissions from the community, please check back later!
            </p>
            <p>
              Before you submit, it’s a good idea to familiarize yourself with the <a href="https://devlibrary.advocu.com/assets/docs/contributors_guidelines.pdf">contribution guidelines</a> in addition to the official documentation of every product. After doing so, follow these simple steps :-

            <ol class="ml-6 mt-2 list-disc">
              <li>Find the Submit button on the top navigation bar</li>
              <li>You will be redirected to the advocu form link</li>
              <li>Fill in your personal and content details</li>
              <li>Click Submit</li>
              <li>You will receive an email informing you that your submission has been received</li>
            </ol>
            </p>
            <p>
            <i>*Note: Once submitted, you can't edit the form.</i><br>
            You can make as many submissions as you want to showcase your work in your Dev Library Author profile.
          </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(6)"
          >
            <p class="pb-2">What happens after I submit?</p>
            <font-awesome-icon
              :icon="FaqData[6] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[6]" class="pb-2 border-b">
            <p class="mt-4">
              Googlers go through each submission for usefulness, product relevance and basic alignment with current coding best practices, technical writing standards. If approved, the project is included on the site and the contributor gets an author profile page which features their approved submissions.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(7)"
          >
            <p class="pb-2">Why did my submission get rejected?</p>
            <font-awesome-icon
              :icon="FaqData[7] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[7]" class="pb-2 border-b">
            <p class="mt-4">
              There can be various reasons for submissions to get rejected. When the curator decides to reject the submission, it may be due to one or more of the following reasons:
              <ol class="ml-6 mt-2 list-disc">
                <li><b>Low alignment with current coding, technical writing, or product standards:</b> Your submission may have been rejected because it did not meet the current standards for coding, technical writing, or product updates.</li>
                <li><b>Low product relevance:</b> Your submission may not have been relevant to the product or topic for which it was submitted.</li>
                <li><b>Low community usefulness:</b> Your submission may not have provided value to the community or audience for which it was intended.</li>
                <li><b>Possibility of spam:</b> Your submission may have been flagged as potential spam for including promotional or irrelevant links.</li>
                <li><b>Content not in English:</b> Your submission may have been rejected because it was not in English.</li>
              </ol>
              </p>
              <p>
              Please note that feedback may not be provided for all submissions due to the large number of submissions we receive.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(8)"
          >
            <p class="pb-2">When will I get updates about my submission?</p>
            <font-awesome-icon
              :icon="FaqData[8] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[8]" class="pb-2 border-b">
            <p class="mt-4">
              The submission to publication process takes around one month. As soon as you submit your content, you will receive an email confirming your submission has been successfully received. It takes 2-4 weeks for your content to be reviewed. After the review, you will receive an email stating whether the project was accepted or not. ( If you don’t see an email, make sure to check your spam or promotions folder). Post the approval email, it can take another 1-2 weeks for the submission to be published to your author profile.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(9)"
          >
            <p class="pb-2">My submission was approved but I am not able to find my author profile?</p>
            <font-awesome-icon
              :icon="FaqData[9] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[9]" class="pb-2 border-b">
            <p class="mt-4">
              Once approved, the content is published to the website within 1-2 weeks.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(10)"
          >
            <p class="pb-2">
              Can I update my blog content or repository after submission?
            </p>
            <font-awesome-icon
              :icon="FaqData[10] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[10]" class="pb-2 border-b">
            <p class="mt-4">
              Yes, you can update your blog content or repository after submission. Contributors are encouraged to frequently revise their content to include the latest tech updates and releases. Developers visiting the site can sort projects based on the "Recently Updated" sorting option available on each product page. So, we encourage contributors to take advantage of this feature and keep their content up-to-date to ensure its relevance and visibility.
            </p>
          </div>
          <p class="mt-6 font-bold">My profile</p>
          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(11)"
          >
            <p class="pb-2">Why is the content on my profile grayed out?</p>
            <font-awesome-icon
              :icon="FaqData[11] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[11]" class="pb-2 border-b">
            <p class="mt-4">
              Content that was last updated more than 18 months ago is grayed out to help readers understand what is new and relevant. We encourage you to keep your content updated as per the latest product guidelines.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(12)"
          >
            <p class="pb-2">How do I update / remove content from my Dev Library profile?</p>
            <font-awesome-icon
              :icon="FaqData[12] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[12]" class="pb-2 border-b">
            <p class="mt-4">
              To remove or update your content, please open a Pull request or raise an issue on the
              <a target="_blank" href="https://github.com/google/devlibrary/issues/new">
                Dev Library's GitHub repo</a>.
            </p>
          </div>

          <div
            class="mt-2 relative border-b faq-title justify-between flex"
            @click="toggleFaq(13)"
          >
            <p class="pb-2">
              How do I get the Dev Library Contributor badge for my Google developer profile?
            </p>
            <font-awesome-icon
              :icon="FaqData[13] ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
          </div>
          <div v-show="FaqData[13]" class="pb-2 border-b">
            <p class="mt-4">
              If your content has been accepted, you are eligible for the Dev Library contributor badge. You’ll receive email instructions to claim your contributor badge. Contributor badges are sent out once every quarter.
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
