import React from "react";
// import { Carousel } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

import Carousel from "react-elastic-carousel";
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
            <h1 className="workspace-banner-top" style={{ textAlign: "center" }}>LOBSTER</h1>
            <div className="workspace">
                <Carousel breakPoints={breakPoints}>
                    <WorkspaceProfile>One</WorkspaceProfile>
                    <WorkspaceProfile>Two</WorkspaceProfile>
                    <WorkspaceProfile>Three</WorkspaceProfile>
                    <WorkspaceProfile>Four</WorkspaceProfile>
                    <WorkspaceProfile>Five</WorkspaceProfile>
                    <WorkspaceProfile>Six</WorkspaceProfile>
                    <WorkspaceProfile>Seven</WorkspaceProfile>
                    <WorkspaceProfile>Eight</WorkspaceProfile>
                </Carousel>
            </div>
        </>
    );
}

export default WorkspaceBanner;