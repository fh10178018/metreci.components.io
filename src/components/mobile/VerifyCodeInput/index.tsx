import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import styled from "styled-components";
import { useWinSize } from "../../utils/common";

const judgeDeviceType = (function () {
  let ua = "";
  if (typeof window !== "undefined") {
    ua = window.navigator.userAgent.toLocaleLowerCase();
  }

  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);
  return {
    isIOS,
    isAndroid,
  };
})();

interface ITsExampleProps {
  visiable?: Boolean;
  length?: number;
  isError?: boolean;
  disabled?: boolean;
  drawerRef?: { current: any };
  onChangeValue?: (codes: string) => void;
  overallWidth?: number;
}

const Code = styled.div.attrs((props: { active: boolean }) => {
  return {
    active: props.active,
  };
})`
  padding: 0;
  caret-color: #0086f6;
  background: transparent;
  border: 0;
  width: 32px;
  height: 43px;
  color: inherit;
  outline: none;
  border-bottom: 1px solid transparent;
  font-size: 35px;
  font-weight: 500;
  text-align: center;
  border-color: ${(props) => (props.active ? "#0086f6" : "#9E9E9E")};
  ::before {
    content: "";
    display: ${(props) => (props.active ? "inline-block" : "none")};
    border-left: 2px solid #0086f6;
    height: 27px;
    animation: ${(props) =>
      props.active ? "FadeGraduallyNow 1s both infinite" : "none"};
  }
  @keyframes FadeGraduallyNow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const CodeContainer = styled.div.attrs((props: { isError: boolean }) => {
  return {
    isError: props.isError,
  };
})`
  color: ${(props) => (!props.isError ? "rgba(0, 0, 0, 0.85)" : "#e74c3c")};
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  animation: ${(props) => (props.isError ? "Tada 1s both infinite" : "none")};
  @keyframes Tada {
    0% {
      transform: translateX(0);
    }
    10%,
    20% {
      transform: translateX(3px);
    }
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-3px);
    }
    40%,
    60%,
    80% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

const CodeInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 310px;
  height: 40;
  color: transparent;
  font-family: SF Pro Text;
  user-select: none;
  ime-mode: Disabled;
`;

interface RefType {
  clearCodes: () => void;
  inputBlur: () => void;
}

const VerifyCodeInput = React.forwardRef<RefType, ITsExampleProps>(
  (
    {
      visiable = false,
      length: codeLength = 6,
      isError = false,
      disabled,
      drawerRef,
      onChangeValue,
      overallWidth = 310,
    }: ITsExampleProps,
    ref
  ) => {
    let isBindListener = false;
    const [codes, setCodes] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const codeRef: any = useRef();
    const winSize = useWinSize();

    // 计算需要提升的元素 ： dom的位置
    const movePanelIOS = (enevt: string) => {
      if (judgeDeviceType.isIOS) {
        const dom = codeRef.current.closest(".css-3pxmmn");
        if (dom) {
          if (enevt === "blur") {
            dom.style.paddingBottom = 0;
          }

          if (enevt === "focus") {
            return setTimeout(() => {
              dom.style.paddingBottom = "250px";
            }, 333);
          }
        }
      }
    };

    // 首次展示的时候，调用一次 focus
    // codeRef.current 代表需要 focus 的 input 元素
    useEffect(() => {
      if (visiable && codeRef.current && !judgeDeviceType.isIOS) {
        codeRef.current.focus();
      }
    }, [visiable, codeRef.current]);

    // 注册 focus， click， blur 事件
    // drawerRef.current 代表需要 改变定位的浮层容器
    useEffect(() => {
      let moveTimer: any = null;
      if (
        drawerRef &&
        drawerRef.current &&
        codeRef &&
        codeRef.current &&
        !isBindListener
      ) {
        codeRef.current.addEventListener("focus", () => {
          moveTimer = movePanelIOS("focus");
        });
      }
      isBindListener = true;
      return () => {
        clearTimeout(moveTimer);
      };
    }, [drawerRef, codeRef, isBindListener]);

    useEffect(() => {
      if (onChangeValue) {
        onChangeValue(codes);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codes]);

    // 需要向外抛出去的方法
    useImperativeHandle(ref, () => ({
      clearCodes: () => {
        setCodes("");
        codeRef.current.value = "";
      },
      inputBlur: () => {
        movePanelIOS("blur");
        codeRef.current.blur();
      },
    }));

    const codeList = codes.split("");

    const handleFocus = () => {
      setIsFocus(true);
    };
    const handleBlur = () => {
      setIsFocus(false);
    };

    return (
      <CodeContainer
        style={{ width: overallWidth + "px" }}
        onClick={() => {
          codeRef.current.focus();
          movePanelIOS("focus");
        }}
        isError={isError}
      >
        {(codeList.length === codeLength
          ? codeList
          : codeList.concat(Array(codeLength - codeList.length).fill(""))
        ).map((code, index) => {
          return (
            <Code
              key={`${code}${index}`}
              active={codes.length === index && !disabled && isFocus}
            >
              {code}
            </Code>
          );
        })}
        <CodeInput
          type="tel"
          placeholder="输入金额"
          pattern="[0-9]*"
          onInput={(e) => {
            let inputCodes = codeRef.current.value;
            inputCodes = inputCodes.replace(/\D/gi, "").slice(0, codeLength);
            codeRef.current.value = inputCodes;
            setCodes(inputCodes);
          }}
          id="single-factor-code-text-field"
          autoComplete="one-time-code"
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          onSelect={(e) => {
            const ele: any = e.target;
            const len = ele.value.length;
            const wd: any = window.document;
            if (wd.selection) {
              const sel = ele.createTextRange();
              sel.moveStart("character", len);
              sel.collapse();
              sel.select();
            } else {
              ele.selectionStart = ele.selectionEnd = len;
            }
          }}
          ref={codeRef}
          style={{
            transform: "translateX(-1000px)",
            width: "calc(1000%)",
          }}
          autoFocus={true}
        />
      </CodeContainer>
    );
  }
);

export default VerifyCodeInput;
