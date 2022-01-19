/*
 * @Author: HanFang
 * @Date: 2021-12-28 17:34:50
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-11 15:46:52
 */
import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useState,
  cloneElement,
  Children,
  useMemo,
} from "react";
import { TransitionMotion } from "react-motion";
import { usePrevious } from "../../../utils/common";
import { Wrapper } from "./styled";
import { themeTime } from "../../constants/themeStyled";

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
  const newChild = useMemo(() => {
    const child = Children.only(<div>{curChildren}</div>);
    const CloneElm = cloneElement(child, {
      ref: (node: any) => {
        node && setHeight(node.offsetHeight);
      },
    });
    return CloneElm;
  }, [curChildren]);
  const willEnter = () => ({
    h: 0,
  });
  const getStyles = () => {
    return [
      {
        key: "Collapse",
        data: newChild,
        style: {
          h: visible ? height || curHeight : 0,
        },
      },
    ];
  };
  let timer: NodeJS.Timeout;
  useEffect(() => {
    if (previousChildren && !children) {
      timer = setTimeout(() => {
        setCurChildren(children);
        clearTimeout(timer);
      }, animationTime);
    } else {
      setCurChildren(children);
    }
    return () => {
      // FIX: 组件销毁时，销毁计时器
      clearTimeout(timer);
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
          {inStyles[0] && inStyles[0].data}
        </Wrapper>
      )}
    </TransitionMotion>
  );
};

export default Collapse;
