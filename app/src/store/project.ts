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
          longDescription:
            "Fladle is the easiest way to scale your instrumentation tests using Firebase Test Lab. You can easily run many hours of instrumentation tests using hundreds of devices in Test Lab and get the results in just few minutes. Fladle simplifies the configuration necessary to scale your tests using Firebase Test Lab and Flank.",
          content: "README.md",
          tags: ["android"],
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
          shortDescription: "Samples to get started with Firebase on Android.",
          longDescription:
            "A collection of quickstart samples demonstrating the Firebase APIs on Android. Each sample is a ready-to-run app.",
          content: "README.md",
          tags: ["android"],
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
