import GalleryModal from "../components/mobile/GalleryModal";
import base from "paths.macro";
import { parameters } from "./utils";
import { useState } from "react";

export default {
  title: `${base.replace("/src/", "")}GalleryModal`,
  component: GalleryModal,
  parameters: parameters,
};

const Template = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h5>只有单选的Modal！</h5>
        <button onClick={() => setVisible(true)}>
          <strong>唤醒Modal</strong>
        </button>
        <GalleryModal visible={visible} onMask={() => setVisible(false)}>
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
