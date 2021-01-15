import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

import { GitHubProject } from "@/model/project";

@Module({
  name: "project",
})
export default class ProjectModule extends VuexModule {
  public gitHubProjects: GitHubProject[] = [];

  @Action({ rawError: true })
  async fetchProjects() {
    // TODO: One day this will load from Firestore, right now it's just some fake data
    const gh: GitHubProject[] = [
      {
        metadata: {
          name: "Fladle",
          owner: "runningcode",
          repo: "fladle",
          shortDescription:
            "Easily scale your Android Instrumentation Tests across Firebase Test Lab with Flank.",
          longDescription: "TODO",
          content: "README.md",
        },
        stats: {
          stars: 123,
          forks: 456,
        },
      },
      {
        metadata: {
          name: "Firebase Quickstarts for Android",
          owner: "firebase",
          repo: "quickstart-android",
          shortDescription: "Samples to get started with Firebase on Android",
          longDescription: "TODO",
          content: "README.md",
        },
        stats: {
          stars: 9876,
          forks: 7654,
        },
      },
    ];

    this.context.commit("setGitHubProjects", gh);
  }

  @Mutation
  setGitHubProjects(gitHubProjects: GitHubProject[]) {
    this.gitHubProjects = gitHubProjects;
  }
}
