/**
 * 主题样式和变量修改处
 */

import React from "react";
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProps,
  ThemeProvider,
} from "styled-components";
import { CustomNotification } from "../Notification/styled";

// 主题样式变量，类型扩展声明在style.d.ts中
const theme: DefaultTheme = {
  colors: {
    white: "#fff",
    orange: "rgb(255, 119, 0)",
    orangeDark: "rgb(255, 165, 10)",
    blue: "#3264FF",
    blueDark: "#809FFF",
    grayDark: "#eeeeee",
    gray: "#999999",
    black: "#000000",
    transparent: "rgb(255, 255, 255, 0)",
    transparentDark: "rgb(255, 255, 255, 0)",
  },
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props: ThemeProps<DefaultTheme>) =>
      props.theme.colors.white};
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ${CustomNotification}
`;

const GlobalThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default GlobalThemeProvider;
