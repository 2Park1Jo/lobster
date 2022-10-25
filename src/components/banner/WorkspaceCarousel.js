import Carousel from "react-spring-3d-carousel";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { config } from "react-spring";

export default function WorkspaceCarousel(props) {
    const table = props.cards.map((element, index) => {
        return { ...element, onClick: () => onClickCard(index) };
    });

    const [offsetRadius, setOffsetRadius] = useState(2);
    const [showArrows, setShowArrows] = useState(false);
    const [goToSlide, setGoToSlide] = useState(0);
    const [cards] = useState(table);
    const currentSlide = useRef(goToSlide);
    const navigate = useNavigate();

    function onClickCard(index){
        if (currentSlide.current === index){
            navigate("/workSpace") // recoil 에서 로그인한 유저 정보, 워크스페이스 정보 state 넘기기
        }
        else{
            setGoToSlide(index)
        }
    }
    
    useEffect(() =>{
        currentSlide.current = goToSlide;
    }, [goToSlide])

    useEffect(() => {
        setOffsetRadius(props.offset);
        setShowArrows(props.showArrows);
    }, [props.offset, props.showArrows]);

    return (
        <div
        style={{ width: props.width, height: props.height, margin: props.margin }}
        >
            <Carousel
                slides={cards}
                goToSlide={goToSlide}
                offsetRadius={offsetRadius}
                showNavigation={showArrows}
                animationConfig={config.gentle}
            />
        </div>
    );
}