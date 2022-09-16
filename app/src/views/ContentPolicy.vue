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
  <div>
    <Breadcrumbs :links="getBreadcrumbs()" />
    <!-- Header -->
    <div class="grid grid-cols-10 gap-4 border-b border-gray-100">
      <div class="col-start-2 col-span-8">
        <div class="py-10">
          <h1>Content Policy</h1>
          <p>
            By submitting content to devlibrary.withgoogle.com, you agree to
            only provide content or information that does not violate the law
            nor anyone’s rights (including intellectual property rights).
          </p>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="grid grid-cols-10 gap-4 pt-4 pb-12">
      <div class="col-start-2 col-span-8">
        <h2>Copyright</h2>
        <p>
          It is Google's policy to comply with notices of copyright infringement
          pursuant to the
          <a href="https://www.law.cornell.edu/uscode/text/17/512"
            >Digital Millennium Copyright Act</a
          >. If you think someone is infringing your intellectual property
          rights, you can send a notice that complies with the listed
          <a
            href="https://support.google.com/legal/answer/3463239?hl=en&ref_topic=4558877"
            >Copyright Infringement Notification</a
          >
          requirements to
          <a href="mailto:dmca-agent@google.com">dmca-agent@google.com</a>, and
          we’ll take appropriate action. For example, we suspend or close Google
          Accounts of repeat copyright infringers as described in our
          <a
            href="https://support.google.com/legal/topic/4558877?hl=en&ref_topic=4556931"
            >Copyright Help Center</a
          >.
        </p>

        <h2>Irrelevant Content</h2>
        <p>
          Submissions must be clear, concise, and related to support for the
          specific Google developer product/platform that is the focus of that
          submission. Do not submit content that is off-topic or does not
          address the topic at hand.
        </p>

        <h2>Spam</h2>
        <p>
          Do not spam. This can include unwanted promotional or commercial
          content, unwanted content that is created by an automated program,
          unwanted repetitive content, nonsensical content, or anything that
          appears to be a mass solicitation.
        </p>

        <h2>Malware and Similar Malicious Content Distribution</h2>
        <p>
          Do not transmit malware or any content that harms or interferes with
          the operation of the networks, servers, end user devices, or other
          infrastructure. This includes the direct hosting, embedding, or
          transmission of malware, viruses, destructive code, or other harmful
          or unwanted software or similar content. This also includes content
          that transmits viruses, causes pop-ups, attempts to install software
          without the user’s consent, or otherwise impacts users with malicious
          code. See our
          <a href="https://safebrowsing.google.com/#policies"
            >Safe Browsing Policies</a
          >
          for more information.
        </p>

        <h2>Phishing</h2>
        <p>
          Do not use this product for phishing. This includes soliciting or
          collecting sensitive data such as passwords, financial details, and
          social security numbers. See our
          <a href="https://safebrowsing.google.com/#policies"
            >Safe Browsing Policies</a
          >
          for more information.
        </p>

        <h2>Sexually Explicit Content</h2>
        <p>
          Do not distribute content that contains sexually explicit material,
          like nudity, graphic sex acts, and pornographic content, non-explicit
          sexual material, like partial nudity or other sexualized content, or
          any adult themed material, like sexual products. This includes driving
          traffic to commercial pornography sites.
        </p>

        <h2>Personal and Confidential Information</h2>
        <p>
          Do not distribute other people’s personal or confidential information
          without authorization. This includes the use of sensitive information,
          such as U.S. Social Security numbers, bank account numbers, credit
          card numbers, images of signatures, and personal health documents. In
          most cases where this information is broadly available elsewhere on
          the internet or in public records, like national ID numbers listed on
          a government website, we generally don't process enforcement actions.
        </p>

        <h2>Hate Speech</h2>
        <p>
          Do not engage in hate speech. Hate speech is content that promotes or
          condones violence against or has the primary purpose of inciting
          hatred against an individual or group on the basis of their race or
          ethnic origin, religion, disability, age, nationality, veteran status,
          sexual orientation, gender, gender identity, or any other
          characteristic that is associated with systemic discrimination or
          marginalization.
        </p>

        <h2>Harassment</h2>
        <p>
          Do not harass, bully, or threaten others. We also don’t allow this
          product to be used to engage or incite others in these activities.
          This includes singling someone out for malicious abuse, threatening
          someone with serious harm, sexualizing someone in an unwanted way,
          exposing private information of someone else that could be used to
          carry out threats, disparaging or belittling victims of violence or
          tragedy or harassing in other ways, or inciting others to carry out
          these activities. Keep in mind that online harassment is illegal in
          many places and can have serious offline consequences for both the
          harasser and the victim. We may take appropriate action if we are
          notified of threats of harm or other dangerous situations, which may
          include reporting you to the relevant authorities.
        </p>

        <h2>Impersonation</h2>
        <p>
          We don't allow impersonation of other people or companies or other
          behavior that is misleading, deceptive, or fraudulent.
        </p>

        <h2>Other Issues</h2>
        <p>
          If you have issues with content on devlibrary.withgoogle.com and you
          need to contact us, you can email the team at
          <a href="mailto:library-google-dev@google.com"
            >library-google-dev@google.com</a
          >.
        </p>

        <h2>Changes</h2>
        <p>
          Policies in this document may change over time. The current version of
          this document can be viewed at
          <a href="https://devlibrary.withgoogle.com/contentpolicy"
            >https://devlibrary.withgoogle.com/contentpolicy</a
          >.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { BreadcrumbLink } from "../../../shared/types";

@Component({
  components: {
    Breadcrumbs,
  },
})
export default class ContentPolicy extends Vue {
  public getBreadcrumbs(): BreadcrumbLink[] {
    return [{ name: "Content Policy", path: "" }];
  }
}
</script>

<style scoped lang="postcss">
h1 {
  @apply mb-4;
}

h2 {
  @apply mt-4 mb-2;
}

a {
  @apply underline;
}
</style>
