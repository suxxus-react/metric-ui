import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoginWithAccount from "./Login-with-social-account";
export default {
  title: "Metric-fun/Login-with-account",
  component: LoginWithAccount,
} as ComponentMeta<typeof LoginWithAccount>;

const Template: ComponentStory<typeof LoginWithAccount> = () => (
  <LoginWithAccount />
);

export const LoginWithGithubAccount = Template.bind({});
