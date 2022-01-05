import PayButton from "../components/mobile/common/PayButton/index.tsx";
import base from "paths.macro";
import { parameters } from "./utils";
import GlobalThemeProvider from "../components/mobile/common/GlobalThemeProvider/index.tsx";

export default {
  title: `${base.replace("/src/", "")}PayButton`,
  component: PayButton,
  argTypes: {
    text: {
      description: "按钮名称",
      defaultValue: "确认支付",
    },
  },
  parameters: parameters,
};

const Template = (args) => {
  return (
    <GlobalThemeProvider>
      <PayButton {...args} />
    </GlobalThemeProvider>
  );
};

export const BaseVerifyCodeInput = Template.bind({});

BaseVerifyCodeInput.args = {
  size: "L",
};
