import { baseClickableCss } from "@/styles";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

export const Dropdown = <T,>({
    value,
    onChange,
    options,
}: {
    value: T,
    onChange: (value: T) => void,
    options: Map<T, string>,
}) => {
    const valuesMap = useMemo(() => new Map([...options.keys()].map((optionValue, i) => [i, optionValue])), [options]);

    const selectRef = useRef<HTMLSelectElement>(null);
    useEffect(() => {
        let i = 0;
        for (const optionValue of options.keys()) {
            if (value === optionValue) {
                selectRef.current!.selectedIndex = i;
            }
            i++;
        }
    }, [options]);

    return (
        <DropdownContainer
            ref={selectRef}
            onChange={event => {
                const select = event.currentTarget;

                if (valuesMap.has(select.selectedIndex)) {
                    onChange(valuesMap.get(select.selectedIndex)!);
                }
            }}
        >
            {[...options].map(([value, label], i) => (
                <option key={label}>
                    {label}
                </option>
            ))}
        </DropdownContainer>
    );
};

const DropdownContainer = styled.select`
${baseClickableCss}

&:focus {
    background: var(--col-fg);
    border-color: var(--col-fg);
    color: #fff;
}
`;