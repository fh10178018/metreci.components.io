import { Image } from "../components/mobile/common";
import base from "paths.macro";
import { parameters } from "./utils";

export default {
  title: `${base.replace("/src/", "")}Image`,
  component: Image,
  parameters: parameters,
  argTypes: {
    src: {
      description: "图片地址",
      type: "string",
      defaultValue:
        "https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF",
    },
    alt: {
      description: "图片介绍",
      type: "string",
    },
    width: {
      size: "定义图片大小",
      type: "number",
      control: {
        type: "range",
        step: 1,
        min: 10,
        max: 999,
      },
      defaultValue: 634,
    },
    height: {
      size: "定义图片高度",
      type: "number",
      control: {
        type: "range",
        step: 1,
        min: 10,
        max: 999,
      },
      defaultValue: 304,
    },
  },
};

const Template = (args) => (
  <div style={{ textAlign: "center" }}>
    <h3>👇以下是比较常用的功能性Icon👇</h3>
    <h5>点击复制组件</h5>
    <div>
      <Image {...args} />
    </div>
  </div>
);

export const BaseActionIcon = Template.bind({});
