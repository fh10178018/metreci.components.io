const themeColors: {
  white: string;
  orange: string;
  orangeDark: string;
  blue: string;
  blueDark: string;
  grayDark: string;
  gray: string;
  black: string;
  transparent: string;
  transparentDark: string;
  mask: string;
  border: string;
  blackDark: string;
  [key: string]: string;
} = {
  white: "#fff",
  orange: "rgb(255, 119, 0)",
  orangeDark: "rgb(255, 165, 10)",
  blue: "#3264FF",
  blueDark: "#809FFF",
  grayDark: "#eeeeee",
  gray: "#999999",
  black: "#000000",
  blackDark: "#333", // 字体一般采用这个颜色
  transparent: "rgba(255, 255, 255, 0)",
  transparentDark: "rgba(255, 255, 255, 0)",
  mask: "rgba(101, 99, 99, 0.56)",
  border: "rgba(218, 223, 230, 0.8)",
};

const themeTime: {
  ANIMATION_TIME: number;
  DRAWER_ENTRY_TIME: number;
  DRAWER_DEPARTURE_TIME: number;
} = {
  ANIMATION_TIME: 240,
  DRAWER_ENTRY_TIME: 240, // Drawer 组件进入的时间
  DRAWER_DEPARTURE_TIME: 120, // Drawer 组件离开的时间
};

export { themeColors, themeTime };
