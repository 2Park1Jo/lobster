import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'react-circular-progressbar/dist/styles.css';
import './Statistics.css'

export default function WorkspaceStatistics({workspaceViewModel}){
    let progress = workspaceViewModel.getWorkspaceProgress(localStorage.getItem('accessedWorkspaceId'));
    let creationDate = workspaceViewModel.getCreationDate(localStorage.getItem('accessedWorkspaceId'));
    let deadline = workspaceViewModel.getDeadLine(localStorage.getItem('accessedWorkspaceId'));
    let dday = workspaceViewModel.getDDay(localStorage.getItem('accessedWorkspaceId'));

    return (   
        <div className="workspace-statistics">
            <div>워크스페이스 진행률</div>
            <ProgressBar className="percentage-bar" variant="danger" now={progress} label={`${progress}%`}/>
            {/* <ProgressBar className="percentage-bar" variant="danger" now={progress} label={"마감일까지 " + `${progress}% ` + dday}/> */}
            <div className="workspace-statistics-date-info">
                <div style={{float:'left'}}>{creationDate}</div>
                <div style={{display:'inline', float:'right'}}>{deadline}</div>
            </div>
        </div>
    );
};