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
  <div class="about">
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
          <p class="mt-4">
            If your question is not answered below and you need to contact us,
            you can email the team at
            <a href="mailto:library-google-dev@google.com"
              >library-google-dev@google.com</a
            >
          </p>
          <p class="mt-8 flex flex-wrap gap-4">
            <a href="https://forms.gle/2JoN6csvyvnDC8Nd9" target="_blank">
              <MaterialButton type="primary"> Send feedback </MaterialButton>
            </a>

            <a href="mailto:library-google-dev@google.com">
              <MaterialButton type="secondary"> Contact us </MaterialButton>
            </a>
          </p>
        </div>
      </div>
    </div>
    <div class="grid gap-4 grid-cols-6">
      <div class="section mt-6 lg:mt-10">
        <h1>Policies</h1>

        <div class="mt-6 lg:mt-10 lg:text-lg">
          <p class="mt-6 font-bold">Terms of Service</p>
          <p class="mt-4">
            <a href="https://developers.google.com/terms/site-terms"
              >https://developers.google.com/terms/site-terms</a
            >
          </p>
          <p class="mt-6 font-bold">Privacy Policy</p>
          <p class="mt-4">
            <a href="https://policies.google.com/privacy"
              >https://policies.google.com/privacy</a
            >
          </p>
          <p class="mt-6 font-bold">Copyright Infringement</p>
          <p class="mt-4">
            If you think someone is infringing your intellectual property
            rights, you can send a notice that complies with the listed
            <a
              href="https://support.google.com/legal/answer/3463239?hl=en&ref_topic=4558877"
              >Copyright Infringement Notification</a
            >
            requirements to
            <a href="mailto:dmca-agent@google.com">dmca-agent@google.com</a>,
            and we’ll take appropriate action. For example, we suspend or close
            the Google Accounts of repeat copyright infringers as described in
            our
            <a
              href="https://support.google.com/legal/topic/4558877?hl=en&ref_topic=4556931"
              >Copyright Help Center</a
            >.
          </p>
        </div>
      </div>

      <div class="section mt-6 lg:mt-10">
        <h1>Frequently Asked Questions</h1>

        <div class="mt-6 lg:mt-10 lg:text-lg">
          <p class="mt-6 font-bold">What is the purpose of this site?</p>
          <p class="mt-4">
            We want to enable developers all around the world to showcase their
            use of Google technologies and for all developers to find
            inspiration and tools to use in their own projects.
          </p>
          <p class="mt-6 font-bold">
            Does this replace Google’s technical documentation and guides?
          </p>
          <p class="mt-4">
            Not at all! This site is a complement to Google’s official
            documentation. We hope you’ll find inspiring and useful pieces of
            code built by developers worldwide.
          </p>
          <p class="mt-6 font-bold">How do I submit content to the site?</p>
          <p class="mt-4">
            You can submit your content by clicking
            <b class="font-bold">Submit</b> at the top of any page. We aim to
            reply within 2-4 weeks.
          </p>
          <p class="mt-6 font-bold">How does a submission get selected?</p>
          <p class="mt-4">
            Each submission will be reviewed by Google product experts to
            determine if it is high-quality, relevant, and unique.
          </p>
          <p class="mt-6 font-bold">
            How long does it take for content to be approved and appear on the
            site?
          </p>
          <p class="mt-4">
            You should be hearing from us within a couple of weeks of having
            submitted your content. Don’t panic if you don’t hear from us
            though: the volume of submissions may vary over time, but we’ll make
            it a point to always get back to you.
          </p>
          <p class="mt-6 font-bold">
            Is there any reward or recognition for contributors?
          </p>
          <p class="mt-4">
            If your content is selected, we hope that the increased visibility
            that your content gets constitutes an extra token of appreciation.
          </p>
          <p class="mt-6 font-bold">
            How do I request for content to be removed?
          </p>
          <p class="mt-4">
            Fill out
            <a href="https://forms.gle/FPQg4s8DUjEdqyQR7" target="blank">
              this form
            </a>
            and we will get back to you in 48 hours for next steps.
          </p>
          <p class="mt-6 font-bold">
            How do I report an error in the technical documentation?
          </p>
          <p class="mt-4">
            Each piece of content on this site is authored by a different
            developer and hosted on an external platform (GitHub, Medium, etc).
            Please use the feedback mechanisms available on those platforms in
            order to help improve content directly.
          </p>
          <p class="mt-6 font-bold">
            I want to learn how to code, is this the right resource for me?
          </p>
          <p class="mt-4">
            If you have never coded yet, this is probably not the best site to
            get started on. Instead type “learn JavaScript” or “learn Python” in
            your favourite search engine :-) and you’ll find many excellent
            resources. If you however have some basic coding knowledge, this
            site may prove useful to you as it references curated open source
            projects and libraries that you can re-use and learn from.
          </p>
          <p class="mt-20"></p>
        </div>
      </div>
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
export default class About extends Vue {}
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
