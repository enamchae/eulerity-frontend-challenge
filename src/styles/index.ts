import { css, keyframes } from "styled-components";

export const fadeIn = keyframes`
0% {
    opacity: 0.25;
}
100% {
    opacity: 1;
}
`;

export const baseInputCss = css`
border: 1.5px solid currentcolor;
padding: 0.5rem;

background: none;
color: inherit;
font: inherit;
border-radius: 1.5rem / 1rem;
`;

export const baseClickableCss = css`
${baseInputCss}

&:hover {
    background: #386a8f1f;
}
`;