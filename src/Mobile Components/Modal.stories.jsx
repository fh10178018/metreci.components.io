import { Modal } from "../components/mobile/common";
import base from "paths.macro";
import { parameters } from "./utils";
export default {
  title: `${base.replace("/src/", "")}Modal`,
  component: Modal,
  parameters: parameters,
};

const Template = () => {
  const handleShowModal = () => {
    Modal({
      title: "单选Modal1",
      content: (
        <ul style={{ height: 1000 }}>
          <li>高度1000px,自定义内容滑块</li>
          <li>可点击遮罩关闭</li>
          <li>通过函数驱动组件的显示</li>
          <li>考虑到关闭条件的存在，所以组件不帮助关闭组件！</li>
        </ul>
      ),
      maskClosable: true,
      onOk: function () {
        // 注意不要使用箭头函数
        this.close();
      },
      onMask: function () {
        // 注意不要使用箭头函数
        // 注意回调函数中关闭Modal层
        this.close();
      },
    });
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h5>只有单选的Modal！</h5>
        <button onClick={handleShowModal}>
          <strong>唤醒Modal</strong>
        </button>
      </div>
    </>
  );
};

export const SingleChoiceModal = Template.bind({});

const Template1 = () => {
  const handleShowModal = () => {
    Modal({
      title: "多选Modal2",
      content: (
        <ul style={{ height: 1000 }}>
          <li>高度1000px,自定义内容滑块</li>
          <li>不可点击遮罩关闭</li>
          <li>通过函数驱动组件的显示</li>
          <li>考虑到关闭条件的存在，所以组件不帮助关闭组件！</li>
        </ul>
      ),
      maskClosable: false,
      onOk: function () {
        // 注意不要使用箭头函数
        this.close();
      },
      onMask: function () {
        // 注意不要使用箭头函数
        // 注意回调函数中关闭Modal层
        this.close();
      },
      onCancel: function () {
        // 注意不要使用箭头函数
        this.close();
      },
    });
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h5>只有单选的Modal！</h5>
        <button onClick={handleShowModal}>
          <strong>唤醒Modal</strong>
        </button>
      </div>
    </>
  );
};

export const MultipleChoiceModal = Template1.bind({});
