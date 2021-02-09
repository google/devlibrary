import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
  name: "ui",
})
export default class UIModule extends VuexModule {
  public loading = false;

  @Action({ rawError: true })
  async waitFor(promise: Promise<unknown>) {
    this.context.commit("beginLoading");
    try {
      await promise;
    } finally {
      this.context.commit("endLoading");
    }
  }

  @Mutation
  beginLoading() {
    this.loading = true;
  }

  @Mutation
  endLoading() {
    this.loading = false;
  }
}
