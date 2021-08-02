import React, { ReactNode, useCallback } from "react";
import RcDrawer from "rc-drawer";
import { useClass } from "./use";
import styled from "styled-components";

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
  maskClosable: boolean;
}

const MyRcDrawer = styled(RcDrawer)`
  position: fixed;
  z-index: 2000;
  height: 100%;
  .drawer-content-wrapper {
    position: absolute;
    width: 100vw;
    height: 100%;
    transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }
  .drawer-content {
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: hidden;
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
    background-color: #00000073;
    pointer-events: auto;
  }
`;

const ContentWrapper = styled.div`
  height: "100%";
  width: "100%";
  overflow-y: auto;
`;

const Drawer = React.forwardRef<any, DrawerPropTypes>(
  ({
    openStatus,
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
  }) => {
    const [wrapHeight, zIndex, contentStyle] = useClass(
      drawerType,
      drawerHeight,
      direction,
      hasAnimation
    );

    const onClose = useCallback(() => {
      if (typeof onRequestClose === "function") {
        onRequestClose(false);
      } else {
        console.error("maskClosable is true, please set onRequestClose!");
      }
    }, []);

    return (
      <MyRcDrawer
        open={openStatus && allowClose}
        placement={direction}
        height={wrapHeight}
        onClose={onClose}
        onChange={onChange}
        showMask={openStatus && allowClose}
        style={{ zIndex: zIndex.current }}
        level={null}
        maskClosable={maskClosable}
        contentWrapperStyle={contentStyle}
      >
        <ContentWrapper>{children}</ContentWrapper>
      </MyRcDrawer>
    );
  }
);

export default Drawer;
