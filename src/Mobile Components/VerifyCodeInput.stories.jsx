import VerifyCodeInput from "../components/mobile/VerifyCodeInput/index.tsx";
import base from "paths.macro";
import { parameters } from "./utils";
import { useState } from "react";

export default {
  title: `${base.replace("/src/", "")}VerifyCodeInput`,
  component: VerifyCodeInput,
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
  return (
    <>
      <VerifyCodeInput
        {...args}
        onChangeValue={() => {
          console.log("onChangeValue");
        }}
      />
    </>
  );
};

export const BaseVerifyCodeInput = Template.bind({});

BaseVerifyCodeInput.args = {
  length: 6,
};
