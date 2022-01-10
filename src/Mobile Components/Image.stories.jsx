import { Image } from "../components/mobile/common";
import base from "paths.macro";
import { parameters } from "./utils";

export default {
  title: `${base.replace("/src/", "")}Image`,
  parameters: parameters,
  argTypes: {
    color: {
      description: "Icon的颜色",
      type: "string",
      control: {
        type: "color",
      },
      defaultValue: "#705454",
    },
    size: {
      size: "自定义Icon大小",
      type: "number",
      control: {
        type: "range",
        step: 1,
        min: 15,
        max: 99,
      },
      defaultValue: 36,
    },
  },
};

const Template = (args) => (
  <div style={{ textAlign: "center" }}>
    <h3>👇以下是比较常用的功能性Icon👇</h3>
    <h5>点击复制组件</h5>
    <div>
      <Image name="error.png" width={150} height={150} />
    </div>
  </div>
);

export const BaseActionIcon = Template.bind({});
