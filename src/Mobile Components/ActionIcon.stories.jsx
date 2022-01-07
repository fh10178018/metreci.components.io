import {
  SquareCheckIcon, // ■ 方块未选中
  SquareUnCheckIcon, // ■ 方块选中
  RightArrowIcon, // 右箭头（锐角）
  LeftArrowIcon, //左箭头（锐角）
  BottomArrowIcon, //下箭头（锐角）
  TopArrowIcon, //上箭头（锐角）
  PlusIcon, // 加号
  CheckIcon, //√ 对勾
  PayCheckedIcon, // 支付成功提示用的对勾
  CloseIcon, //关闭
  RadioUnCheckIcon, // ⚪ 圆形未选中
  RadioCheckIcon, // ⚪ 圆未选中
  TiedCardIcon, // 绑卡按钮
  InfoIcon,
  WaitIcon,
} from "../components/mobile/common";
import base from "paths.macro";
import { parameters } from "./utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
const ActionIcon = [
  SquareCheckIcon, // ■ 方块未选中
  SquareUnCheckIcon, // ■ 方块选中
  RightArrowIcon, // 右箭头（锐角）
  LeftArrowIcon, //左箭头（锐角）
  BottomArrowIcon, //下箭头（锐角）
  TopArrowIcon, //上箭头（锐角）
  PlusIcon, // 加号
  CheckIcon, //√ 对勾
  PayCheckedIcon, // 支付成功提示用的对勾
  CloseIcon, //关闭
  RadioUnCheckIcon, // ⚪ 圆形未选中
  RadioCheckIcon, // ⚪ 圆未选中
  TiedCardIcon, // 绑卡按钮
  InfoIcon,
  WaitIcon,
];

export default {
  title: `${base.replace("/src/", "")}ActionIcon`,
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
    <h3>👇以下是比较常用的功能性Icon👇</h3>
    <h5>点击复制组件</h5>
    <div>
      {ActionIcon.map((Item, index) => (
        <CopyToClipboard key={index} text={`<${Item.name} />`}>
          <div
            style={{
              width: "calc(50% - 10px)",
              height: "90px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              background: "aliceblue",
              margin: "5px",
              cursor: "pointer",
            }}
          >
            <span>
              <Item color="black" />
            </span>
            <strong>{Item.name}</strong>
          </div>
        </CopyToClipboard>
      ))}
    </div>
  </div>
);

export const BaseActionIcon = Template.bind({});
