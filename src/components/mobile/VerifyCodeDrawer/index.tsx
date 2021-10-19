/*
 * @Chinese description: VerifyCodePanel 组件
 * @English description: component  VerifyCodePanel
 * @Autor: rjguan
 * @Date: 2020-03-11 10:31:31
 * @LastEditors: rjguan
 * @LastEditTime: 2020-11-04 13:48:08
 */
import { useDebounce, useWinSize } from "../../utils/common";
import React, { useState, useEffect, useRef, useMemo } from "react";
import useLocalStorage from "react-use-localstorage";
import Drawer from "../Drawer";
import VerifyCodeInput from "react-verification-code-input";
import useSetInterval from "../../utils/useSetInterval";
import styled from "styled-components";

interface ITsExampleProps {
  name: string;
  title: string;
  subTitle: string;
  length?: number;
  visible?: boolean;
  timerCount?: number;
  timerTitle?: string;
  timerEnd?: () => {};
  onChangeText?: (codes: string) => {};
  getCode: () => Promise<{ result: string }>;
  getCodeOnShow?: boolean;
  autoConfirm?: boolean;
  buttonText?: string;
  onSubmit: (codes: string) => Promise<{ result: string; message?: string }>;
  onClose: (codes?: string) => {};
  classes?: any;
}

const Box = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const SubTitle = styled.div`
  color: #455873;
  text-align: center;
  font-size: 14px;
  line-height: 23px;
  font-weight: normal;
  min-height: 19px;
  margin: 35px 20px 0 20px;
  overflow-y: auto;
  word-wrap: break-word;
  word-break: normal;
`;

const VerifyCodeInputWrapper = styled.div.attrs(
  (props: { isError: boolean }) => {
    return {
      isError: props.isError,
    };
  }
)`
  width: 100%;
  flex: 7;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${(props) =>
    useMemo(() => props.isError, [props.isError])
      ? "Tada 1s both infinite"
      : "none"};
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

const TimeButton = styled.button`
  background: rgb(0, 0, 0, 0);
  text-align: left;
  font-size: 13px;
  font-weight: normal;
  height: 30px;
  border: none;
  border-radius: 3px;
  color: #1899f2;
  width: 100px;
  outline: 0;
  :disabled {
    color: #9e9e9e;
  }
`;

const ButtonBox = styled.div`
  margin: 10px;
  background-image: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0));
`;

const WrapperFix = styled.div`
  flex: 1;
  padding: 0 10px;
`;
const VerifyCodeComponent = styled(VerifyCodeInput).attrs(
  (props: { isError: boolean }) => {
    return {
      isError: props.isError,
    };
  }
)`
  .styles_react-code-input__CRulA > input {
    ${(props) =>
      useMemo(() => props.isError, [props.isError]) ? "color: #e74c3c" : ""};
    background: #f0f0f0;
    padding: 6px;
    background-clip: content-box;
    border: none;
    border-radius: 5px;
  }
  .styles_react-code-input__CRulA > input:first-child {
    border-radius: 5px;
  }
  .styles_react-code-input__CRulA > input:focus {
    border: none;
  }
  .styles_react-code-input__CRulA > input:last-child {
    border-radius: 5px;
    border-right: none;
  }
`;

const ButtonOk = styled.button`
  display: block;
  border-radius: 2px;
  font-size: 20px;
  line-height: 32px;
  padding: 10px;
  color: #fff;
  background: #ff9500;
  border: none;
  width: 100%;
  border-radius: 3px;
  outline: 0;
  :disabled {
    background-color: gray;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ErrorInfoWrapper = styled.div.attrs((props: { showStatus: boolean }) => {
  return {
    showStatus: props.showStatus,
  };
})`
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  line-height: 30px;
  color: #ff6f00;
  font-size: 14px;
  padding: 0 15px;
  background-color: #fff9ed;
  border-color: #fff3e9;
  border: 1px solid var(--border-color);
  border-left: none;
  border-right: none;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  transform: ${(props) =>
    useMemo(() => props.showStatus, [props.showStatus])
      ? "translateY(0)"
      : "translateY(-100%)"};
`;

const ErrorContent = styled.span`
  white-space: nowrap;
  height: fit-content;
  color: #ff6f00;
`;

const VerifyCodePanel: React.FC<ITsExampleProps> = ({
  name = "verify",
  title = "手机验证",
  visible = true,
  length = 7,
  timerCount = 60,
  timerTitle = "",
  subTitle = "",
  timerEnd,
  onChangeText,
  getCode,
  getCodeOnShow = false,
  autoConfirm = false,
  buttonText = "提交",
  onSubmit,
  onClose,
}: ITsExampleProps) => {
  const [leftSeconds, setLeftSeconds] = useLocalStorage(name, timerCount + "");
  const [disabled, setDisabled] = useState(true);
  const [codes, setCodes] = useState("");
  const [isError, setIsError] = useState(false);
  const [delay, setDelay] = useState(null as any);
  const getCodeIsLoading = useRef(false);
  const submitIsLoading = useRef(false);
  const varifyCodeInputRef: { current: any } = useRef();
  const drawerRef: { current: any } = useRef();
  const winSize = useWinSize();

  const [errorContent, setErrorContent] = useState("");
  const showErrorInfo = useMemo(() => errorContent !== "", [errorContent]);
  const inputLen = useMemo(() => (winSize.width - 20) / length, [
    winSize,
    length,
  ]);

  const clearCodes = () => {
    if (
      varifyCodeInputRef &&
      varifyCodeInputRef.current &&
      varifyCodeInputRef.current.__clearvalues__
    ) {
      varifyCodeInputRef.current.__clearvalues__();
    }
    setDisabled(true);
  };

  const resetCodeInput = () => {
    clearCodes();
    setLeftSeconds(-1 + "");
    setDelay(null);
  };

  const onGetCode = useDebounce(async () => {
    if (+leftSeconds <= 0) {
      setLeftSeconds(timerCount + "");
      getCodeIsLoading.current = true;
      clearCodes();
      setDelay(1000);
      try {
        const getCodeRes = await getCode();
        if (getCodeRes.result !== "success") {
          resetCodeInput();
        }
      } catch (getCodeErr) {
        resetCodeInput();
      }
      getCodeIsLoading.current = false;
    }
  }, 300);

  useEffect(() => {
    if (getCodeOnShow && visible) {
      onGetCode();
    }
  }, [visible, getCodeOnShow]);

  useSetInterval(() => {
    const seconds = +leftSeconds;
    if (seconds <= 0) {
      return () => {
        // 定时器消除后的代码逻辑
        if (timerEnd) {
          timerEnd();
        }
        setDelay(null);
      };
    }
    setLeftSeconds(seconds - 1 + "");
  }, delay);

  const triggerSubmit = async (currentCodes: string) => {
    submitIsLoading.current = true;
    try {
      const onSubmitRes = await onSubmit(currentCodes || codes);
      const { result, message } = onSubmitRes;
      console.log(result, message);
      if (result !== "success") {
        setIsError(true);
        setErrorContent(message || "");
        setTimeout(() => {
          setIsError(false);
          setErrorContent("");
          clearCodes();
        }, 2000);
      }
    } catch (onSubmitErr) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        clearCodes();
      }, 2000);
    }
    submitIsLoading.current = false;
  };

  const handleSubmit = useDebounce(() => {
    triggerSubmit("");
  }, 300);

  const onChangeValue = (currentCodes: string) => {
    setCodes(currentCodes);
    if (onChangeText) {
      onChangeText(currentCodes);
    }

    if (currentCodes.length >= length) {
      setDisabled(false);
      if (autoConfirm) {
        setTimeout(() => {
          triggerSubmit(currentCodes);
        }, 0);
      }
    } else {
      setDisabled(true);
    }
  };

  const showCountDown = useMemo(() => +leftSeconds > 0, [leftSeconds]);

  return (
    <Drawer
      openStatus={visible}
      headTitle={title}
      drawerHeight={70}
      hasAnimation
      onRequestClose={() => {
        if (typeof window !== "undefined") {
          if (onClose) {
            onClose();
          }
          window.scrollTo(0, 0); // document.body.scrollHeight);
        }
      }}
      ref={drawerRef}
    >
      <Box>
        <ErrorInfoWrapper showStatus={showErrorInfo}>
          <ErrorIcon />
          <ErrorContent>{errorContent}</ErrorContent>
        </ErrorInfoWrapper>
        <SubTitle>{subTitle}</SubTitle>
        <WrapperFix>
          <VerifyCodeInputWrapper isError={isError}>
            <VerifyCodeComponent
              fields={length}
              fieldWidth={inputLen}
              fieldHeight={inputLen}
              onChange={onChangeValue}
              ref={varifyCodeInputRef}
              disabled={isError}
              isError={isError}
              autoFocus={visible}
            />
          </VerifyCodeInputWrapper>
          <InfoWrapper>
            <TimeButton
              disabled={showCountDown || getCodeIsLoading.current}
              onClick={onGetCode}
            >
              {getCodeIsLoading.current ? (
                <Loading color="#1899f2" isGetCode />
              ) : (
                timerTitle + (showCountDown ? `(${leftSeconds}S)` : "")
              )}
            </TimeButton>
          </InfoWrapper>
        </WrapperFix>
        <ButtonBox>
          <ButtonOk
            disabled={disabled || submitIsLoading.current}
            onClick={handleSubmit}
          >
            {submitIsLoading.current ? <Loading /> : buttonText}
          </ButtonOk>
        </ButtonBox>
      </Box>
    </Drawer>
  );
};

const LoadingWrapper = styled.div.attrs((props: { isGetCode: boolean }) => {
  return {
    isGetCode: props.isGetCode,
  };
})`
  text-align: ${(props) =>
    useMemo(() => props.isGetCode, [props.isGetCode]) ? "left" : "center"}; ;
`;
const Spin = styled.svg`
  display: inline-block;
  animation: loadingCircle 1s infinite linear;
  @keyframes loadingCircle {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = ({ color = "white", isGetCode = false }) => (
  <LoadingWrapper isGetCode={isGetCode}>
    <Spin
      viewBox="0 0 1024 1024"
      data-icon="loading"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill={color}
        d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
      />
    </Spin>
  </LoadingWrapper>
);

const Spin2 = styled.svg`
  display: inline-block;
  margin-right: 10px;
`;

const ErrorIcon = () => (
  <Spin2
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="4381"
    width="1.3em"
    height="1.3em"
    fill="#ff6f00"
  >
    <path
      d="M549.28 579.584c-2.528 27.584-20.064 40.48-37.376 40.48-12.864 0 0 0 0 0-16.448-3.104-29.216-10.112-34.816-38.016l-22.624-260.8c0-26.208 31.872-49.408 58.912-49.408s56.16 24.256 56.16 50.432L549.28 579.584zM512 654.176c-27.04 0-48.992 21.92-48.992 48.992s21.92 49.024 48.992 49.024 48.992-21.952 48.992-49.024c0-27.04-21.92-48.992-48.992-48.992zM899.808 512c0 214.176-173.6 387.776-387.84 387.776-214.144 0-387.776-173.6-387.776-387.776s173.632-387.808 387.776-387.808c214.208 0 387.84 173.632 387.84 387.808zM828 512c0-174.528-141.472-315.968-316-315.968S196.032 337.472 196.032 512c0 174.496 141.44 315.968 315.968 315.968S828 686.496 828 512z"
      p-id="4382"
    ></path>
  </Spin2>
);

export default VerifyCodePanel;
