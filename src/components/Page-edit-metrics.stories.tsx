import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IProps } from "../metricfun.types";
import PageEditMetrics from "./Page-edit-metrics";
import { MetricUi } from "../metricfun.types";
import { metricProps } from "./Fixtures";

export default {
  title: "Metric-fun/Page-edit-metrics",
  component: PageEditMetrics,
  argTypes: {
    handleClick: { action: "msg" },
    handleOnChange: { action: "msg" },
  },
} as ComponentMeta<typeof PageEditMetrics>;

const props: Omit<IProps, "handleClick" | "handleOnChange"> = {
  isDark: false,
  isLogged: false,
  isEditable: false,
  userName: "Martha",
  metrics: [],
};

const Template: ComponentStory<typeof PageEditMetrics> = (args) => (
  <PageEditMetrics {...args} />
);

export const WithOutMetricData = Template.bind({});
WithOutMetricData.args = { ...props };

export const WithMetricsNonEditable = Template.bind({});
WithMetricsNonEditable.args = {
  ...props,
  metrics: [...Array(6)].fill({ ...metricProps }).map((metricProps) => ({
    ...metricProps,
    isEditable: false,
    name: "Arcadia",
    chartTypeSelected: "Area",
  })),
};

export const WithMetricsEditable = Template.bind({});
WithMetricsEditable.args = {
  ...props,
  isEditable: true,
  metrics: [...Array(6)].fill({ ...metricProps }).map((metricProps) => ({
    ...metricProps,
    isEditable: true,
    name: "Arcadia",
    chartTypeSelected: "Line",
  })),
};
