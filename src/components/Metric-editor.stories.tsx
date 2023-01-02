import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Metric from "../components/Metric-editor";
import { MetricUi } from "../metricfun.types";
import { chartData } from "./Fixtures";

export default {
  title: "Metric-fun/Metric_editor",
  component: Metric,
  argTypes: {
    handleClick: { action: "msg" },
    handleOnChange: { action: "msg" },
  },
} as ComponentMeta<typeof Metric>;

const props: Omit<MetricUi, "handleClick" | "handleOnChange"> = {
  id: "01",
  name: "zz top",
  isMetricNameEditable: false,
  isEditable: true,
  isSavingChanges: false,
  showWarning: false,
  showUpdateMetricChanges: false,
  hasOnSaveErrors: false,
  chartTypeSelected: "None",
  chartData,
  metadata: {
    resolution: "monthly",
    update: "update ...",
    limit: "limit x",
  },
};

const Template: ComponentStory<typeof Metric> = (args) => <Metric {...args} />;
//
export const StatusNotEditable = Template.bind({});
StatusNotEditable.args = {
  ...props,
  isEditable: false,
  chartTypeSelected: "Pie",
};

export const StatusEditable = Template.bind({});
StatusEditable.args = {
  ...props,
};

export const NameEditable = Template.bind({});
NameEditable.args = {
  ...props,
  isMetricNameEditable: true,
};

export const ShowPieChart = Template.bind({});
ShowPieChart.args = { ...props, chartTypeSelected: "Pie" };

export const ShowLineChart = Template.bind({});
ShowLineChart.args = { ...props, chartTypeSelected: "Line" };

export const ShowAreaChart = Template.bind({});
ShowAreaChart.args = { ...props, chartTypeSelected: "Area" };

export const ShowSaveMetricControls = Template.bind({});
ShowSaveMetricControls.args = {
  ...props,
  showUpdateMetricChanges: true,
};

export const OnSaveErrors = Template.bind({});
OnSaveErrors.args = {
  ...props,
  name: "",
  isMetricNameEditable: true,
  hasOnSaveErrors: true,
};

export const WarnBeforeDelete = Template.bind({});
WarnBeforeDelete.args = {
  ...props,
  showWarning: true,
};

export const isSavingChanges = Template.bind({});
isSavingChanges.args = {
  ...props,
  isSavingChanges: true,
  isMetricNameEditable: false,
};
