import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};
  @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'BMJUA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }
  @font-face {
    font-family: 'Y_Spotlight';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/Y_Spotlight.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  html {
    font-size: 16px;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    min-height: 100vh;
    
    /* user-select: none; */
  };
  body{
    font-family: Y_Spotlight;
    line-height: 1.5;
  }
  em {
    /* font-weight: bolder;
    color: orange */
    font-style: italic;
  };
  a{
    text-decoration:none;
  }
  strong {
    font-weight: bolder
  };
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: Y_Spotlight;
  }
  

`;

export default GlobalStyles;
