import { GongGeGroup, GongGeItem } from "../components/mobile";
import base from "paths.macro";
import { parameters } from "./utils";
import { useState } from "react";

export default {
  title: `${base.replace("/src/", "")}GongGeChoiceList`,
  parameters: parameters,
  argTypes: {
    disabled: {
      description:
        "你可以让给`GongGeGroup`传一个disabled，来禁止点击，用于加载也是不错",
      type: "boolean",
      defaultValue: false,
    },
  },
};

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

const Template = ({ disabled }) => {
  const [state, setState] = useState("gong2");
  const handleChange = (val, extValue) => {
    console.log(extValue);
    setState(val);
  };
  return (
    <div style={{ textAlign: "center", width: "calc(100vw - 2rem)" }}>
      <h3>👇宫格式单选组件👇</h3>
      <GongGeGroup
        activeValue={state}
        onChange={handleChange}
        disabled={disabled}
      >
        {array.map((item, index) => (
          <GongGeItem key={index} {...item} />
        ))}
      </GongGeGroup>
    </div>
  );
};

export const BaseActionIcon = Template.bind({});
