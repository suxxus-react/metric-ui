import { ComponentStory, ComponentMeta } from "@storybook/react";
import Metric from "../components/Metric-editor";
import { metricProps } from "./Fixtures";

export default {
  title: "Metric-fun/Metric_editor",
  component: Metric,
  argTypes: {
    dispatchMsg: { action: "msg" },
  },
} as ComponentMeta<typeof Metric>;

const Template: ComponentStory<typeof Metric> = (args) => <Metric {...args} />;
//
export const StatusNotEditable = Template.bind({});
StatusNotEditable.args = {
  ...metricProps,
  isEditable: false,
  chartTypeSelected: "Pie",
};

export const StatusEditable = Template.bind({});
StatusEditable.args = {
  ...metricProps,
  chartTypeSelected: "Pie",
};

export const NameEditable = Template.bind({});
NameEditable.args = {
  ...metricProps,
  isMetricNameEditable: true,
  chartTypeSelected: "Pie",
};

export const ShowPieChart = Template.bind({});
ShowPieChart.args = { ...metricProps, chartTypeSelected: "Pie" };

export const ShowLineChart = Template.bind({});
ShowLineChart.args = { ...metricProps, chartTypeSelected: "Line" };

export const ShowAreaChart = Template.bind({});
ShowAreaChart.args = { ...metricProps, chartTypeSelected: "Area" };

export const ShowNone = Template.bind({});
ShowNone.args = { ...metricProps };

export const ShowSaveMetricControls = Template.bind({});
ShowSaveMetricControls.args = {
  ...metricProps,
  showUpdateMetricChanges: true,
  chartTypeSelected: "Pie",
};

export const OnSaveErrors = Template.bind({});
OnSaveErrors.args = {
  ...metricProps,
  name: "",
  chartTypeSelected: "Pie",
  isMetricNameEditable: true,
};

export const WarnBeforeDelete = Template.bind({});
WarnBeforeDelete.args = {
  ...metricProps,
  showWarning: true,
  chartTypeSelected: "Pie",
};

export const isSavingChanges = Template.bind({});
isSavingChanges.args = {
  ...metricProps,
  chartTypeSelected: "Pie",
  isSavingChanges: true,
  isMetricNameEditable: false,
};
