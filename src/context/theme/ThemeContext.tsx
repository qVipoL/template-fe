import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material";
import TelAvivBoldTTF from "src/assets/fonts/TelAviv-ModernistBold.ttf";
import TelAvivTTF from "src/assets/fonts/TelAviv-ModernistRegular.ttf";
import rtlPlugin from "stylis-plugin-rtl";

declare module "@mui/material/styles" {
  interface Theme {
    icon: {
      primary: string;
      secondary: string;
    };
    topBar: {
      primary: string;
    };
    general: {
      surface: string;
      sideBarText: string;
    };
  }
  interface ThemeOptions {
    icon?: {
      primary?: string;
      secondary?: string;
    };
    topBar?: {
      primary?: string;
    };
    general?: {
      surface?: string;
      sideBarText?: string;
    };
  }
}

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const TelAvivFontFace = `
  font-family: 'TelAviv';
  font-style: normal;
  font-display: swap;
  font-weight: 500;
  src: url(${TelAvivTTF}) format('truetype');
`;

const TelAvivBoldFontFace = `
  font-family: 'TelAvivBold';
  font-style: normal;
  font-display: swap;
  font-weight: 800;
  src: url(${TelAvivBoldTTF}) format('truetype');
`;

export const theme = createTheme({
  typography: {
    fontFamily: "TelAviv",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          ${TelAvivFontFace}
        }
        @font-face{
          ${TelAvivBoldFontFace}
        }
      `,
    },
  },
  palette: {
    mode: "light",
    text: {
      primary: "#000",
      secondary: "#000",
    },
    divider: "#000",
  },
  icon: {
    primary: "#fff",
    secondary: "black",
  },
  topBar: {
    primary: "#fff",
  },
  general: {
    surface: "#3A1078",
    sideBarText: "#fff",
  },
});

export const withThemeContext = (component: () => React.ReactNode) => (
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>{component()}</ThemeProvider>
  </CacheProvider>
);
