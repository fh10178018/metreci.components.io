/*
 * @Author: HanFang
 * @Date: 2021-12-02 11:21:01
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-04 21:03:20
 */
import { themeColors } from "../constants/themeStyled";
import { rem } from "../constants/rem";

const arrowTsf: {
  [key: string]: string;
} = {
  bottom: "rotate(90deg)",
  top: "rotate(-90deg)",
  right: "unset",
  left: "rotate(180deg)",
};

const Arrow =
  (name: string) =>
  ({ size = 40, color = themeColors["blackDark"] }) => {
    const curSize = rem((size || 48) + "px");
    return (
      <svg
        width={curSize}
        height={curSize}
        style={{
          transform: arrowTsf[name],
        }}
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M190.264 133.032c.128-.248.336-.456.448-.712 2.2-4.576 1.48-10.176-2.416-13.856L99.984 34.936c-4.816-4.552-12.408-4.336-16.968.472-4.552 4.816-4.344 12.408.472 16.968l79.24 74.96L83.8 203.408c-4.768 4.6-4.912 12.192-.312 16.968a11.94 11.94 0 0 0 8.64 3.672c3 0 6-1.12 8.328-3.36l87.512-84.344c.168-.168.232-.4.4-.576.128-.12.264-.208.392-.336.68-.712 1.04-1.584 1.504-2.4z"
          fill={color}
        />
      </svg>
    );
  };

export const PlusIcon = ({
  size = 40,
  color = themeColors["blackDark"],
  style = {},
}) => {
  const curSize = rem((size || 48) + "px");
  return (
    <svg
      width={curSize}
      height={curSize}
      viewBox="0 0 256 256"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M224 128q-.25-5-3.625-8.375T212 116h-72V44q-.25-5-3.625-8.375T128 32.25q-5 0-8.5 3.375T116 44v72H44q-5 .25-8.375 3.625T32.25 128q0 5 3.375 8.5T44 140h72v72q0 5 3.5 8.375t8.5 3.375q5 0 8.375-3.375T140 212v-72h72q5 0 8.375-3.5T224 128"
        fill={color}
      />
    </svg>
  );
};

export const CloseIcon = ({ size = 28, color = themeColors["blackDark"] }) => {
  const curSize = rem((size || 46) + "px");
  return (
    <svg
      width={curSize}
      height={curSize}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M151.605 128l99.467 99.499c6.517 6.517 6.517 17.088 0 23.605A16.632 16.632 0 0 1 239.275 256a16.614 16.614 0 0 1-11.798-4.896l-99.466-99.499-99.467 99.499C25.28 254.368 21.014 256 16.747 256s-8.544-1.632-11.798-4.896c-6.517-6.517-6.517-17.088 0-23.605L104.416 128 4.949 28.501c-6.517-6.517-6.517-17.088 0-23.605 6.518-6.528 17.078-6.528 23.595 0l99.467 99.499 99.466-99.499c6.518-6.528 17.078-6.528 23.595 0 6.517 6.517 6.517 17.088 0 23.605L151.605 128z"
        fill={color}
      />
    </svg>
  );
};

export const CheckIcon = ({ size = 40, color = themeColors["blackDark"] }) => {
  const curSize = rem((size || 46) + "px");
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2457"
      width={curSize}
      height={curSize}
    >
      <defs>
        <style type="text/css"></style>
      </defs>
      <path
        d="M821.781 269.946c15.863-17.426 42.848-18.693 60.274-2.831 17.425 15.862 18.693 42.847 2.83 60.273L448.761 806.5c-16.55 18.18-44.999 18.65-62.14 1.026L140.08 554.018c-16.43-16.893-16.053-43.906 0.84-60.334 16.893-16.43 43.905-16.053 60.334 0.84l214.927 221 405.6-445.578z"
        p-id="2458"
        fill={color}
      ></path>
    </svg>
  );
};

export const SquareCheckIcon = ({ size = 40, color = themeColors["blue"] }) => {
  const curSize = rem(size + "px");
  return (
    <svg
      width={curSize}
      height={curSize}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M205.717 99.13l-85.626 80.993a16.016 16.016 0 0 1-11.6 4.362 16.018 16.018 0 0 1-11.243-5.237l-45.099-49.69c-5.936-6.545-5.445-16.667 1.099-22.603 6.55-5.936 16.661-5.446 22.597 1.093l34.123 37.6 73.76-69.765c6.427-6.064 16.555-5.787 22.619.629 6.074 6.421 5.792 16.544-.63 22.619M234.245 0H21.755C9.739 0 0 9.739 0 21.755v212.49C0 246.261 9.739 256 21.755 256h212.49c12.016 0 21.755-9.739 21.755-21.755V21.755C256 9.739 246.261 0 234.245 0"
        fill={color}
      />
    </svg>
  );
};

export const SquareUnCheckIcon = ({
  size = 40,
  color = themeColors.grayDark,
}) => {
  const curSize = rem(size + "px");
  return (
    <svg width={curSize} height={curSize} viewBox="0 0 256 256">
      <path
        d="M0 256V0h256v256H0zM240.013 15.987H16.038v224.025h223.974l.001-224.025z"
        fill={color}
      />
    </svg>
  );
};

export const PayCheckedIcon = ({ size = 40, color = themeColors.green }) => {
  const curSize = rem(size + "px");
  return (
    <svg
      width={curSize}
      height={curSize}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style />
      </defs>
      <path
        d="M214.857 54.857l-92.343 96-48.457-46.629c-6.4-6.4-17.371-6.4-23.771 0-6.4 6.4-6.4 17.372 0 23.772l60.343 58.514c6.4 6.4 17.371 6.4 23.771 0L243.2 73.143c7.314 16.457 11.886 34.743 11.886 53.943 0 70.4-57.6 128-128 128S0 198.4 0 128 57.6 0 128 0c39.314 0 74.057 17.371 96.914 44.8l-10.057 10.057c.915 0 .915 0 0 0 .915 0 0 0 0 0z"
        fill={color}
      />
    </svg>
  );
};

export const RadioCheckIcon = function ({
  size = 38,
  color = themeColors.blue,
}) {
  const curSize = rem(size + "px");
  return (
    <svg
      width={curSize}
      height={curSize}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M128 3c69.036 0 125 55.964 125 125 0 69.035-55.964 125-125 125C58.965 253 3 197.035 3 128 3 58.964 58.965 3 128 3zm50.281 79.55l-66.133 65.051-34.35-34.407c-4.754-4.761-12.467-4.768-17.228-.015-4.761 4.754-4.767 12.467-.014 17.228l42.893 42.964c4.728 4.736 12.392 4.771 17.163.078l74.754-73.53c4.796-4.717 4.86-12.43.142-17.226-4.718-4.796-12.43-4.86-17.227-.142z"
        fill={color}
      />
    </svg>
  );
};

export const RadioUnCheckIcon = function ({
  size = 38,
  color = themeColors.grayDark,
}) {
  const curSize = rem(size + "px");
  return (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={curSize}
      height={curSize}
    >
      <path
        d="M538.624 998.656C276.928 998.656 64 785.728 64 523.968c0-261.696 212.928-474.624 474.624-474.624 261.76 0 474.688 212.928 474.688 474.624C1013.312 785.728 800.384 998.656 538.624 998.656zM538.624 81.344C294.592 81.344 96 279.936 96 523.968c0 244.096 198.592 442.688 442.624 442.688 244.096 0 442.688-198.592 442.688-442.688C981.312 279.936 782.72 81.344 538.624 81.344z"
        fill={color}
      ></path>
    </svg>
  );
};

export const TiedCardIcon = function ({
  size = 38,
  color = themeColors.grayDark,
}) {
  const curSize = rem(size + "px");
  return (
    <svg
      width={curSize}
      height={curSize}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M253 46.74v32.602H3V46.739C3 34.733 12.733 25 24.74 25h206.52C243.268 25 253 34.733 253 46.74zM3 101.078h250v108.682c0 12.006-9.733 21.739-21.74 21.739H24.74C12.732 231.5 3 221.767 3 209.76V101.08zm31.25 74.052c0 3.646 1.172 6.64 3.516 8.984 2.343 2.343 5.338 3.515 8.984 3.515h37.5c3.646 0 6.64-1.172 8.984-3.515 2.344-2.344 3.516-5.338 3.516-8.984 0-3.645-1.172-6.64-3.516-8.983-2.343-2.344-5.338-3.515-8.984-3.515h-37.5c-3.646 0-6.64 1.171-8.984 3.515-2.344 2.344-3.516 5.338-3.516 8.983z"
        fill={color}
      />
    </svg>
  );
};

export const RightArrowIcon = Arrow("right");
export const LeftArrowIcon = Arrow("left");
export const BottomArrowIcon = Arrow("bottom");
export const TopArrowIcon = Arrow("top");
