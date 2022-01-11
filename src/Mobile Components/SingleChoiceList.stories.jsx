import {
  HomeThirdPayItem,
  ActionBarItem,
  CouponGroup,
  HotCouponItem,
  NoCouponItem,
  GongGeGroup,
  GongGeItem,
  PaymentSelectionColumnGroup,
  BankCardItem,
  HomeBankCardItem,
  CouponItem,
} from "../components/mobile/business";
import base from "paths.macro";
import { parameters } from "./utils";
import { useState } from "react";
import styled from "styled-components";

export default {
  title: `${base.replace("/src/", "")}Payment Selection Column`,
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

const Icon = () => (
  <i
    style={{
      width: "24px",
      height: "24px",
      color: "blue",
      fontWeight: "bold",
    }}
  >
    M
  </i>
);

const HideP = styled.p`
  margin: 0;
  background: orange;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 9px;
    border-bottom-width: 10px;
    border-style: solid;
    border-color: transparent transparent orange transparent;
    top: -20px;
    left: 10px;
  }
`;

const demoList3 = [
  {
    value: "DC_AS",
    extendValue: "DC_AS",
    children: (
      <div>
        "4120 **** **** 0233"
        <p style={{ margin: 0, background: "orange" }}>优惠信息</p>
      </div>
    ),
    prefixNode: <Icon />,
    collapseNode: (
      <HideP style={{ margin: 0, background: "orange" }}>
        隐藏折叠内容，选中时才显示
      </HideP>
    ),
  },
  {
    value: "CC_DDC",
    extendValue: "CC_DDC",
    children: "5120 **** **** 0233",
    prefixNode: <Icon />,
    collapseNode: (
      <HideP style={{ margin: 0, background: "orange" }}>
        隐藏折叠内容，选中时才显示
      </HideP>
    ),
  },
  {
    value: "CC_ALI",
    extendValue: "CC_ALI",
    children: "6120 **** **** 3233",
    prefixNode: <Icon />,
    disabled: true,
  },
  {
    value: "CC_li",
    extendValue: "CC_li",
    children: "3220 **** **** 0233",
    prefixNode: <Icon />,
    collapseNode: (
      <HideP style={{ margin: 0, background: "orange" }}>
        隐藏折叠内容，选中时才显示
      </HideP>
    ),
  },
];

const demoList1 = [
  {
    value: "weiXin",
    extendValue: "weiXin",
    children: (
      <div>
        "微信支付"
        <p style={{ margin: 0, background: "orange" }}>优惠信息</p>
      </div>
    ),
    prefixNode: <Icon />,
    collapseNode: (
      <p style={{ margin: 0, background: "orange" }}>
        隐藏折叠内容，选中时才显示
      </p>
    ),
  },
  {
    value: "AliPay",
    extendValue: "AliPay",
    children: "支付宝支付",
    prefixNode: <Icon />,
    collapseNode: (
      <p style={{ margin: 0, background: "orange" }}>
        隐藏折叠内容，选中时才显示
      </p>
    ),
  },
  {
    value: "PayPal",
    extendValue: "PayPal",
    children: "PayPal支付",
    prefixNode: <Icon />,
    disabled: true,
  },
  {
    value: "Google",
    extendValue: "Google",
    children: "Google支付",
    prefixNode: <Icon />,
    collapseNode: (
      <p style={{ margin: 0, background: "orange" }}>
        隐藏折叠内容，选中时才显示
      </p>
    ),
  },
];

const Template = (args) => {
  const [status, setStatus] = useState("DC_AS");
  const onChange = function (value, extendValue) {
    // 加入action操作
    args.onChange.call(this, value, extendValue);
    setStatus(value);
  };

  return (
    <div style={{ textAlign: "center", width: "calc(100vw - 2rem)" }}>
      <h3>👇银行卡换卡单选组件👇</h3>
      <PaymentSelectionColumnGroup activeValue={status} onChange={onChange}>
        {demoList3.map((item, index) => (
          <BankCardItem key={index} {...item} />
        ))}
        <ActionBarItem
          prefixNode={<Icon />}
          onClick={() => {
            console.log("adsasdasd");
          }}
        >
          <div>招商银行 储蓄卡</div>
          <div>立减1-30元</div>
        </ActionBarItem>
      </PaymentSelectionColumnGroup>
    </div>
  );
};

export const BankCardSelectionColumn = Template.bind({});

const Template1 = (args) => {
  const [status, setStatus] = useState("DC_AS");
  const onChange = function (value, extendValue) {
    // 加入action操作
    args.onChange.call(this, value, extendValue);
    setStatus(value);
  };

  return (
    <div style={{ textAlign: "center", width: "calc(100vw - 2rem)" }}>
      <h3>👇首页银行卡换卡单选组件👇</h3>
      <PaymentSelectionColumnGroup activeValue={status} onChange={onChange}>
        {demoList3.map((item, index) => (
          <HomeBankCardItem key={index} {...item} />
        ))}
        <ActionBarItem
          onClick={() => {
            console.log("adsasdasd");
          }}
        >
          <div>招商银行 储蓄卡</div>
          <div>立减1-30元</div>
        </ActionBarItem>
      </PaymentSelectionColumnGroup>
    </div>
  );
};

export const HomeBankCardSelectionColumn = Template1.bind({});

const Template2 = (args) => {
  const [status, setStatus] = useState("weiXin");
  const onChange = function (value, extendValue) {
    // 加入action操作
    args.onChange.call(this, value, extendValue);
    setStatus(value);
  };

  return (
    <div style={{ textAlign: "center", width: "calc(100vw - 2rem)" }}>
      <h3>👇三方支付单选组件👇</h3>
      <PaymentSelectionColumnGroup activeValue={status} onChange={onChange}>
        {demoList1.map((item, index) => (
          <HomeThirdPayItem key={index} {...item} />
        ))}
      </PaymentSelectionColumnGroup>
    </div>
  );
};

export const HomeThirdPaySelectionColumn = Template2.bind({});

const demoList4 = [
  {
    value: "naQuHua1",
    extendValue: "拿去花支付立减",
    prefixNode: "拿去花支付立减",
    children: "5元拿去花支付立减券",
  },
  {
    value: "naQuHua2",
    extendValue: "拿去花免息",
    prefixNode: "拿去花免息",
    children: "限选择拿去花分3期时使用",
  },
];

const Template3 = (args) => {
  const [status, setStatus] = useState("no0");
  const onChange = function (value, extendValue) {
    // 加入action操作
    args.onChange.call(this, value, extendValue);
    setStatus(value);
  };

  return (
    <div
      style={{
        background: "#F4F4F4",
        height: "80vh",
        textAlign: "center",
        width: "calc(100vw - 2rem)",
      }}
    >
      <h3>👇Hot优惠券单选组件👇</h3>
      <CouponGroup activeValue={status} onChange={onChange}>
        <NoCouponItem value="no0" extendValue="不使用优惠券">
          不使用优惠券
        </NoCouponItem>
        {demoList4.map((item, index) => (
          <HotCouponItem key={index} {...item} />
        ))}
      </CouponGroup>
    </div>
  );
};

export const HotCouponSelectionColumn = Template3.bind({});

const demoList5 = [
  {
    value: "naQuHua1",
    extendValue: "拿去花支付立减",
    children: "打一折",
  },
  {
    value: "naQuHua2",
    extendValue: "拿去花免息",
    children: "打两折",
  },
  {
    value: "naQuHua2",
    extendValue: "拿去花免息",
    children: "打两折——暂时不可使用",
    disabled: true,
  },
];

const Template5 = (args) => {
  const [status, setStatus] = useState("naQuHua1");
  const onChange = function (value, extendValue) {
    // 加入action操作
    args.onChange.call(this, value, extendValue);
    setStatus(value);
  };

  return (
    <div
      style={{
        height: "80vh",
        textAlign: "center",
        width: "calc(100vw - 2rem)",
      }}
    >
      <h3>👇优惠券单选组件👇</h3>
      <CouponGroup activeValue={status} onChange={onChange}>
        {demoList5.map((item, index) => (
          <CouponItem key={index} {...item} />
        ))}
      </CouponGroup>
    </div>
  );
};

export const CouponSelectionColumn = Template5.bind({});

const array = [
  {
    value: "gong0",
    extendValue: "gong0",
    children: (
      <ul style={{ margin: 0, listStyle: "none", padding: 0 }}>
        <li>不分期</li>
        <li>0服务费</li>
      </ul>
    ),
  },
  {
    value: "gong1",
    extendValue: "gong1",
    children: (
      <ul style={{ margin: 0, listStyle: "none", padding: 0 }}>
        <li>¥251.15 X 3期</li>
        <li>含服务费 ￥1.25/期</li>
      </ul>
    ),
  },
  {
    value: "gong2",
    extendValue: "gong2",
    children: (
      <ul style={{ margin: 0, listStyle: "none", padding: 0 }}>
        <li>¥126.75 X 6期</li>
        <li>含服务费 ¥3.01/期</li>
      </ul>
    ),
    tip: "服务费9.0折",
  },
  {
    value: "gong3",
    extendValue: "gong3",
    children: (
      <ul style={{ margin: 0, listStyle: "none", padding: 0 }}>
        <li>¥64.00 X 12期</li>
        <li>含服务费 ￥3.77/期</li>
        <li>共省￥2.26</li>
      </ul>
    ),
  },
];

const Template4 = (args) => {
  const [state, setState] = useState("gong2");
  const handleChange = (val, extValue) => {
    args.onChange.call(this, val, extValue);
    setState(val);
  };
  return (
    <div style={{ textAlign: "center", width: "calc(100vw - 2rem)" }}>
      <h3>👇宫格式单选组件👇</h3>
      <GongGeGroup
        activeValue={state}
        onChange={handleChange}
        disabled={args.disabled}
      >
        {array.map((item, index) => (
          <GongGeItem key={index} {...item} />
        ))}
      </GongGeGroup>
    </div>
  );
};

export const InstallmentSelectionColumn = Template4.bind({});
