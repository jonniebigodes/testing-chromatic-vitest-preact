import { ThemeProvider } from "styled-components";
import { render as baseRender } from "vitest-browser-preact";
import type { JSX } from "preact";
import { theme as defaultTheme, type AppTheme } from "./tokens/theme";

interface RenderOptions {
  theme?: AppTheme;
}

export const render = (ui: JSX.Element, options?: RenderOptions) =>
  baseRender(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={options?.theme ?? defaultTheme}>
        {children}
      </ThemeProvider>
    ),
  });
