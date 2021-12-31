import Collapse from "../components/mobile/Collapse";
import base from "paths.macro";
import { parameters } from "./utils";

export default {
  title: `${base.replace("/src/", "")}Collapse`,
  component: Collapse,
  parameters: parameters,
  argTypes: {
    visible: {
      description: "折叠组件的打开状态",
      type: "boolean",
      defaultValue: false,
    },
    height: {
      description: "自定义折叠组件的高度，默认会计算children的高度",
      type: "number",
    },
    animationTime: {
      description: "自定义折叠组件的动画事件，默认为全局动画时间",
      type: "number",
      defaultValue: 240,
    },
  },
};

const Template = (args) => (
  <div style={{ textAlign: "center" }}>
    <h1>基础折叠组件</h1>
    <h1>👇下发为折叠内容👇</h1>
    <Collapse {...args}>
      {args.visible && (
        <div>
          <h1 style={{ margin: 0, background: "antiquewhite" }}>
            我是折叠的内容
          </h1>
        </div>
      )}
    </Collapse>
  </div>
);

export const BaseCollapse = Template.bind({});
