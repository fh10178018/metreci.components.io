import VerifyCodeDrawer from "../components/mobile/business/VerifyCodeDrawer/index.tsx";
import base from "paths.macro";
import { parameters } from "./utils";
import { useState } from "react";

export default {
  title: `${base.replace("/src/", "")}VerifyCodeDrawer`,
  component: VerifyCodeDrawer,
  argTypes: {
    title: {
      description: "标题",
      defaultValue: "手机验证",
      type: "string",
    },
    subTitle: {
      description: "输入验证码标题",
      defaultValue: "已向您的绑定手机136****5678发送短信验证码",
      type: "string",
    },
    length: {
      description: "验证码长度",
      type: "number",
      defaultValue: 6,
    },
    timerCount: {
      description: "倒计时长",
      type: "number",
      defaultValue: 60,
    },
    timerTitle: {
      description: "倒计时文案",
      type: "number",
      defaultValue: "重新获取",
    },
    buttonText: {
      description: "按钮文案",
      type: "string",
      defaultValue: "提交",
    },
    timerEnd: {
      description: "倒计时结束回调",
    },
    onChangeText: {
      description: "验证码实时变化值",
    },
    onClose: {
      description: "关闭回调",
    },

    onSubmit: {
      description: "提交函数",
    },
    autoConfirm: {
      description: "是否自动提交",
      type: "boolean",
      defaultValue: false,
    },
    visible: {
      control: false,
    },
    getCode: {
      description: "获取验证码函数",
    },
    getCodeOnShow: {
      description: "是否在 visiable 编程 true 的时候自动请求 getCode",
      type: "boolean",
      defaultValue: true,
    },
  },
  parameters: parameters,
};

const Template = (args) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        show VerifyCodeDrawer
      </button>
      <VerifyCodeDrawer
        {...args}
        onClose={() => setVisible(false)}
        visible={visible}
      />
    </>
  );
};

export const BaseVerifyCodeDrawer = Template.bind({});

BaseVerifyCodeDrawer.args = {
  length: 6,
  getCode: function () {
    console.log("getCode");
    return new Promise((resolve, reject) => {
      resolve({ result: "success", message: "" });
    });
  },
  onSubmit: function () {
    console.log("onSubmit");
    return new Promise((resolve, reject) => {
      resolve({ result: "success", message: "提交失败" });
      // reject({ result: "error" });
    });
  },
};
