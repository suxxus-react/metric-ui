import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Metric from "../components/Metric-editor";

export default {
  title: "Metric-fun/Metric_editor",
  component: Metric,
  argTypes: {
    handleClick: { action: "msg" },
    handleOnChange: { action: "msg" },
  },
} as ComponentMeta<typeof Metric>;

const props = {
  isEditable: true,
  name: "metric name",
  id: "01",

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
};
export const NameNonEditable = Template.bind({});
NameNonEditable.args = {
  ...props,
};

export const NameEditable = Template.bind({});
NameEditable.args = {
  ...props,
  isMetricNameEditable: true,
};

export const WarnBeforeDelete = Template.bind({});
WarnBeforeDelete.args = {
  ...props,
  showWarning: true,
};
