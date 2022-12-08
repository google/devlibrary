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
    <div
      id="header"
      class="grid gap-4 grid-cols-6 py-6 lg:py-10 border-b border-gray-100"
    >
      <div class="section">
        <h1>About</h1>

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

        <div class="mt-6 lg:mt-10 lg:text-lg">
          <p class="mt-6 font-bold">What is Dev Library?</p>
          <p class="mt-4">
            Dev Library is a platform for showcasing open-source projects and technical blogs featuring Google technologies.
          </p>
          <p class="mt-2">
            Any developer who has built an open-source project using Google's technologies, or has written about a solution they solved using Google's tools, can apply to have their project or content featured on the site.
          </p>
          <p class="mt-2">
            Google experts then review each submission for quality, relevance and uniqueness. If approved, the project is included on the site.
          </p>
          <p class="mt-6 font-bold">What is the purpose of this site?</p>
          <p class="mt-4">
            We noticed all of the amazing open-source projects being built with Google's tools and technologies. We wanted to create a place that would provide visibility for the talented developers behind the projects, and introduce high-quality projects to a wide audience of developers.
          </p>
          <p class="mt-2">
            You can browse through the projects and content featured on the site for inspiration, search for a particular product or keyword, or submit your project for review and the possibility of being included on the site.
          </p>
          <p class="mt-6 font-bold">
            Are there any benefits to contributing to the site?
          </p>
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
            <li>Amplification to inspire & help developers to build with Google</li>
          </ul>

          <p class="mt-6 font-bold">
            I want to learn how to code. Is this the right resource for me?
          </p>
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

          <p class="mt-6 font-bold">
            Will this remove the need for documentation and guides?
          </p>
          <p class="mt-4">
            No. We hope you'll find inspiring and useful pieces of code built by
            developers worldwide, but this site is not meant to replace Google's
            official documentation.
          </p>

          <p class="mt-6 font-bold">
            How do I submit my content to be featured on the site?
          </p>
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

          <p class="mt-6 font-bold">
            How many submissions can an individual make?
          </p>
          <p class="mt-4">
            The more the merrier. You can make as many submissions as you want.
            We have no limit to quality content being served on our site.
          </p>

          <p class="mt-6 font-bold">What happens after I submit?</p>
          <p class="mt-4">
            Google experts from each product area review submissions for
            quality, freshness, and uniqueness. If it is deemed appropriate,
            they will approve the content to be featured on the site. You will
            then receive an email about the acceptance of your work.
          </p>

          <p class="mt-6 font-bold">Why did my submission get rejected?</p>
          <p class="mt-4">
            Submissions are rejected for various reasons, such as:
          </p>
          <ul class="ml-6 mt-2 list-disc">
            <li>
              <strong>Absence of a GitHub license</strong>: : Before submitting
              a project, ensure you have either an Apache 2.0 or MIT license.
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

          <p class="mt-6 font-bold">
            When will I get updates about my submission?
          </p>
          <p class="mt-4">
            As soon as you submit your content, you will receive an email
            confirming that your content has been submitted. It generally takes 2-4 weeks
            for the content to be reviewed. Post the review we will send out
            an email stating whether the submission was accepted or not. If you
            don’t see an email, make sure to check your spam or promotions
            folder and add Dev Library emails to your allowlist so you don’t miss
            out on the updates.
          </p>

          <p class="mt-6 font-bold">
            My content was approved. How long will it take for my content to appear on the site?
          </p>
          <p class="mt-4">
            Once approved, the content is added to the site within one
            week.
          </p>

          <p class="mt-6 font-bold">
            How do I request for content to be removed?
          </p>
          <p class="mt-4">
            To remove your content, please raise a Pull Request on the Dev
            Library’s
            <a target="_blank" href="https://github.com/google/devlibrary">
              GitHub repo </a
            >.
          </p>

          <p class="mt-6 font-bold">How do I raise another issue?</p>
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
          <p class="mt-6 font-bold">
            What is the best way to connect with other authors?
          </p>
          <p class="mt-4">
            Join on our <a target="_blank" href="https://discord.gg/AbwzvEqdCu">Discord server</a> where you will find the dedicated channel #dev-library-discussions. This is the best way to chat with other contributors whether you want to discuss new topics, new projects, share your experience or give feedback, this is the place to go!
          </p>
          <p class="mt-6 font-bold">
            Will I get a notification/ email if my submission gets rejected?
          </p>
          <p class="mt-4">
            Yes, we will send you a rejection email.
          </p>
          <p class="mt-6 font-bold">
            What is the best way to reach out to follow stand-out projects from Dev Library?
          </p>
          <p class="mt-4">
            You can <a target="_blank" href="https://forms.gle/Wco9K4ePqgCW5sre6">subscribe to our newsletter here</a>. We curate some best submissions in each tech stack every month with this newsletter.
          </p>
          <p class="mt-4">
            We have also written some blog posts detailing unique projects and how developers have used the platform to showcase their contributions. You can <a href="http://https://developers.googleblog.com/search/label/Dev%20Library?max-results=12" target="_blank">access the archive here</a>.
          </p>
          <p class="mt-4 font-bold">
            How do I get the  Dev Library Contributor's Badge for my Google Developer Profile?
          </p>
          <p class="mt-6">
            If your content is accepted to be showcased on the platform, you  are eligible for the contributor badge. We will send you an email with instructions to claim your contributor badge. Contributor badges are sent out once every 2-3 months.
          </p>
          <p class="mt-4 font-bold">
            Why is the content on my profile grayed out?
          </p>
          <p class="mt-6 mb-20">
            Content which was last updated more than 18 months back is grayed out. We encourage you to keep your content updated as per the latest product guidelines.
          </p>
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

  public showSubmitDialog() {
    EVENT_BUS.$emit(NAME_SHOW_SUBMIT_DIALOG);
  }
}
</script>

<style scoped lang="postcss">
.materialbutton a {
  text-decoration: none;
}

a {
  @apply underline;
}

.section {
  @apply px-4 col-span-6;
  @apply lg:px-0 lg:col-start-2 lg:col-span-4;
}
</style>
