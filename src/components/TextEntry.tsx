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
        <TextEntryContainer
            value={value}
            placeholder={placeholder}
            onInput={event => {
                onInput(event.currentTarget.value);
            }}
        />
    );
};

const TextEntryContainer = styled.input`
${baseInputCss}
`;