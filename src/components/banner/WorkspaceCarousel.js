import Carousel from "react-spring-3d-carousel";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { config } from "react-spring";
import { useSetRecoilState } from "recoil";
import { ACCESSED_DEPARTMENT, WORKSPACE_ID } from "../../recoil/Atoms";
import { WORKSPACE_ADD_KEY } from "../../utils/Constant";

export default function WorkspaceCarousel(props) {
    const table = props.cards.map((element, index) => {
        return { ...element, onClick: () => onClickCard(index) };
    });

    const [offsetRadius, setOffsetRadius] = useState(2);
    const [showArrows, setShowArrows] = useState(false);
    const [goToSlide, setGoToSlide] = useState(0);
    const [cards] = useState(table);
    const currentSlide = useRef(goToSlide);
    const setWorkspaceId = useSetRecoilState(WORKSPACE_ID);
    const setAccessedDepartment = useSetRecoilState(ACCESSED_DEPARTMENT);
    const navigate = useNavigate();

    function onClickCard(index){
        if (currentSlide.current === index){
            if (cards[index].key === WORKSPACE_ADD_KEY){
                props.setModalIsOpen(true)
                document.body.style.overflow = "hidden";
            }
            else {
                // alert(table[index].key) // workspaceId
                setWorkspaceId(cards[index].key)
                setAccessedDepartment({
                    id: cards[index].key  + "_1",
                    name: "📢 공지방"
                })
                localStorage.setItem('accessedWorkspaceId', cards[index].key)
                localStorage.setItem('accessedDepartmentId', cards[index].key + "_1")
                navigate("/workspace/" + cards[index].key + "/chat/department/" + cards[index].key + "_1") // 로그인한 유저 정보, 워크스페이스 정보 state 넘기기 or recoil
            }
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
