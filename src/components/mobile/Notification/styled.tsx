import styled, { css } from "styled-components";

const Wrapper = styled.div.attrs((props: { type: "info" }) => {
  return {
    type: props.type,
  };
})`
  line-height: 24px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  word-break: break-all;
`;

const fadeEffect = css`
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
`;

// 需要引入到全局组件样式
const CustomNotification = css`
  .custom-notification {
    position: fixed;
    z-index: 1000;

    &-notice {
      padding: 10px 15px;
      border-radius: 3px 3px;
      border: 1px solid #999;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      border: 0px solid rgba(0, 0, 0, 0);
      background: rgba(0, 0, 0, 0.7);
      color: white;
      display: block;
      width: auto;
      line-height: 1.5;
      position: relative;
      margin: 10px 0;
      width: 75vw;
      overflow: hidden;
      border-radius: 10px;
      &-closable {
        padding-right: 20px;
      }

      &-close {
        position: absolute;
        right: 5px;
        top: 3px;
        color: #000;
        cursor: pointer;
        outline: none;
        font-size: 16px;
        font-weight: 700;
        line-height: 1;
        text-shadow: 0 1px 0 #fff;
        filter: alpha(opacity=20);
        opacity: 0.2;
        text-decoration: none;

        &-x:after {
          content: "×";
        }

        &:hover {
          opacity: 1;
          filter: alpha(opacity=100);
          text-decoration: none;
        }
      }
    }

    &-fade-appear,
    &-fade-enter {
      opacity: 0;
      ${fadeEffect}
      animation-play-state: paused;
    }

    &-fade-leave {
      ${fadeEffect}
      animation-play-state: paused;
    }

    &-fade-appear&-fade-appear-active,
    &-fade-enter&-fade-enter-active {
      animation-name: rcNotificationFadeIn;
      animation-play-state: running;
    }

    &-fade-leave&-fade-leave-active {
      animation-name: rcDialogFadeOut;
      animation-play-state: running;
    }

    @keyframes rcNotificationFadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes rcDialogFadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
`;

export { Wrapper, CustomNotification };
