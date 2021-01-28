import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { firestore } from "@/plugins/firebase";

import { GitHubProject } from "../../../shared/types";

@Module({
  name: "project",
})
export default class ProjectModule extends VuexModule {
  public gitHubProjects: GitHubProject[] = [];

  @Action({ rawError: true })
  async fetchProjects() {
    // TODO: This collectiongroup query should probably one query per product instead
    const db = firestore();
    const snap = await db.collectionGroup("repos").get();
    const gh = snap.docs.map((doc) => doc.data() as GitHubProject);

    this.context.commit("setGitHubProjects", gh);
  }

  @Mutation
  setGitHubProjects(gitHubProjects: GitHubProject[]) {
    this.gitHubProjects = gitHubProjects;
  }
}
