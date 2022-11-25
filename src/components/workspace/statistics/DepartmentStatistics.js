import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'react-circular-progressbar/dist/styles.css';
import './Statistics.css'

export default function DepartmentStatistics({departmentViewModel, chatViewModel}){

    let first = 1;
    let second = 2;
    let third = 3;
    console.log(chatViewModel)

    return (   
        <div className="department-statistics">
            <ProgressBar className="percentage-bar" variant="danger" now={first} label={`${first}% `}/>
            <ProgressBar className="percentage-bar" variant="danger" now={second} label={`${second}% `}/>
            <ProgressBar className="percentage-bar" variant="danger" now={third} label={`${third}% `}/>
        </div>
    );
};