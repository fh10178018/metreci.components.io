/*
 * @Author: HanFang
 * @Date: 2021-12-01 17:22:07
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-31 11:27:41
 */
import styled from "styled-components";
import { rem } from "../../constants/rem";
import { themeTime } from "../../constants/themeStyled";

const RadioChecked = function ({ size = 50, color = "#3264FF" }) {
  return (
    <svg
      width={rem(`${size}px`)}
      height={rem(`${size}px`)}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style />
      </defs>
      <path
        d="M128 30c-54.1 0-98 43.9-98 98s43.9 98 98 98 98-43.9 98-98-43.9-98-98-98zm-10 142l-45.05-45.05L87.1 112.8l30.95 30.95L175 86.8l14.15 14.15L118 172z"
        fill={color}
      />
    </svg>
  );
};

const Radio = function ({ size = 50, color = "#CED2D9" }) {
  return (
    <svg
      width={rem(`${size}px`)}
      height={rem(`${size}px`)}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style />
      </defs>
      <path
        d="M128 230.25C71.6 230.25 25.75 184.4 25.75 128S71.6 25.75 128 25.75 230.25 71.6 230.25 128 184.4 230.25 128 230.25zm0-185c-45.65 0-82.75 37.1-82.75 82.75s37.1 82.75 82.75 82.75 82.75-37.1 82.75-82.75-37.1-82.75-82.75-82.75z"
        fill={color}
      />
    </svg>
  );
};

const RadioBox = styled.div`
  width: ${rem("50px")};
  height: ${rem("50px")};
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
`;

const RadioBackground = styled.div.attrs((props: { isLoading: boolean }) => {
  return {
    isLoading: props.isLoading,
  };
})`
  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: ${rem("28px")};
    height: ${rem("28px")};
    border-radius: 50%;
    border: ${rem("6px")} solid transparent;
    border-bottom-color: #3264ff;
    opacity: ${(props) => (props.isLoading ? "1" : "0")};
    transition: opacity ${themeTime.ANIMATION_TIME}ms;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 0;
  width: ${rem("50px")};
  height: ${rem("50px")};
`;

const RadioCheckedIcon = styled.div.attrs((props: { checked: boolean }) => {
  return {
    checked: props.checked,
  };
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${rem("50px")};
  height: ${rem("50px")};
  opacity: ${(props) => (props.checked ? "1" : "0")};
  /* transition: opacity 300ms ease-in-out; */
  z-index: 1;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export {
  RadioChecked,
  Radio,
  RadioBackground,
  RadioCheckedIcon,
  RadioBox,
  RadioWrapper,
};
