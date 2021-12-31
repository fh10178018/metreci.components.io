/*
 * @Author: HanFang
 * @Date: 2021-12-06 14:26:15
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-22 15:22:58
 */

import { ReactNode } from "react";
import { useDebounce } from "../../utils/common";
import { maskZIndex } from "../constants/zIndexManage";
import { MaskWrapper, MaskBox } from "./styled";

export interface ITsExampleProps {
  visible?: boolean;
  children?: ReactNode;
  callBack?: () => void;
  disabled?: boolean;
  zIndex?: number;
}

const Mask = ({
  visible = true,
  children,
  callBack,
  zIndex = maskZIndex,
  disabled = false,
}: ITsExampleProps) => {
  const _callBack = () => {
    if (disabled) return;
    if (callBack) {
      callBack();
    }
  };
  return (
    <MaskWrapper
      style={{
        zIndex: zIndex,
        height: visible ? "100vh" : 0,
        transition: !visible ? "height 0s ease-in-out 0.5s" : "unset",
      }}
    >
      <MaskBox
        style={{ opacity: visible ? 1 : 0 }}
        onClick={useDebounce(_callBack, 1000, true)}
      />
      {children}
    </MaskWrapper>
  );
};

export default Mask;
