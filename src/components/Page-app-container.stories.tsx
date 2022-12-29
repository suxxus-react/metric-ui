import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MainContainer from "./Page-app-container";
export default {
  title: "Metric-fun/Main-container",
  component: MainContainer,
} as ComponentMeta<typeof MainContainer>;
//
const Template: ComponentStory<typeof MainContainer> = () => <MainContainer />;

export const PageMainContainerLogin = Template.bind({});
