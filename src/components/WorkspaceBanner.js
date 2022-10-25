import React from "react";
import Carousel from "react-3-carousel";
import "./WorkspaceBanner.css"

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
];

const WorkspaceBanner = () =>{
    return (
        <div className="banner-container">
            <h1 style={ { textAlign:"center" } }>LOBSTER</h1>
            <div className="banner">
                <Carousel
                    titles={[
                        "ONE",
                        "TWO",
                        "THREE",
                        "FOUR",
                        "FIVE",
                    ]}
                    descriptions={[
                        "목표 && 마감일",
                        "목표: 오픈소스 프로젝트 완성 마감일: 2022/10/10",
                        "목표 && 마감일",
                        "목표 && 마감일",
                        "목표 && 마감일",
                    ]}
                />
            </div>
        </div>
    );
}

export default WorkspaceBanner;