import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

import { BlogData } from "@/model/blog";

@Module({
  name: "blog",
})
export default class BlogModule extends VuexModule {
  public Blogs: BlogData[] = [];

  @Action({ rawError: true })
  async fetchBlogs() {
    // TODO: One day this will load from Firestore, right now it's just some fake data
    const bl: BlogData[] = [
      {
        metadata: {
          author: "Roman Akhromieiev",
          title:
            "Building a Telegram Bot With Firebase Cloud Functions and Telegraf.js",
          link:
            "https://medium.com/firebase-developers/building-a-telegram-bot-with-firebase-cloud-functions-and-telegraf-js-5e5323068894",
        },
        stats: {
          minutes: 5,
        },
      },
      {
        metadata: {
          author: "David East",
          title:
            "The comprehensive guide to GitHub Actions and Firebase Hosting",
          link:
            "https://medium.com/firebase-developers/the-comprehensive-guide-to-github-actions-and-firebase-hosting-818502d86c31",
        },
        stats: {
          minutes: 7,
        },
      },
      {
        metadata: {
          author: "Paul Ruiz",
          title:
            "A Practical Approach to Cloud Functions for Firebase: Direct Calls",
          link:
            "https://medium.com/firebase-developers/a-practical-approach-to-cloud-functions-for-firebase-direct-calls-f38ec7f5981c",
        },
        stats: {
          minutes: 7,
        },
      },
    ];

    this.context.commit("setBlogs", bl);
  }

  @Mutation
  setBlogs(Blogs: BlogData[]) {
    this.Blogs = Blogs;
  }
}
