import { ComponentStory, ComponentMeta } from "@storybook/react";
import MainContainer from "./Page-app-container";
export default {
  title: "Metric-fun/Main-container",
  component: MainContainer,
} as ComponentMeta<typeof MainContainer>;
//
const Template: ComponentStory<typeof MainContainer> = (args) => (
  <MainContainer {...args} />
);

export const Login = Template.bind({});
Login.args = { isLogged: false };
export const UserLogged = Template.bind({});
UserLogged.args = { isLogged: true };
