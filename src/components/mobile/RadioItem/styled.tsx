import styled from "styled-components";
import { rem } from "../constants/rem";

const RadioChecked = function () {
  return (
    <svg
      width={rem("50px")}
      height={rem("50px")}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style />
      </defs>
      <path
        d="M128 30c-54.1 0-98 43.9-98 98s43.9 98 98 98 98-43.9 98-98-43.9-98-98-98zm-10 142l-45.05-45.05L87.1 112.8l30.95 30.95L175 86.8l14.15 14.15L118 172z"
        fill="#3264FF"
      />
    </svg>
  );
};

const Radio = function () {
  return (
    <svg
      width={rem("50px")}
      height={rem("50px")}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style />
      </defs>
      <path
        d="M128 230.25C71.6 230.25 25.75 184.4 25.75 128S71.6 25.75 128 25.75 230.25 71.6 230.25 128 184.4 230.25 128 230.25zm0-185c-45.65 0-82.75 37.1-82.75 82.75s37.1 82.75 82.75 82.75 82.75-37.1 82.75-82.75-37.1-82.75-82.75-82.75z"
        fill="#CED2D9"
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
    transition: all 300ms;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${rem("50px")};
  height: ${rem("50px")};
  animation: ${(props) =>
    props.isLoading ? "lds-dual-ring 0.6s infinite linear" : "unset"};
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
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
  transform: scale(${(props) => (props.checked ? "1" : "0")});
  opacity: ${(props) => (props.checked ? "1" : "0")};
  transition: scale 300ms;
`;

const RadioWrapper = styled.div``;

export {
  RadioChecked,
  Radio,
  RadioBackground,
  RadioCheckedIcon,
  RadioBox,
  RadioWrapper,
};
