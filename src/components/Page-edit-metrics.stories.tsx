import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PageEditMetrics from "./Page-edit-metrics";

export default {
  title: "Metric-fun/Page-edit-metrics",
  component: PageEditMetrics,
} as ComponentMeta<typeof PageEditMetrics>;
//
const Template: ComponentStory<typeof PageEditMetrics> = () => (
  <PageEditMetrics />
);

export const EditMetric = Template.bind({});
