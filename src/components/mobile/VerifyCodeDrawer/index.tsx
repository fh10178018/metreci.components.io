/*
 * @Chinese description: VerifyCodePanel 组件
 * @English description: component  VerifyCodePanel
 * @Autor: rjguan
 * @Date: 2020-03-11 10:31:31
 * @LastEditors: rjguan
 * @LastEditTime: 2020-11-04 13:48:08
 */
import { useDebounce } from "../../utils/common";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  ReactNode,
  useCallback,
} from "react";
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
  onSubmit: (codes: string) => Promise<{ result: string }>;
  onClose: (codes?: string) => {};
  classes?: any;
  errorInfo?: ReactNode;
}

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SubTitle = styled.div`
  color: #455873;
  text-align: center;
  font-size: 14px;
  line-height: 23px;
  font-weight: normal;
  min-height: 19px;
  margin: 20px 20px 0 20px;
  overflow-y: auto;
  word-wrap: break-word;
  word-break: normal;
`;

const VerifyCodeInputWrapper = styled.div`
  width: 100%;
  flex: 7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeButton = styled.button`
  margin-left: 25px;
  background: #1899f2;
  font-size: 13px;
  font-weight: normal;
  height: 30px;
  border: none;
  border-radius: 3px;
  color: #fff;
  width: 100px;
  outline: 0;
  :disabled {
    background: #cbd5e3;
    color: #fff;
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
const VerifyCodeComponent = styled(VerifyCodeInput)`
  .styles_react-code-input__CRulA > input {
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
  text-align: center;
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
  margin: 0 10px;
  align-items: center;
  padding-top: 10px;
`;

const ErrorInfo = styled.div`
  color: #e74c3c;
  font-size: 14px;
  line-height: 23px;
`;

const VerifyCodePanel: React.FC<ITsExampleProps> = ({
  name = "verify",
  title = "手机验证",
  visible = true,
  length = 7,
  errorInfo = "",
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
  const [delay, setDelay] = useState(null as any);
  const [isLoading, setIsLoading] = useState({
    getCode: false,
    submit: false,
  }); // 按钮状态
  const varifyCodeInputRef: { current: any } = useRef();
  const drawerRef: { current: any } = useRef();

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
    isLoading.getCode = true;
    setIsLoading(isLoading);
    clearCodes();
    if (+leftSeconds <= 0) setLeftSeconds(timerCount + "");
    setDelay(1000);
    try {
      const getCodeRes = await getCode();
      if (getCodeRes.result !== "success") {
        resetCodeInput();
      }
    } catch (getCodeErr) {
      resetCodeInput();
    }
    setIsLoading({
      getCode: false,
      submit: false,
    });
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
    isLoading.submit = true;
    setIsLoading(isLoading);
    try {
      const onSubmitRes = await onSubmit(currentCodes || codes);
      if (onSubmitRes.result !== "success") {
        clearCodes();
      }
    } catch (onSubmitErr) {
      clearCodes();
    }
    isLoading.submit = false;
    setIsLoading(isLoading);
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
    <>
      <Drawer
        openStatus={visible}
        headTitle={title}
        drawerType="half"
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
          <SubTitle>{subTitle}</SubTitle>
          <WrapperFix>
            <VerifyCodeInputWrapper>
              <VerifyCodeComponent
                fields={length}
                fieldWidth={57}
                fieldHeight={57}
                values={["2", "2"]}
                onChange={onChangeValue}
                ref={varifyCodeInputRef}
                loading={isLoading.submit}
              />
            </VerifyCodeInputWrapper>
            <InfoWrapper>
              <ErrorInfo>{errorInfo}</ErrorInfo>
              <TimeButton
                disabled={showCountDown || isLoading.getCode}
                onClick={onGetCode}
              >
                {isLoading.getCode ? (
                  <Loading />
                ) : (
                  timerTitle + (showCountDown ? `(${leftSeconds}S)` : "")
                )}
              </TimeButton>
            </InfoWrapper>
          </WrapperFix>
          <ButtonBox>
            <ButtonOk
              disabled={disabled || isLoading.submit}
              onClick={handleSubmit}
            >
              {isLoading.submit ? <Loading /> : buttonText}
            </ButtonOk>
          </ButtonBox>
        </Box>
      </Drawer>
    </>
  );
};

const LoadingWrapper = styled.div`
  text-align: center;
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

const Loading = () => (
  <LoadingWrapper>
    <Spin
      viewBox="0 0 1024 1024"
      data-icon="loading"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill="#ffffff"
        d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
      />
    </Spin>
  </LoadingWrapper>
);

export default VerifyCodePanel;
