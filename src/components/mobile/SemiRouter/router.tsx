/*
 * @Author: HanFang
 * @Date: 2021-12-13 17:03:29
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-31 11:29:02
 */
import React, { ReactNode, useEffect, Children, useState } from "react";
import Mask from "../Mask/index";
import { DrawerGroupContextProvider } from "./context";
import { drawerZIndex } from "../constants/zIndexManage";
import { useRouter } from "./use";
import { spring, TransitionMotion } from "react-motion";

import {
  FadeWrapper,
  BgWrapper,
  RouteBox,
  SliderWrapper,
  RightSliderWrapper,
  ChildrenWrapper,
} from "./styled";
import { RouterPushProp, RoutesPropTypes } from ".";
import { usePrevious } from "../../utils/common";
import { rem } from "../constants/rem";
import Header from "../DrawerHeader";
import { themeTime } from "../constants/themeStyled";

export interface RouterPageGroupProps {
  routes: RoutesPropTypes;
  children?: ReactNode;
}
const getTransform = (x: number, y: number) => {
  const transformString = `translate(${x}%, ${y}%)`;

  return {
    transform: transformString,
    WebkitTransform: transformString,
  };
};

interface PropTypes {
  routeList: RoutesPropTypes;
  clear: () => Promise<void>;
  replace: (value: RouterPushProp) => void;
  pop: () => Promise<void>;
  push: (value: RouterPushProp) => void;
  defaultZIndex: number;
}

// 主要处理组件内容左右过渡的滑动动画效果
const SlideMotion = ({ children }: { children: JSX.Element[] }) => {
  const willEnter = () => ({
    x: children.length === 1 ? 0 : 100,
    y: 0,
    opacity: 0,
  });
  const willLeave = () => ({
    opacity: 0,
  });
  const getStyles = () => {
    return Children.map(curChildren, (child, index) => ({
      key: index + "",
      data: child,
      style: {
        x: spring(
          previousChildren.length + children.length !== 1
            ? -100 * (children.length - index - 1)
            : 0
        ),
        y: 0,
        opacity: +(children.length - 1 === index),
      },
    }));
  };

  const previousChildren = usePrevious(children);
  const [curChildren, setCurChildren] = useState<JSX.Element[]>(children);

  // 模拟componentDidUpdate
  const [initFlag, setInitFlag] = useState(true);
  useEffect(() => {
    if (!initFlag) {
      // 初始化不会执行，后续render执行
      if (previousChildren.length > children.length) {
        const timer = setTimeout(() => {
          setCurChildren(children);
          clearTimeout(timer);
        }, 500);
      } else {
        setCurChildren(children);
      }
    }
    setInitFlag(false);
  });
  return (
    <TransitionMotion
      styles={getStyles()}
      willEnter={willEnter}
      willLeave={willLeave}
    >
      {(styles) => (
        <>
          {styles.map((item) => {
            return (
              <SliderWrapper
                key={item.key}
                style={
                  item.style && {
                    opacity: item.style.opacity,
                    ...getTransform(item.style.x, item.style.y),
                  }
                }
              >
                {item.data}
              </SliderWrapper>
            );
          })}
        </>
      )}
    </TransitionMotion>
  );
};

// 主要处理组件的弹出和高度变化动画
const BackgroundMotion = ({
  children,
  isActive,
  height,
  zIndex,
}: {
  children: ReactNode;
  isActive: boolean;
  height: number;
  zIndex: number;
}) => {
  const getStyles = () => {
    return [
      {
        style: { y: isActive ? 0 : 100, h: height },
        key: "BackgroundTransition",
      },
    ];
  };
  const willEnter = () => ({
    x: 0,
    y: 100,
  });

  const timer = isActive
    ? themeTime.DRAWER_ENTRY_TIME
    : themeTime.DRAWER_DEPARTURE_TIME;

  return (
    <Mask zIndex={zIndex} visible={isActive} disabled>
      <TransitionMotion willEnter={willEnter} styles={getStyles()}>
        {(inStyles) => (
          <>
            {inStyles[0] ? (
              <FadeWrapper
                style={{
                  ...getTransform(0, inStyles[0].style.y),
                  zIndex: zIndex,
                  transition: `transform ${timer}ms ease-in-out,
        height ${timer}ms ease-in-out`,
                }}
              >
                <BgWrapper
                  style={{
                    height: inStyles[0].style.h + "vh",
                    borderRadius: `${rem("16px 16px 0 0")}`,
                  }}
                >
                  {children}
                </BgWrapper>
              </FadeWrapper>
            ) : null}
          </>
        )}
      </TransitionMotion>
    </Mask>
  );
};

const HalfRouteItem = ({
  routeList,
  clear,
  pop,
  push,
  replace,
  defaultZIndex,
}: PropTypes) => {
  const handlePop = () => {
    pop();
  };
  const handleClose = () => {
    clear();
  };

  return (
    <>
      <BackgroundMotion
        isActive={routeList.length > 0}
        height={routeList.slice(-1)[0]?.drawerHeight || 0}
        zIndex={routeList.slice(-1)[0]?.zIndex || defaultZIndex}
      >
        <SlideMotion>
          {routeList.map((Item, index) => {
            let {
              Component,
              title,
              param,
              showBackIcon,
              showCloseIcon,
              isShowHeader,
            } = Item;
            param = {
              ...param,
              router: {
                pop,
                push,
                clear,
                replace,
              },
            };
            let curPop = handlePop;
            let curClose = handleClose;
            if (index === 0) {
              curClose = curPop;
              showBackIcon = false;
            }

            return (
              <RouteBox key={Item.name}>
                {isShowHeader && (
                  <Header
                    headTitle={title}
                    onGoBack={curPop}
                    headerNoBorder
                    onClose={curClose}
                    showBackIcon={showBackIcon}
                    showCloseIcon={showCloseIcon}
                  />
                )}
                <ChildrenWrapper>
                  <Component {...param} />
                </ChildrenWrapper>
              </RouteBox>
            );
          })}
        </SlideMotion>
      </BackgroundMotion>
    </>
  );
};

// 主要处理全浮层组件内容左右过渡的滑动动画效果
const RightSlideMotion = ({
  children,
  zIndex,
}: {
  children: JSX.Element[];
  zIndex: number;
}) => {
  const willEnter = () => ({
    x: 100,
    y: 0,
  });
  const willLeave = () => ({
    x: spring(100, {
      precision: 2.5,
    }),
    y: 0,
  });
  const getStyles = () => {
    return Children.map(curChildren, (child, index) => ({
      key: index + "",
      data: child,
      style: {
        x: spring(-100 * (children.length - index - 1), {
          precision: 5,
        }),
        y: 0,
      },
    }));
  };

  const previousChildren = usePrevious(children);
  const [curChildren, setCurChildren] = useState<JSX.Element[]>(children);

  // 模拟componentDidUpdate
  const [initFlag, setInitFlag] = useState(true);
  useEffect(() => {
    if (!initFlag) {
      // 初始化不会执行，后续render执行
      if (previousChildren.length > children.length) {
        const timer = setTimeout(() => {
          setCurChildren(children);
          clearTimeout(timer);
        }, 500);
      } else {
        setCurChildren(children);
      }
    }
    setInitFlag(false);
  });
  return (
    <TransitionMotion
      styles={getStyles()}
      willEnter={willEnter}
      willLeave={willLeave}
    >
      {(styles) => (
        <>
          {styles.map((item, index) => {
            return (
              <RightSliderWrapper
                key={index + "RightSliderWrapper"}
                style={
                  item.style && {
                    ...getTransform(item.style.x, item.style.y),
                    zIndex,
                  }
                }
              >
                {item.data}
              </RightSliderWrapper>
            );
          })}
        </>
      )}
    </TransitionMotion>
  );
};

const FullRouteItem = ({
  routeList,
  clear,
  pop,
  push,
  replace,
  defaultZIndex,
}: PropTypes) => {
  const handlePop = () => {
    pop();
  };
  const handleClose = () => {
    clear();
  };
  return (
    <>
      <RightSlideMotion
        zIndex={routeList.slice(-1)[0]?.zIndex || defaultZIndex}
      >
        {routeList.map((Item, index) => {
          let {
            Component,
            title,
            param,
            showBackIcon,
            showCloseIcon,
            isShowHeader,
          } = Item;
          param = {
            ...param,
            router: {
              pop,
              push,
              clear,
              replace,
            },
          };
          let curPop = handlePop;
          let curClose = handleClose;
          if (index === 0) {
            curClose = curPop;
            showBackIcon = false;
          }

          return (
            <RouteBox key={Item.name}>
              {isShowHeader && (
                <Header
                  headTitle={title}
                  onGoBack={curPop}
                  headerNoBorder
                  onClose={curClose}
                  showBackIcon={showBackIcon}
                  showCloseIcon={showCloseIcon}
                />
              )}
              <ChildrenWrapper>
                <Component {...param} />
              </ChildrenWrapper>
            </RouteBox>
          );
        })}
      </RightSlideMotion>
    </>
  );
};

const RouterPageProvider: React.FC<RouterPageGroupProps> = ({
  routes,
  children,
}: RouterPageGroupProps) => {
  const {
    push,
    pop,
    replace,
    clearAllRouter,
    clearHalfRouter,
    clearFullRouter,
    halfRouteList,
    fullRouteList,
  } = useRouter(routes);
  return (
    <DrawerGroupContextProvider
      value={{
        push,
        pop,
        replace,
        clear: clearAllRouter,
        clearHalfRouter: clearHalfRouter,
        clearFullRouter: clearFullRouter,
        history: {
          half: halfRouteList,
          full: fullRouteList,
        },
      }}
    >
      {children}
      <div>
        <FullRouteItem
          routeList={fullRouteList || []}
          defaultZIndex={
            (halfRouteList.slice(-1)[0]?.zIndex || drawerZIndex) + 1
          }
          pop={pop}
          clear={clearFullRouter}
          replace={replace}
          push={push}
        />
        <HalfRouteItem
          routeList={halfRouteList || []}
          defaultZIndex={
            (halfRouteList.slice(-1)[0]?.zIndex || drawerZIndex) + 1
          }
          pop={pop}
          clear={clearHalfRouter}
          replace={replace}
          push={push}
        />
      </div>
    </DrawerGroupContextProvider>
  );
};

export default RouterPageProvider;
