/*
 * @Author: HanFang
 * @Date: 2021-12-28 17:34:50
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-31 11:19:00
 */
import { CSSProperties, FC, ReactNode, useEffect, useState } from "react";
import { TransitionMotion } from "react-motion";
import { usePrevious } from "../../../utils/common";
import { Wrapper } from "./styled";
import { themeTime } from "../../constants/themeStyled";
import useDimensions from "../../../utils/useDimensions";

interface CollapsePropTypes {
  visible: boolean; // 是否出现
  height?: number; // 自定义折叠内容高度
  animationTime?: number; // 自定义动画时间，单位ms
  children?: ReactNode; // 折叠隐藏的内容,注意子元素不要使用margin
  customStyle?: CSSProperties;
}

const Collapse: FC<CollapsePropTypes> = ({
  children,
  visible = false,
  animationTime = themeTime.ANIMATION_TIME,
  height,
  customStyle = {},
}: CollapsePropTypes) => {
  const previousChildren = usePrevious(children);
  const [curChildren, setCurChildren] = useState(children);
  const [curHeight, setHeight] = useState(0);
  const { observe, unobserve } = useDimensions({
    useBorderBoxSize: true, // 计算为 border-box size
    onResize: ({ height }) => {
      setHeight(height);
      observe();
    },
  });

  const willEnter = () => ({
    h: 0,
  });
  const getStyles = () => {
    return [
      {
        key: "Collapse",
        data: curChildren,
        style: {
          h: visible ? height || curHeight : 0,
        },
      },
    ];
  };
  useEffect(() => {
    if (previousChildren && !children) {
      const timer = setTimeout(() => {
        setCurChildren(children);
        clearTimeout(timer);
      }, animationTime);
    } else {
      setCurChildren(children);
    }
    return () => {
      unobserve();
    };
  });
  return (
    <TransitionMotion willEnter={willEnter} styles={getStyles()}>
      {(inStyles) => (
        <Wrapper
          style={{
            height: inStyles[0].style.h + "px",
            ...customStyle,
          }}
          animationTime={animationTime}
        >
          <div ref={observe}>{inStyles[0] && inStyles[0].data}</div>
        </Wrapper>
      )}
    </TransitionMotion>
  );
};

export default Collapse;
