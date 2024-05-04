import { RefObject, useEffect, useState } from "react";
import styled from "styled-components";

const quartInOut = (t: number) => {
    if (t <= 0) {
        return 0;
    } else if (t <= 0.5) {
        return 8 * t**4;
    } else if (t <= 1) {
        return 1 - 8 * (1 - t)**4;
    } else {
        return 1;
    }
};

export const TitleBar = ({
    listScrollerRef,
}: {
    listScrollerRef: RefObject<HTMLDivElement>,
}) => {
    const [titleMovementProgress, setTitleMovementProgress] = useState(0);
    useEffect(() => {
        const updateMovementProgress = () => {
            setTitleMovementProgress(
                quartInOut(
                    (listScrollerRef.current?.scrollTop ?? 0)
                    / ((listScrollerRef.current?.offsetHeight ?? 1) / 2)
                )
            );
        };
        listScrollerRef.current?.addEventListener("scroll", updateMovementProgress);
        addEventListener("resize", updateMovementProgress);
        updateMovementProgress();

        return () => {
            listScrollerRef.current?.removeEventListener("scroll", updateMovementProgress);
            removeEventListener("resize", updateMovementProgress);
        };
    }, [listScrollerRef]);

    return (
        <TitleBarContainer $movementProgress={titleMovementProgress}>
            <ListTitle>
                <Title>These are my pets!</Title>
                <Subtitle>(no they are not “wild animals” you cannot take them away from me)</Subtitle>
            </ListTitle>
        </TitleBarContainer>
    );
};

const TitleBarContainer = styled.div.attrs<{ $movementProgress: number }>(props => ({
    style: {
        "--movement-progress": props.$movementProgress,
    }
}))`
--movement-progress: 0;

grid-area: 1/1;
position: relative;
padding-left: var(--side-padding);
padding-right: var(--side-padding);

background: radial-gradient(ellipse at 50% 25%, rgba(22, 58, 70, calc(var(--movement-progress) * 0.75)), #0000 50%);

pointer-events: none;

z-index: 1;
`;

const ListTitle = styled.div`
position: absolute;
width: calc(100% - 2 * var(--side-padding));
top: calc(2rem * var(--movement-progress) + 25vh * (1 - var(--movement-progress)));
display: flex;
flex-direction: column;
gap: 1rem;

transform:
        scale(calc(1 - var(--movement-progress) * .4))
        translateY(calc(-50% * (1 - var(--movement-progress))));
transform-origin: top;

text-shadow: 0 0 #fff;
color: rgba(24, 58, 47, calc(round(1.1 - var(--movement-progress))));
`;

const Title = styled.h1`
font-size: 3rem;
margin: 0;
`;

const Subtitle = styled.div`
font-size: 1.15rem;

transform: scale(calc(1.25 * var(--movement-progress) + (1 - var(--movement-progress))));
`;