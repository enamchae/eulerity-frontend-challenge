import { buttonClickEffectCss, buttonHoverEffectCss, resetInputCss } from "@/styles";
import styled, { RuleSet, css } from "styled-components";

export const ButtonX = ({
    onClick,
    style=css``,
}: {
    onClick: () => void,
    style?: RuleSet<object>,
}) => {
    return (
        <ButtonXContainer
            onClick={() => onClick()}
            $style={style}
        >
            ✕
        </ButtonXContainer>
    );
};

export const ButtonXContainer = styled.button.attrs<{
    $style: RuleSet<object>
}>(props => props)`
${resetInputCss}
${buttonHoverEffectCss}
${buttonClickEffectCss}

cursor: pointer;

padding: 0.5rem;
line-height: 1;

border-radius: 25%;

${props => props.$style}
`;