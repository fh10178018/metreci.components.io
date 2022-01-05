/*
 * @Author: HanFang
 * @Date: 2021-12-08 14:49:11
 * @Last Modified by:   HanFang
 * @Last Modified time: 2021-12-08 14:49:11
 */
import styled from "styled-components";
import { themeColors } from "../../constants/themeStyled";
import RcDrawer from "rc-drawer";

const MyRcDrawer = styled(RcDrawer)`
  position: fixed;
  z-index: 1000;
  height: 100%;
  opacity: 0;
  transition: width 0s ease 0.3s, height 0s ease 0.3s, transform 0.3s,
    opacity 0s ease 0.3s;
  .drawer-content-wrapper {
    position: absolute;
    width: 100vw;
    height: 100%;
    transition: transform 0.3s, opacity 0.3s ease-in-out;
    overflow: hidden;
  }
  &.drawer-open {
    opacity: 1;
  }
  &.drawer-open .drawer-mask {
    opacity: 1;
    transition: none;
    pointer-events: auto;
    animation: drawerFadeIn 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }
  @keyframes drawerFadeIn {
    0% {
      opacity: 0;
    }

    to {
      opacity: 1;
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
    width: 0;
    height: 100%;
    .drawer-content-wrapper {
      height: 100%;
      bottom: 0;
    }
  }
  &.drawer-left.drawer-open,
  &.drawer-right.drawer-open {
    width: 100%;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      opacity 0.2s ease-in-out;
  }
  @keyframes likes {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
  &.drawer-left {
    left: 0;
  }

  &.drawer-right {
    right: 0;
  }

  &.drawer-top,
  &.drawer-bottom {
    left: 0;
    width: 100%;
    height: 0;
    .drawer-content-wrapper {
      width: 100%;
    }
  }
  &.drawer-top.drawer-open,
  &.drawer-bottom.drawer-open {
    height: 100%;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
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
    background-color: ${themeColors.mask};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s linear;
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

export { ContentWrapper, MyRcDrawer };
