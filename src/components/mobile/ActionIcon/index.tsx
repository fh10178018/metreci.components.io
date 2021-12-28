/*
 * @Author: HanFang
 * @Date: 2021-12-02 11:21:01
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-27 11:25:29
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

const PlusIcon = ({
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

const CloseIcon = ({ size = 48, color = themeColors["blackDark"] }) => (
  <PlusIcon style={{ transform: "rotate(45deg)" }} size={size} color={color} />
);

const CheckIcon = ({ size = 40, color = themeColors["blackDark"] }) => {
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

const SquareCheckIcon = ({ size = 40, color = themeColors["blue"] }) => {
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

const SquareUnCheckIcon = ({ size = 40, color = themeColors.grayDark }) => {
  const curSize = rem(size + "px");
  return (
    <svg width={curSize} height={curSize} viewBox="0 0 256 256">
      <path
        d="M43.877 32C37.323 32 32 37.317 32 43.877v168.246C32 218.683 37.323 224 43.877 224h168.251c6.555 0 11.872-5.317 11.872-11.877V43.877C224 37.317 218.683 32 212.128 32H43.878zm181.515 224H30.613C13.733 256 0 242.272 0 225.392V30.608C0 13.728 13.733 0 30.613 0h194.779C242.272 0 256 13.728 256 30.608v194.784c0 16.88-13.728 30.608-30.608 30.608z"
        fill={color}
      />
    </svg>
  );
};

const PayCheckedIcon = ({ size = 40 }) => {
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
        fill="#6AC563"
      />
    </svg>
  );
};

const RightArrowIcon = Arrow("right");
const LeftArrowIcon = Arrow("left");
const BottomArrowIcon = Arrow("bottom");
const TopArrowIcon = Arrow("top");

const IconList = {
  SquareCheckIcon,
  SquareUnCheckIcon,
  RightArrowIcon,
  LeftArrowIcon,
  BottomArrowIcon,
  TopArrowIcon,
  PlusIcon,
  CheckIcon,
  PayCheckedIcon,
  CloseIcon,
};

export default IconList;
