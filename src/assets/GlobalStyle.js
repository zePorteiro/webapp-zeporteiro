import '@radix-ui/themes/styles.css';
import { createGlobalStyle } from "styled-components";
import Fonts from './Fonts';


const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'Montserrat';
  src: url(${Fonts.Montserrat.regular}) format('truetype');
  font-weight: normal;
}

@font-face {
  font-family: 'Montserrat';
  src: url(${Fonts.Montserrat.bold}) format('truetype');
  font-weight: bold;
}

@font-face {
  font-family: 'Montserrat';
  src: url(${Fonts.Montserrat.extraBold}) format('truetype');
  font-weight: 800; /* ou extra-bold */
}

@font-face {
  font-family: 'Open Sans';
  src: url(${Fonts.OpenSans.regular}) format('truetype');
  font-weight: normal;
}

@font-face {
  font-family: 'Open Sans';
  src: url(${Fonts.OpenSans.bold}) format('truetype');
  font-weight: bold;
}

:root {
  --verde-escuro: #294b29;
  --verde-musgo: #50623a;
  --verde-oliva: #789461;
  --verde-pastel: #dbe7c9;
  --preto: #000000;
  --background: #fbfbfb;
  --background-dark: #1e1e1e;
  --card-background: #f8f8ff;
  --card-background-stroke: #c2c2c2;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  box-sizing: border-box;
  scroll-behavior: smooth;
  scrollbar-width: none;

  li {
    list-style: none;
  }

  body {
    background-color: #fbfbfb;
  }
  
`;

export default GlobalStyle;
