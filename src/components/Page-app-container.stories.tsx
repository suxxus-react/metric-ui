import { ComponentStory, ComponentMeta } from "@storybook/react";
import MainContainer from "./Page-app-container";
import { IProps, MetricUi } from "../metricfun.types";
import { metricsState, metricProps } from "./Fixtures";
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

const props: Omit<IProps, "handleClick" | "handleOnChange"> = {
  ...metricsState,
  userName: "Alice",
};

export const Login = Template.bind({});
Login.args = { ...props };

export const UserLogged = Template.bind({});
UserLogged.args = {
  ...props,
  isLogged: true,
  metrics: [...Array(4)].fill({ ...metricProps }).map((metricProps) => ({
    ...metricProps,
    isEditable: false,
    name: "Siouxie",
    chartTypeSelected: "Area",
  })),
};
