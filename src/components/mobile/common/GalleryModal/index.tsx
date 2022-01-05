/*
 * @Author: HanFang
 * @Date: 2021-12-16 11:27:11
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-05 11:35:34
 */
import { ReactNode, CSSProperties } from "react";
import { alertZIndex } from "../../constants/zIndexManage";
import { Wrapper } from "./styled";
import Mask from "../Mask/index";
import Collapse from "../Collapse";

export interface ModalPropTypes {
  children?: ReactNode; // Modal的标题
  customStyle?: CSSProperties; // Modal content样式
  onMask?: () => void; // 点击Mask遮罩的回调函数
  zIndex?: number; // 浮层高度
  visible?: boolean; // Modal是否可见
  maskClosable?: boolean; // 点击mask能否自动关闭
}

const GalleryModal = ({
  children,
  customStyle,
  onMask,
  zIndex = alertZIndex,
  visible = false,
  maskClosable = true,
}: ModalPropTypes) => {
  return (
    <Mask
      visible={visible}
      zIndex={zIndex}
      callBack={onMask}
      disabled={!maskClosable}
    >
      <Collapse visible={visible}>
        <Wrapper style={customStyle}>{children}</Wrapper>
      </Collapse>
    </Mask>
  );
};

export default GalleryModal;
