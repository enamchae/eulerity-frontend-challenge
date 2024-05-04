import { css, keyframes } from "styled-components";

export const fadeIn = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 1;
}
`;

export const resetInputCss = css`
border: none;
background: none;
padding: 0;
color: inherit;
font: inherit;
`;

export const inputBorderRadiusCss = css`
border-radius: 1.5rem / 1rem;
`;

export const baseInputBorderCss = css`
border: 1.5px solid currentcolor;
padding: 0.5rem;

${inputBorderRadiusCss}
`;

export const baseInputCss = css`
${resetInputCss}
${baseInputBorderCss}
`;

export const buttonHoverEffectCss = css`
&:hover {
    background: #386a8f1f;
}
`;

export const baseClickableCss = css`
${baseInputCss}
${buttonHoverEffectCss}
`;

export const buttonClickEffectCss = css`
&:active {
    background: var(--col-fg);
    border-color: var(--col-fg);
    color: #fff;
}
`;