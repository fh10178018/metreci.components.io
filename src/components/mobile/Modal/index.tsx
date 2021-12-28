import Modal, { ModalPropTypes } from "./Modal";
import * as ReactDOM from "react-dom";
import { alertZIndex } from "../constants/zIndexManage";

if (typeof window !== "undefined" && !window.alertZIndex) {
  window.alertZIndex = alertZIndex;
}

export default function confirm(config: ModalPropTypes) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  let currentConfig = { ...config, close, visible: true };

  function render(props: ModalPropTypes) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */
    const timer = setTimeout(() => {
      let handleCancel;
      if (props.onCancel) {
        handleCancel = () => {
          props.onCancel &&
            props.onCancel.apply({
              close,
            });
        };
      }

      const handleOk = () => {
        if (props.onOk) {
          props.onOk.apply({
            close,
          });
        } else {
          close();
        }
      };
      const handleMask = () => {
        if (props.onMask) {
          props.onMask();
        }
        close();
      };
      ReactDOM.render(
        <Modal
          {...props}
          onCancel={handleCancel}
          onOk={handleOk}
          onMask={handleMask}
          zIndex={++window.alertZIndex}
        />,
        container
      );
      clearTimeout(timer);
    });
  }
  function destroy() {
    const timer = setTimeout(() => {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
      clearTimeout(timer);
    });
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        if (typeof config.afterClose === "function") {
          config.afterClose();
        }
        destroy();
      },
    };
    render(currentConfig);
  }

  function update(configUpdate: ModalPropTypes) {
    currentConfig = {
      ...currentConfig,
      ...configUpdate,
    };
    render(currentConfig);
  }

  render(currentConfig);
  return {
    destroy: close,
    update,
  };
}
