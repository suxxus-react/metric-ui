import { ComponentStory, ComponentMeta } from "@storybook/react";
import MainContainer from "./Page-app-container";
import { IProps } from "../metricfun.types";
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
  isDark: false,
  isLogged: false,
  isEditable: false,
  userName: "",
};

export const Login = Template.bind({});
Login.args = { ...props, isLogged: false };
export const UserLogged = Template.bind({});
UserLogged.args = { ...props, isLogged: true };
