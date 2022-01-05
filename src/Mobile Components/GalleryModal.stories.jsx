import GalleryModal from "../components/mobile/common/GalleryModal";
import base from "paths.macro";
import { parameters } from "./utils";

export default {
  title: `${base.replace("/src/", "")}GalleryModal`,
  component: GalleryModal,
  parameters: parameters,
  argTypes: {
    visible: {
      description: "Modal是否可见",
      type: "boolean",
      defaultValue: false,
    },
    maskClosable: {
      description: "点击mask能否自动关闭",
      type: "boolean",
      defaultValue: true,
    },
    customStyle: {
      description: "Modal content样式",
      type: "CSSProperties",
    },
    onMask: {
      description: "点击Mask遮罩的回调函数",
      type: "() => void",
    },
    zIndex: {
      description: "自定义浮层高度",
      type: "number",
    },
  },
};

const Template = (args) => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h3>👇画廊式Modal组件，可用来展示👇</h3>
        <h5>通过Control操控组件展示</h5>
        <GalleryModal visible={args.visible} maskClosable={args.maskClosable}>
          <h1>asdasdasdasdasd</h1>
          <h1>asdasdasdasdasd</h1>
          <h1>asdasdasdasdasd</h1>
          <h1>asdasdasdasdasd</h1>
        </GalleryModal>
      </div>
    </>
  );
};

export const SingleChoiceModal = Template.bind({});
