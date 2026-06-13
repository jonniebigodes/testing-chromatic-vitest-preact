import type { AppTheme } from './tokens/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
