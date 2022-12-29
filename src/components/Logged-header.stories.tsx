import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoggedHeader from "../components/Logged-header";

export default {
  title: "Metric-fun/LoggedHeader_editor",
  component: LoggedHeader,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LoggedHeader>;

const Template: ComponentStory<typeof LoggedHeader> = (args) => (
  <LoggedHeader />
);
//
export const UserLogged = Template.bind({});
