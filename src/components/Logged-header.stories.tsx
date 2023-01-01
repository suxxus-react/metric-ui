import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoggedHeader from "../components/Logged-header";

export default {
  title: "Metric-fun/LoggedHeader_editor",
  component: LoggedHeader,
  argTypes: {
    handleOnChange: { action: "msg" },
    handleClick: { action: "msg" },
  },
} as ComponentMeta<typeof LoggedHeader>;

const Template: ComponentStory<typeof LoggedHeader> = (args) => (
  <LoggedHeader {...args} />
);
//
export const UserLogged = Template.bind({});
UserLogged.args = { userName: "John Doe" };
