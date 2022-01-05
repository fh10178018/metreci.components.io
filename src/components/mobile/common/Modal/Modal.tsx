/*
 * @Author: HanFang
 * @Date: 2021-12-16 11:27:11
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-05 14:56:26
 */
import { ReactNode, CSSProperties, useEffect, useState } from "react";
import { alertZIndex } from "../../constants/zIndexManage";
import {
  ModalWrapper,
  Header,
  Content,
  Footer,
  CancelButton,
  OkButton,
  Box,
} from "./styled";
import { TransitionMotion } from "react-motion";
import Mask from "../Mask/index";
import { usePrevious } from "../../../utils/common";
import { themeTime } from "../../constants/themeStyled";

export interface ModalPropTypes {
  title?: ReactNode; // Modal的标题
  content?: ReactNode; // Modal的标题
  bodyStyle?: CSSProperties; // Modal Body样式
  contentStyle?: CSSProperties; // Modal content样式
  headerStyle?: CSSProperties; // Modal Header 样式
  onOk?: () => void; // 点击OK回调函数
  onCancel?: () => void; // 点击取消回调函数
  onMask?: () => void; // 点击Mask遮罩的回调函数
  afterClose?: () => void; // 关闭之后的回调函数,动画之后
  okText: string; // OK的文本
  cancelText?: string; // 取消的文本
  zIndex?: number; // 浮层高度
  visible?: boolean; // Modal是否可见
  maskClosable?: boolean; // 点击mask能否自动关闭
  hasInductionStyle?: boolean; // 是否有上下渐变的诱导样式
}

const Modal = ({
  title,
  content,
  headerStyle = {},
  bodyStyle = {},
  contentStyle = {},
  okText = "OK",
  cancelText = "Cancel",
  onCancel,
  onOk = () => void 0,
  onMask,
  afterClose = () => void 0,
  zIndex = alertZIndex,
  visible,
  maskClosable,
  hasInductionStyle = false,
}: ModalPropTypes) => {
  const getStyles = () => [
    {
      style: {
        scale: localVisible ? 1 : 0,
        opacity: localVisible ? 1 : 0,
      },
      key: "ModalTransition",
    },
  ];
  const willLeave = () => {
    return {
      scale: 0,
      opacity: 0,
    };
  };
  const willEnter = () => ({
    scale: 0,
    opacity: 0,
  });
  const oldVisible = usePrevious(visible);
  const [localVisible, setLocalVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setLocalVisible(true);
      }, 100);
    } else {
      setLocalVisible(false);
    }

    if (!visible && oldVisible === true) {
      setTimeout(() => {
        afterClose();
      }, 400);
    }
  }, [afterClose, visible, oldVisible]);

  return (
    <Mask
      visible={localVisible}
      zIndex={zIndex}
      callBack={onMask}
      disabled={!maskClosable}
    >
      <TransitionMotion
        willEnter={willEnter}
        willLeave={willLeave}
        styles={getStyles()}
        didLeave={afterClose}
      >
        {(inStyles) => (
          <>
            {inStyles[0] ? (
              <div
                style={{
                  transform: `scale(${inStyles[0].style.scale})`,
                  opacity: inStyles[0].style.scale,
                  transition: `opacity ${themeTime.ANIMATION_TIME}ms  ease-in-out,transform ${themeTime.ANIMATION_TIME}ms  ease-in-out`,
                }}
              >
                <ModalWrapper
                  style={{
                    ...bodyStyle,
                    zIndex: zIndex,
                  }}
                >
                  {title && (
                    <Header
                      style={{ ...headerStyle }}
                      hasInductionStyle={hasInductionStyle}
                    >
                      {title}
                    </Header>
                  )}
                  <Content
                    style={{ ...contentStyle }}
                    hasInductionStyle={hasInductionStyle}
                  >
                    <Box hasInductionStyle={hasInductionStyle}>{content}</Box>
                  </Content>
                  <Footer>
                    {onCancel && (
                      <CancelButton onClick={onCancel}>
                        {cancelText}
                      </CancelButton>
                    )}
                    <OkButton onClick={onOk}>{okText}</OkButton>
                  </Footer>
                </ModalWrapper>
              </div>
            ) : null}
          </>
        )}
      </TransitionMotion>
    </Mask>
  );
};

export default Modal;
