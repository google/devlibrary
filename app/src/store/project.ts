import Vue from "vue";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { firestore } from "@/plugins/firebase";

import { RepoData } from "../../../shared/types";

@Module({
  name: "project",
})
export default class ProjectModule extends VuexModule {
  // TODO: Remove this and unify with repos
  public gitHubProjects: RepoData[] = [];

  // Repos by product and then by id
  public repos: Record<string, Record<string, RepoData>> = {};

  @Action({ rawError: true })
  async fetchRepo(opts: { product: string; id: string }) {
    console.log("fetchRepo", JSON.stringify(opts));

    const db = firestore();
    const ref = db
      .collection("products")
      .doc(opts.product)
      .collection("repos")
      .doc(opts.id);

    const snap = await ref.get();
    const repo = snap.data() as RepoData;

    this.context.commit("addRepos", { product: opts.product, repos: [repo] });
  }

  @Action({ rawError: true })
  async fetchProjects() {
    // TODO: This collectiongroup query should probably one query per product instead
    const db = firestore();
    const snap = await db.collectionGroup("repos").get();
    const gh = snap.docs.map((doc) => doc.data() as RepoData);

    this.context.commit("setRepoDatas", gh);
  }

  @Mutation
  addRepos(opts: { product: string; repos: RepoData[] }) {
    // We need to use Vue.set because Vue can't react to new keys in a map
    // unless it's told abot them
    if (!this.repos[opts.product]) {
      Vue.set(this.repos, opts.product, {});
    }

    for (const repo of opts.repos) {
      Vue.set(this.repos[opts.product], repo.id, repo);
    }
  }

  @Mutation
  setRepoDatas(gitHubProjects: RepoData[]) {
    this.gitHubProjects = gitHubProjects;
  }

  get repoByProductAndId() {
    return (opts: { product: string; id: string }) => {
      if (!this.repos[opts.product]) {
        return null;
      }

      return this.repos[opts.product][opts.id] || null;
    };
  }
}
