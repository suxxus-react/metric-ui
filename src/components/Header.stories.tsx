import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MetricsHeader from "./Header";

export default {
  title: "Metric-fun/Metrics_main-header",
  component: MetricsHeader,
} as ComponentMeta<typeof MetricsHeader>;

const Template: ComponentStory<typeof MetricsHeader> = () => <MetricsHeader />;

export const MainHeader = Template.bind({});
