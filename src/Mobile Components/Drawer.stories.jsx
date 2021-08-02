import React from "react";
import Drawer from "../components/mobile/Drawer/index.tsx";
import base from "paths.macro";
import { parameters } from "./utils";

export default {
  title: `${base.replace("/src/", "")}Drawer`,
  component: Drawer,
  argTypes: {
    openStatus: {
      description: "Drawer开关状态",
      type: "boolean",
      defaultValue: false,
    },
    onRequestClose: {
      description: "点击返回、关闭或者遮罩时触发,用于双向绑定，控制openStatus",
      require: true,
    },
    direction: {
      description: "抽屉打开方向 ，支持下面状态",
      control: { type: "select" },
      defaultValue: "bottom",
    },
    drawerType: {
      description: "抽屉类型",
      control: { type: "select" },
    },
    drawerHeight: {
      description: "抽屉高度,number类型视为高度比，string视为基本高度样式",
      control: { type: "select" },
      options: ["300px", 80],
    },
    allowClose: {
      description: "默认为 true，一旦为 false，无法唤醒抽屉",
    },
    modalElementClass: {
      description: "应用于顶层包裹元素的 className",
    },
    headTitle: {
      description: "标题内容,可以是react节点",
      type: "string",
    },
    hasAnimation: {
      description: "是否有弹出动画",
      defaultValue: false,
    },
    maskClosable: {
      description: "点击弹层是否允许关闭",
    },
    onChange: {
      description: "每次openStatus发生变化都会触发该回调函数",
    },
  },
  parameters: parameters,
};

const Template = (args) => {
  return (
    <Drawer {...args}>
      <strong>半填充</strong>
    </Drawer>
  );
};

export const BaseDemo = Template.bind({});
