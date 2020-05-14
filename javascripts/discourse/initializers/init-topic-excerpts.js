import { withPluginApi } from "discourse/lib/plugin-api";
import discourseComputed from "discourse-common/utils/decorators";

export default {
  name: "topic-thumbnails-init",
  initialize() {
    withPluginApi("0.8.7", (api) => this.initWithApi(api));
  },

  initWithApi(api) {
    const site = api.container.lookup("site:main");

    api.modifyClass("component:topic-list-item", {
      @discourseComputed
      expandPinned() {
        const shouldOverride = site.mobileView
          ? settings.show_excerpts_mobile
          : settings.show_excerpts_desktop;

        return shouldOverride ? true : this._super();
      },
    });
  },
};