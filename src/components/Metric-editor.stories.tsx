import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Metric from "../components/Metric-editor";

export default {
  title: "Metric-fun/Metric_editor",
  component: Metric,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Metric>;

const Template: ComponentStory<typeof Metric> = (args) => <Metric />;
//
export const Edit = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: "Button",
// };
//
// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: "Button",
// };
//
// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button",
// };
//
// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button",
// };
