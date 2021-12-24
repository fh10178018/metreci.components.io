import MultipleChoiceList from "../components/mobile/MultipleChoiceList/index.tsx";
import base from "paths.macro";
import { parameters } from "./utils";
import { useState } from "react";

const { MultipleChoiceGroup, MultipleChoiceItem } = MultipleChoiceList;

export default {
  title: `${base.replace("/src/", "")}MultipleChoiceList`,
  component: MultipleChoiceList,
  argTypes: {
    onChange: {
      description: "改变时触发",
    },
    type: {
      description: "样式类型",
      type: "number",
      options: [0, 1],
      control: false,
    },
    activeValue: {
      description: "当前选中值",
      type: "number",
      control: false,
    },
  },
  parameters: parameters,
};

const demoList = [
  {
    children: <h2>礼品卡-任我游</h2>,
    footerNode: "使用 ¥300.32",
  },
  {
    footerNode: "使用 ¥300.32",
    children: <h2>礼品卡-任我行</h2>,
  },
  {
    footerNode: "使用 ¥300.32",
    children: <h2>钱包</h2>,
    disabled: true,
  },
];

const Template = (args) => {
  const [status, setStatus] = useState([0]);
  const onChange = function (value, extendValue) {
    // 加入action操作
    args.onChange.call(this, value, extendValue);
    setStatus(value);
  };

  return (
    <MultipleChoiceGroup activeValueArray={status} onChange={onChange} type={0}>
      {demoList.map((item, index) => (
        <MultipleChoiceItem value={index} key={index} {...item} />
      ))}
    </MultipleChoiceGroup>
  );
};

Template.args = {
  type: 0,
};
export const SingleChoiceListOfType0 = Template.bind({});
