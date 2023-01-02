import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IProps } from "../metricfun.types";
import PageEditMetrics from "./Page-edit-metrics";
import { MetricUi } from "../metricfun.types";

export default {
  title: "Metric-fun/Page-edit-metrics",
  component: PageEditMetrics,
  argTypes: {
    handleClick: { action: "msg" },
    handleOnChange: { action: "msg" },
  },
} as ComponentMeta<typeof PageEditMetrics>;

const metricUiProps: MetricUi = {
  id: "01",
  name: "metric name",
  isMetricNameEditable: false,
  isEditable: true,
  isSavingChanges: false,
  showUpdateMetricChanges: false,
  showWarning: false,
  chartTypeSelected: "None",
  metadata: {
    resolution: "monthly",
    update: "update ...",
    limit: "limit x",
  },
  handleOnChange: () => ({ type: "None" }),
  handleClick: () => ({ type: "None" }),
};

const props: Omit<IProps, "handleClick" | "handleOnChange"> = {
  isDark: false,
  isLogged: false,
  isEditable: false,
  userName: "",
  metrics: [],
};

const Template: ComponentStory<typeof PageEditMetrics> = (args) => (
  <PageEditMetrics {...args} />
);

export const WithOutMetricData = Template.bind({});
WithOutMetricData.args = { ...props };

export const WithStoredMetricData = Template.bind({});
WithStoredMetricData.args = {
  ...props,
  metrics: [...Array(6)].fill({ ...metricUiProps }),
};
