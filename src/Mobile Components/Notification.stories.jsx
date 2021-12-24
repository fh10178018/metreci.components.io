import Notification from "../components/mobile/Notification/index.tsx";
import base from "paths.macro";
import { parameters } from "./utils";
import GlobalThemeProvider from "../components/mobile/GlobalThemeProvider/index.tsx";
import { useRef, useEffect } from "react";

export default {
  title: `${base.replace("/src/", "")}Notification`,
  component: Notification,
  argTypes: {
    length: {
      description: "验证码长度",
      defaultValue: 6,
      type: "number",
    },
  },
  parameters: parameters,
};

const Template = (args) => {
  const inputRef = useRef();
  useEffect(() => {
    return () => Notification.destroy();
  }, []);
  return (
    <GlobalThemeProvider>
      <input ref={inputRef} />
      <button
        onClick={() => {
          Notification.open({
            content: inputRef.current.value || "不能为空",
            duration: 10,
          });
        }}
      >
        点击发送信息
      </button>
    </GlobalThemeProvider>
  );
};

export const BaseNotification = Template.bind({});
