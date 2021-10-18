import React, {
  ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
} from "react";
import RcDrawer from "rc-drawer";
import { DrawerContext, DrawerRef, useClass, useDrawer } from "./use";
import styled from "styled-components";
import Header from "../Header";
import { useMemo } from "react";

type OpenStatus = boolean | undefined;

export interface DrawerPropTypes {
  openStatus: OpenStatus;
  onRequestClose: (openStatus: OpenStatus) => void;
  onChange?: (openStatus: OpenStatus) => void;
  drawerType?: "full" | "half";
  drawerHeight?: string | number;
  allowClose?: boolean;
  modalElementClass?: string;
  direction?: "bottom" | "left" | "top" | "right";
  headTitle?: string | ReactNode;
  hasAnimation?: boolean;
  maskClosable?: boolean;
  children?: ReactNode;
}

const MyRcDrawer = styled(RcDrawer)`
  position: fixed;
  z-index: 2000;
  height: 100%;
  .drawer-content-wrapper {
    position: absolute;
    width: 100vw;
    height: 100%;
    transition: transform 0.3s;
    overflow: hidden;
  }
  &.drawer-open {
    .drawer-mask {
      visibility: visible;
    }
  }
  .drawer-content {
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  &.drawer-left,
  &.drawer-right {
    bottom: 0;
    width: 0%;
    height: 100%;
    .drawer-content-wrapper {
      height: 100%;
      bottom: 0;
    }
    .drawer-open {
      width: 100%;
    }
  }

  &.drawer-left {
    left: 0;
  }

  &.drawer-right {
    right: 0;
    .drawer-content-wrapper {
      transform: translateX(-100%);
    }
  }

  &.drawer-top,
  &.drawer-bottom {
    left: 0;
    width: 100%;
    height: 0%;
    .drawer-content-wrapper {
      width: 100%;
    }
    .drawer-open {
      height: 100%;
    }
  }

  &.drawer-top {
    top: 0;
  }

  &.drawer-bottom {
    bottom: 0;
    .drawer-content-wrapper {
      bottom: 0;
    }
    .drawer-open {
      .no-mask {
        bottom: 1px;
        transform: translateY(1px);
      }
    }
  }

  .drawer-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: transparent;
    pointer-events: auto;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const DrawerContainer = styled.div.attrs((props: { openStatus: boolean }) => {
  return {
    openStatus: props.openStatus,
  };
})`
  &:after {
    content: "";
    display: ${(props) =>
      useMemo(() => props.openStatus, [props.openStatus]) ? "block" : "none"};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #00000073;
    pointer-events: auto;
    z-index: 199999;
  }
`;

const Drawer = React.forwardRef<DrawerRef, DrawerPropTypes>(
  (
    {
      openStatus = false,
      onRequestClose,
      onChange,
      drawerType = "half",
      drawerHeight = "50vh",
      allowClose = true,
      modalElementClass = "",
      direction = "bottom",
      headTitle = "",
      hasAnimation = false,
      maskClosable = true,
      children,
    },
    ref
  ) => {
    const parentDrawer = useContext(DrawerContext);
    const [wrapHeight, zIndex, contentStyle, level, setVisible] = useClass(
      drawerType,
      drawerHeight,
      direction,
      hasAnimation,
      parentDrawer
    );
    const [
      name,
      curDirection,
      onClose,
      afterVisibleChange,
      openAll,
    ] = useDrawer(
      onRequestClose,
      zIndex,
      direction,
      openStatus,
      setVisible,
      parentDrawer
    );

    useImperativeHandle(
      ref,
      () => ({
        openAll,
        name,
      }),
      [name, openAll]
    );
    useEffect(() => {
      openStatus && setVisible(openStatus);
    }, [openStatus, setVisible]);

    return (
      <DrawerContext.Provider value={{ openAll, name }}>
        {!parentDrawer && (
          <DrawerContainer
            id="drawer-container"
            openStatus={openStatus}
          ></DrawerContainer>
        )}
        <MyRcDrawer
          open={openStatus && allowClose}
          className={name}
          wrapperClassName={modalElementClass}
          placement={curDirection}
          height={wrapHeight}
          onClose={onClose}
          onChange={onChange}
          style={{ zIndex: zIndex.current }}
          level={level}
          afterVisibleChange={afterVisibleChange}
          maskClosable={maskClosable}
          showMask={openStatus && allowClose}
          handler={false}
          ease="ease-in-out"
          contentWrapperStyle={contentStyle}
        >
          <Header headTitle={headTitle} onGoBack={onClose} onClose={openAll} />
          <ContentWrapper>{children}</ContentWrapper>
        </MyRcDrawer>
      </DrawerContext.Provider>
    );
  }
);

export default Drawer;
