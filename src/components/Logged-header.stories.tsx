import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoggedHeader from "../components/Logged-header";
import { metricsState } from "./Fixtures";

export default {
  title: "Metric-fun/LoggedHeader_editor",
  component: LoggedHeader,
  argTypes: {
    dispatchMsg: { action: "msg" },
  },
} as ComponentMeta<typeof LoggedHeader>;

const Template: ComponentStory<typeof LoggedHeader> = (args) => (
  <LoggedHeader {...args} />
);
//

export const MetricsNonEditable = Template.bind({});
MetricsNonEditable.args = {
  ...metricsState,
  userName: "John Doe",
  isEditable: false,
};
export const MetricsEditable = Template.bind({});
MetricsEditable.args = {
  ...metricsState,
  userName: "John Doe",
  isEditable: true,
};
