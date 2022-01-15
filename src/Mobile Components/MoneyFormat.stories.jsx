import MoneyFormat from "../components/mobile/common/MoneyFormat";
import base from "paths.macro";
import { parameters } from "./utils";
import { useState } from "react";

export default {
  title: `${base.replace("/src/", "")}MoneyFormat`,
  component: MoneyFormat,
  parameters: parameters,
  argTypes: {
    amount: {
      description: "金额",
      type: "string",
      defaultValue: "320.23",
    },
    size: {
      size: "自定义字体大小",
      type: "number",
      control: {
        type: "range",
        step: 1,
        min: 10,
        max: 200,
      },
      defaultValue: 120,
    },
  },
};

const nums = [0, 2, 6, 2, 5];

const Template = (args) => {
  const [state, setState] = useState(0);
  return (
    <div style={{ textAlign: "center" }}>
      <h3>👇下面是金额变动组件👇</h3>
      <div>
        <MoneyFormat {...args} />
      </div>
    </div>
  );
};
export const BaseActionIcon = Template.bind({});
