import Drawer from "../components/mobile/Drawer/index.tsx";
import base from "paths.macro";
import { parameters } from "./utils";
import { useState } from "react";
import { useRef } from "react";

export default {
  title: `${base.replace("/src/", "")}Drawer`,
  component: Drawer,
  argTypes: {
    openStatus: {
      description: "Drawer开关状态",
      type: "boolean",
      control: false,
    },
    onHeaderClose: {
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
      defaultValue: "标题内容",
    },
    hasAnimation: {
      description: "是否有弹出动画",
      defaultValue: false,
    },
    maskClosable: {
      description: "点击弹层是否允许关闭",
      defaultValue: true,
    },
    showBackIcon: {
      description: "展示返回按钮",
      defaultValue: true,
    },
    showCloseIcon: {
      description: "展示关闭按钮",
      defaultValue: true,
    },
    onChange: {
      description: "每次openStatus发生变化都会触发该回调函数",
    },
  },
  parameters: parameters,
};

const Template = (args) => {
  const [status, setStatus] = useState(false);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h5>openStatus的控件放置在案例中！</h5>
        <button onClick={() => setStatus(true)}>
          <strong>唤醒Drawer</strong>
        </button>
      </div>
      <Drawer
        {...args}
        openStatus={status}
        onHeaderClose={() => {
          args.onHeaderClose(false);
          setStatus(false);
        }}
        onHeaderGoBack={undefined}
      >
        <ul>
          <li>
            <h1>Drawer基本Demo展示</h1>
          </li>
          <li>
            <h1>Drawer基本Demo展示</h1>
          </li>
          <li>
            <h1>Drawer基本Demo展示</h1>
          </li>
          <li>
            <h1>Drawer基本Demo展示</h1>
          </li>
          <li>
            <h1>Drawer基本Demo展示</h1>
          </li>
          <li>
            <h1>Drawer基本Demo展示</h1>
          </li>
          <li>
            <h1>Drawer基本Demo展示</h1>
          </li>
          <li>
            <h1>Drawer基本Demo展示</h1>
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export const BaseDrawer = Template.bind({});

BaseDrawer.args = {
  allowClose: true,
  modalElementClass: "",
};
