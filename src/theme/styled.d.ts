import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primaryBackground: string;
      secondary: string;
      accent: string;
      primaryText: string;
      secondaryText: string;
      infoText: string;
      boxShadow: string;
      error: string;
    };
  }
}
