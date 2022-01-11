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
          <p class="mt-6 font-bold">What is Dev Library?</p>
          <p class="mt-4">
            Dev Library is an open-source platform showcasing a developer’s work
            with Google technologies. It hosts GitHub projects and Blogs from
            external sites (Medium, Hashnode, Dev.to, personal sites) built
            using any of the Google Technologies like:
          </p>
          <ul class="ml-6 mt-2 list-disc">
            <li>
              Angular
            </li>
            <li>
              Android
            </li>
            <li>
              Flutter
            </li>
            <li>
              Firebase
            </li>
            <li>
              Machine Learning
            </li>
            <li>
              Cloud
            </li>
          </ul>

          <p>
            DevLibrary aims to provide visibility to developers by showcasing
            their content. We hope this visibility helps them reach a wider
            audience and inspire other developers to learn, contribute and share
            their knowledge.
          </p>

          <p class="mt-6 font-bold">What is the purpose of this site?</p>
          <p class="mt-4">
            We want to enable developers all around the world to showcase their
            use of Google technologies and for all developers to find
            inspiration and tools to use in their own projects.
          </p>

          <p class="mt-6 font-bold">
            Will this remove the need for documentations and guides?
          </p>
          <p class="mt-4">
            Not at all! This site is a complement to Google’s official
            documentation. We hope you’ll find inspiring and useful pieces of
            code built by developers worldwide.
          </p>

          <p class="mt-6 font-bold">Why did my submission get rejected?</p>
          <p class="mt-4">
            Submissions can get rejected due to various reasons. Some common
            reasons for rejecting content are listed below:
          </p>
          <ul class="ml-6 mt-2 list-disc">
            <li>
              <strong> Absence of a GitHub license </strong>
              : Before submitting a project, ensure you have either added Apache
              2.0 or MIT license.
            </li>
            <li>
              <strong> Incoherent README </strong>
              : Make sure you don’t have an empty README. To get accepted, we
              encourage having a properly written, structured, and
              well-explained README with visuals, if needed.
            </li>
            <li>
              <strong> Improper Versioning </strong>
              : Make sure your project follows the latest software updates.
            </li>
            <li>
              <strong> Monetised</strong>
              : If in some way we find out that the blogs are behind a paywall
              (in Medium) or have ads, or are getting monetized in any form, we
              don’t accept them.
            </li>
            <li>
              <strong> Localization</strong>
              : Currently, because of being a fairly new platform–we don’t
              support content in a language other than English. Although, we are
              working toward localization–for now–it is not accepted.
            </li>
            <li>
              <strong> Freshness</strong>
              : If the content submitted by you is fairly older or hasn’t been
              updated for a long time–chances of rejection are higher.
            </li>
          </ul>

          <p>
            For an extensive explanation, read our contributor-guidelines.pdf to
            fix the errors and re-submit.
          </p>

          <p class="mt-6 font-bold">How to submit my content on the site?</p>
          <p class="mt-4">To submit the content:</p>
          <ol class="ml-6 mt-2 list-disc">
            <li>
              Navigate to the DevLibrary homepage and click submit.
            </li>
            <li>
              You will be redirected to the Advocu Form link.
            </li>
            <li>
              Fill in your personal and project details.
            </li>
            <li>
              Click Submit.
            </li>
          </ol>

          <p>
            You will receive an email once your submission has been curated.
            <b>Note</b>: Once submitted, you can’t edit the form.
          </p>

          <p class="mt-6 font-bold">
            How many submissions can an individual make?
          </p>
          <p class="mt-4">
            The more the merrier. You can make as many submissions as you want.
            We have no limit to quality content being served on our site.
          </p>

          <p class="mt-6 font-bold">
            What is the process of selection/rejection of content?
          </p>
          <p class="mt-4">
            Once you make the submission of your work (GitHub or Blog), internal
            Google experts from each product area review it. Check it for
            quality, freshness, and uniqueness. If it passes all the checks,
            they select the content to go on the site. You then receive an email
            about the acceptance of your work.
          </p>

          <p class="mt-6 font-bold">How does a submission get selected?</p>
          <p class="mt-4">
            Each submission will be reviewed by Google product experts to
            determine if it is high-quality, relevant, and unique.
          </p>

          <p class="mt-6 font-bold">
            When will I get updates about the rejection/acceptance of my
            content?
          </p>
          <p class="mt-4">
            As soon as you submit your content, you receive an email from the
            Advocu team confirming your submission. Curators generally take 1-2
            weeks to curate the content. Once done, you receive an email for the
            Acceptance/Rejection of your work. If you don’t see an email, make
            sure to check your spam or promotions folder. Also, allowlist
            DevLibrary emails to refrain from missing out on the updates from
            the next time onward.
          </p>

          <p class="mt-6 font-bold">
            How long does it take for content to appear on the site?
          </p>
          <p class="mt-4">
            Once approved, the content gets on the site within a week of
            approval.
          </p>

          <p class="mt-6 font-bold">
            Can I submit content in different product categories?
          </p>
          <p class="mt-4">Yes! YOU CAN.</p>

          <p class="mt-6 font-bold">
            Is there any reward or recognition for contributors?
          </p>
          <p class="mt-4">
            What is hard work without any recognition! If you become an author
            at Dev Library, you receive:
          </p>
          <ul class="ml-6 mt-2 list-disc">
            <li>
              Visibility of your work
            </li>
            <li>
              Contributor Badge on Google Developer Profile
            </li>
            <li>
              Stamp of Google on your work
            </li>
            <li>
              Feature in our monthly newsletter
            </li>
          </ul>

          <p>And many more surprises!</p>

          <p class="mt-6 font-bold">
            How do I request for content to be removed?
          </p>
          <p class="mt-4">
            To remove your content, please raise a Pull Request on the Dev
            Library’s GitHub repo. In case you are unable to do this, please
            fill out the
            <a href="https://forms.gle/MdMEj7hkdWFLUBrf7" target="blank">
              Contact Us form
            </a>
            and we will get back to you in 48 hours for next steps.
          </p>

          <p class="mt-6 font-bold">How do I raise an issue?</p>
          <p class="mt-4">
            To raise an issue, please post your issue here on the Dev Library
            repo. In case you are unable to do this, please fill out the
            <a href="https://forms.gle/MdMEj7hkdWFLUBrf7" target="blank">
              Contact Us form</a
            >.
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
