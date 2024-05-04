import { baseInputCss } from "@/styles";
import styled from "styled-components";

export const TextEntry = ({
    value,
    onInput,
    placeholder,
}: {
    value: string,
    onInput: (text: string) => void,
    placeholder: string,
}) => {
    return (
        <TextEntryContainer>

        </TextEntryContainer>
    );
};

const TextEntryContainer = styled.input`
${baseInputCss}
`;