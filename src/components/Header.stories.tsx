import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MetricsHeader from "./Header";

export default {
  title: "Metric-fun/Metrics_main-header",
  component: MetricsHeader,
  argTypes: { handleClick: { action: "click" } },
} as ComponentMeta<typeof MetricsHeader>;

const Template: ComponentStory<typeof MetricsHeader> = (args) => (
  <MetricsHeader {...args} />
);

export const MainHeaderLightMode = Template.bind({});
MainHeaderLightMode.args = {
  isDark: false,
};
export const MainHeaderDarkMode = Template.bind({});
MainHeaderDarkMode.args = {
  isDark: true,
};
