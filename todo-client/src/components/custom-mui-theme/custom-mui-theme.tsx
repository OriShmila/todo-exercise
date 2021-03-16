import {
  createMuiTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { ReactNode } from "react";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export const theme = createMuiTheme({
  spacing: (factor: number) => `${factor * 1}vh`,

  palette: {
    primary: {
      light: "#0f94b81a",
      main: "#0f94b8",
      dark: "#023b4a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#702ba9",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  direction: "rtl",
});

export const CustomMuiTheme = ({ children }: { children: ReactNode }) => {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  );
};
