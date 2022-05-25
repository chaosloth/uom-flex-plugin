import React from "react";
import { VERSION } from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";

import CustomTaskListContainer from "./components/CustomTaskList/CustomTaskList.Container";
import reducers, { namespace } from "./states";

const PLUGIN_NAME = "UomFlexPlugin";

export default class UomFlexPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      if (!task) return "https://study.unimelb.edu.au/find/?s=";
      console.log("***CJC", task.attributes);

      switch (task.attributes.status) {
        case "Prospect":
          return "https://students.unimelb.edu.au/your-course/manage-your-course/course-enrolment";
        case "Enrolled":
          return "https://students.unimelb.edu.au/new-students/new-student-checklist";
        case "Alumni":
          return "https://www.unimelb.edu.au/alumni";
        case "Faculty":
          return "https://about.unimelb.edu.au/strategy/our-structure/faculties-and-graduate-schools";
        default:
          return "https://study.unimelb.edu.au/find/?s=";
      }
    };
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
