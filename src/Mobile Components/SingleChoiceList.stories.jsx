import SingleChoiceList from "../components/mobile/SingleChoiceList/index.tsx";
import base from "paths.macro";
import { parameters } from "./utils";
import { useState } from "react";

const { SingleChoiceGroup, SingleChoiceItem, ActionItem } = SingleChoiceList;

export default {
  title: `${base.replace("/src/", "")}SingleChoiceList`,
  component: SingleChoiceGroup,
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
    extendValue: "weiXinPay",
    headerNode: "4120 **** **** 0233",
    children: (
      <div
        style={{
          background: "#f5f7fa",
          padding: "12px",
          color: "#ccc",
          display: "flex",
          alignItems: "center",
          height: "45px",
        }}
      >
        安全码
      </div>
    ),
    footerNode: (
      <div
        style={{
          background: "#e9f2fe",
          padding: "12px",
          fontSize: "12px",
        }}
      >
        使用其它信用卡/借记卡支付
      </div>
    ),
  },
  {
    extendValue: "weiXinPay",
    headerNode: "微信支付",
    children: "",
  },
  {
    extendValue: "aliPay",
    headerNode: "支付宝支付（支持Disabled）",
    children: "",
    disabled: true,
  },
  {
    extendValue: "paypalPay",
    headerNode: "paypal支付（支持Loading）",
    children: "",
    loading: true,
  },
];

const demoList2 = [
  {
    extendValue: "CC_Mastercard",
    headerNode: "4120 **** **** 0233",
  },
  {
    extendValue: "CC_DDC",
    headerNode: "5120 **** **** 0233",
  },
  {
    extendValue: "CC_ALI",
    headerNode: "6120 **** **** 3233",
    disabled: true,
  },
  {
    extendValue: "CC_li",
    headerNode: "3220 **** **** 0233",
  },
];

const demoList3 = [
  {
    extendValue: {
      sdfsd: 2,
    },
    headerNode: "4120 **** **** 0233",
    footerNode: "4120 **** **** 0233",
    children: (
      <div
        style={{
          background: "#FF9800",
          padding: "3px",
          color: "white",
        }}
      >
        优惠1
      </div>
    ),
    iconNode: "M",
  },
  {
    extendValue: "CC_DDC",
    headerNode: "5120 **** **** 0233",
    children: (
      <div
        style={{
          background: "#FF9800",
          padding: "3px",
          color: "white",
        }}
      >
        优惠2
      </div>
    ),
    iconNode: "M",
  },
  {
    extendValue: "CC_ALI",
    headerNode: "6120 **** **** 3233",
    iconNode: "M",
    disabled: true,
  },
  {
    extendValue: "CC_li",
    headerNode: "3220 **** **** 0233",
    iconNode: "M",
  },
];

const Template = (args) => {
  const [status, setStatus] = useState(0);
  const onChange = function (value, extendValue) {
    // 加入action操作
    args.onChange.call(this, value, extendValue);
    setStatus(value);
  };

  return (
    <SingleChoiceGroup activeValue={status} onChange={onChange} type={0}>
      {demoList.map((item, index) => (
        <SingleChoiceItem value={index} key={index} {...item} />
      ))}
    </SingleChoiceGroup>
  );
};

Template.args = {
  type: 0,
};
export const SingleChoiceListOfType0 = Template.bind({});

const Template1 = (args) => {
  const [status, setStatus] = useState(0);
  const onChange = function (value, extendValue) {
    // 加入action操作
    args.onChange.call(this, value, extendValue);
    setStatus(value);
  };

  return (
    <SingleChoiceGroup onChange={onChange} type={1}>
      {demoList2.map((item, index) => (
        <SingleChoiceItem value={index} key={index} {...item} />
      ))}
    </SingleChoiceGroup>
  );
};

Template1.args = {
  type: 1,
};

export const SingleChoiceListOfType1 = Template1.bind({});

const Template2 = (args) => {
  const [status, setStatus] = useState(-1);
  const onChange = function (value, extendValue) {
    // 加入action操作
    args.onChange.call(this, value, extendValue);
    setStatus(value);
  };

  return (
    <SingleChoiceGroup activeValue={status} onChange={onChange} type={3}>
      {demoList3.map((item, index) => (
        <SingleChoiceItem value={index} key={index} {...item} />
      ))}
      <ActionItem
        value={12}
        headerNode="asdasd"
        extendValue="23"
        onClick={(e, a, c) => {
          console.log(e, a, c);
        }}
      />
      <ActionItem
        value={12}
        isPlus
        headerNode="asdasd"
        extendValue="23"
        onClick={(e, a, c) => {
          console.log(e, a, c);
        }}
      />
    </SingleChoiceGroup>
  );
};

Template2.args = {
  type: 2,
};

export const SingleChoiceListOfType2 = Template2.bind({});
