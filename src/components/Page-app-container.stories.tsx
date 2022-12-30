import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withReactContext } from "storybook-react-context";

import MainContainer from "./Page-app-container";

export default {
  title: "Metric-fun/Main-container",
  component: MainContainer,
  decorators: [withReactContext],
} as ComponentMeta<typeof MainContainer>;

//
const Template: ComponentStory<typeof MainContainer> = (args) => (
  <MainContainer {...args} />
);

export const Login = Template.bind({});
Login.args = { logged__s: false };
Login.parameters = {
  reactContext: {
    logged: false,
  },
};

export const UserLogged = Template.bind({});
UserLogged.parameters = {
  reactContext: {
    logged: true,
  },
};

//

// mport { withReactContext } from 'storybook-react-context';
//
// export default {
//   title: 'some story',
//   decorators: [withReactContext],
// };
// UserLogged.args = { logged: true };
//
// someComponent.parameters = {
//   reactContext: {
//     initialState: {
//       defaultValue: true,
//     },
//     reducer: (state, action) => ({ ...state, action })
//   }
// };
