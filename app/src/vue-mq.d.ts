declare module "vue-mq" {
  import { PluginObject } from "vue";

  interface VueMq extends PluginObject<unknown> {
    VueMq: VueMq;
  }

  const VueMq: VueMq;
  export default VueMq;
}
