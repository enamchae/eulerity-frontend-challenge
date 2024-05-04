import { css, keyframes } from "styled-components";

export const fadeIn = keyframes`
0% {
    opacity: 0.25;
}
100% {
    opacity: 1;
}
`;

export const resetInputCss = css`
border: none;
background: none;
color: inherit;
font: inherit;
`;

export const baseInputBorderCss = css`
border: 1.5px solid currentcolor;
padding: 0.5rem;

border-radius: 1.5rem / 1rem;
`;

export const baseInputCss = css`
${resetInputCss}
${baseInputBorderCss}
`;

export const baseClickableCss = css`
${baseInputCss}

&:hover {
    background: #386a8f1f;
}
`;