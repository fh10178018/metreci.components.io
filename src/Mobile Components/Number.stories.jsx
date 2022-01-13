import { NumberRollItem } from "../components/mobile/common/MoneyFormat";
import base from "paths.macro";
import { parameters } from "./utils";
import { useState } from "react";

export default {
  title: `${base.replace("/src/", "")}MoneyFormat`,
  component: Image,
  parameters: parameters,
  argTypes: {
    number: {
      description: "图片地址",
      type: "string",
      defaultValue: "0",
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

const nums = [0, 2, 6, 2, 5];

const Template = (args) => {
  const [state, setState] = useState(0);
  return (
    <div style={{ textAlign: "center" }}>
      <h3>👇以下是比较常用的功能性Icon👇</h3>
      <h5>点击复制组件</h5>
      <div>
        <NumberRollItem number={args.number + ""} />
      </div>
    </div>
  );
};
export const BaseActionIcon = Template.bind({});
