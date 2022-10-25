import React from "react";
import Carousel from "react-3-carousel";
import WorkspaceProfile from "./WorkspaceProfile";
import "./WorkspaceBanner.css"

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
];

const WorkspaceBanner = () =>{
    return (
        <>
            <h1 style={ { textAlign:"center" } }>LOBSTER</h1>
            <div className="workspace">
                <Carousel
                    titles={[
                        "SLIDE ONE",
                        "SLIDE TWO",
                        "SLIDE THREE",
                        "SLIDE FOUR",
                        "SLIDE FIVE",
                    ]}
                    descriptions={[
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        " Etiam mollis ex dolor, eget gravida felis blandit id. Curabitur congue nibh et gravida volutpat.",
                        "Integer tincidunt lorem non lacus laoreet, sed porta dui porttitor. ",
                        "Vestibulum suscipit vel dolor sit amet bibendum.",
                        "Nam ipsum enim, rutrum nec lectus eu, imperdiet dictum quam. ",
                    ]}
                >

                </Carousel>
            </div>
        </>
    );
}

export default WorkspaceBanner;