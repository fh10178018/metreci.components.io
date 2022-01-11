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
  boxShadow: string;
  red: string;
  redDark: string;
  SKELETON_BACKGROUND_COLOR: string;
  SKELETON_FOREGROUND_COLOR: string;
  [key: string]: string;
} = {
  white: "#fff",
  orange: "rgb(255, 119, 0)",
  orangeDark: "rgb(255, 165, 10)",
  red: "rgb(248, 94, 83)",
  redDark: "rgb(249, 128, 120)",
  blue: "#197aff",
  blueDark: "#809FFF",
  grayDark: "#e0e0e0",
  gray: "#999999",
  black: "#000000",
  blackDark: "#333", // 字体一般采用这个颜色
  transparent: "rgba(255, 255, 255, 0)",
  transparentDark: "rgba(255, 255, 255, 0)",
  mask: "rgba(0, 0, 0, 0.7)",
  border: "#d2d2d2",
  boxShadow: "rgba(0, 0, 0, 0.06)",
  SKELETON_BACKGROUND_COLOR: "#f3f3f3", // 骨架屏背景色
  SKELETON_FOREGROUND_COLOR: "#ecebeb", // 骨架屏前景色
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
