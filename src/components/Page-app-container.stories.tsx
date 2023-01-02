import { ComponentStory, ComponentMeta } from "@storybook/react";
import MainContainer from "./Page-app-container";
import { IProps } from "../metricfun.types";
import { MetricUi } from "../metricfun.types";
export default {
  title: "Metric-fun/Main-container",
  component: MainContainer,
  argTypes: {
    handleClick: { action: "msg" },
    handleOnChange: { action: "msg" },
  },
} as ComponentMeta<typeof MainContainer>;
//
const Template: ComponentStory<typeof MainContainer> = (args) => (
  <MainContainer {...args} />
);

const metricUiProps: MetricUi = {
  id: "01",
  name: "My super metric",
  isMetricNameEditable: false,
  isEditable: false,
  isSavingChanges: false,
  showUpdateMetricChanges: false,
  hasOnSaveErrors: false,
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
  userName: "Alice",
  metrics: [],
};

export const Login = Template.bind({});
Login.args = { ...props };

export const UserLogged = Template.bind({});
UserLogged.args = {
  ...props,
  isLogged: true,
  metrics: [...Array(3)].fill({ ...metricUiProps }),
};
