import { Pet } from "$/Pet";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

export const PetView = ({pet}: {pet: Pet}) => {
    const [rotation, setRotation] = useState(0);
    const [translation, setTranslation] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const boundingBox = useMemo(() => containerRef.current?.getBoundingClientRect(), [containerRef]);

    useEffect(() => {
        const onscroll = () => {
            const yProportion = ((containerRef.current?.offsetTop ?? 0) + (containerRef.current?.offsetWidth ?? 0) / 2 - scrollY) / innerHeight;
            const yProportionClamped = Math.max(-1, Math.min(1, yProportion * 2 - 1));
            setRotation(-Math.asin(yProportionClamped));
            setTranslation(Math.sqrt(1 - yProportionClamped**2) - 1);
        };
        addEventListener("scroll", onscroll);

        return () => {
            removeEventListener("scroll", onscroll);
        };
    }, []);

    return (
        <PetContainer
            ref={containerRef}
            $rotation={String(rotation)}
            $translation={String(translation)}
        >
            <PetImage src={pet.imageUrl} />

            <PetTextContainer>
                <PetText className="pet-text">
                    <PetTitle>{pet.title}</PetTitle>
                    <PetDesc>{pet.desc}</PetDesc>
                </PetText>
            </PetTextContainer>
        </PetContainer>
    );
};

const PetContainer = styled.div.attrs<{
    $rotation: string,
    $translation: string,
}>(props => ({
    style: {
        "--rotation": `${props.$rotation}rad`,
        "--translation": `${props.$translation}vh`,
    },
}))`
--rotation: 0rad;
--translation: 0vh;

display: grid;
height: 16rem;
overflow: hidden;
cursor: pointer;

border-radius: 6rem 4rem / 5rem 3rem;

user-select: none;

transform: translateZ(var(--translation)) rotateX(var(--rotation));

transition:
        transform 1s cubic-bezier(.2,2,.4,1);

&:hover {
    transform: scale(1.03125);

    > img {
        transform: scale(1.125);
        filter: brightness(1.25);
    }

    .pet-text {
        gap: 0;
        margin-bottom: 0;

        transition:
                gap 1s cubic-bezier(.4,1.25,.4,1),
                margin-bottom .5s cubic-bezier(.2,1,.7,1);
    }
}

&:active {
    transform: scale(0.9);

    > img {
        transform: scale(1.25);
        filter: brightness(0.8);
    }
}
`;

const PetImage = styled.img.attrs(({src}: {src: string}) => ({
    src,
}))`
grid-area: 1/1;

align-self: stretch;
justify-self: stretch;
height: 100%;
width: 100%;
object-fit: cover;

transition:
        transform .5s cubic-bezier(.18,1.56,.44,.99),
        filter .125s ease-in-out;
`;

const PetTextContainer = styled.div`
--padding-bottom: 3rem;

grid-area: 1/1;

height: 100%;
padding: 2rem var(--padding-bottom);
display: flex;
align-items: stretch;

text-align: left;
color: #fff;
background: radial-gradient(ellipse at bottom left, #0000009f, #0000003f 60%, #0000);
z-index: 1;
`;

const PetText = styled.div`
display: flex;
flex-direction: column;
justify-content: end;

--text-desc-spacing: calc(1rem + var(--padding-bottom));

gap: var(--text-desc-spacing);
margin-bottom: calc(-1 * var(--text-desc-spacing) - 2em);


transition:
        gap .5s cubic-bezier(.5,0,.5,1),
        margin-bottom .5s ease-in-out;
`;

const PetTitle = styled.div`
font-weight: 700;
font-size: 2rem;
`;

const PetDesc = styled.div`
`;