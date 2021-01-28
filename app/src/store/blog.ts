import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { firestore } from "@/plugins/firebase";

import { BlogData } from "../../../shared/types";

@Module({
  name: "blog",
})
export default class BlogModule extends VuexModule {
  public Blogs: BlogData[] = [];

  @Action({ rawError: true })
  async fetchBlogs() {
    // TODO: This collectiongroup query should probably one query per product instead
    const db = firestore();
    const snap = await db.collectionGroup("blogs").get();
    const bl = snap.docs.map((doc) => doc.data() as BlogData);

    this.context.commit("setBlogs", bl);
  }

  @Mutation
  setBlogs(Blogs: BlogData[]) {
    this.Blogs = Blogs;
  }
}
