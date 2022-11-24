import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function BucketCard({ departmentName, departmentGoal, departmentDeadLine, bucketTitle, memberName, email, date, fileLinkList}){
    const percentage = 66;

    let commitHistory = memberName + " (" + email + ") "
    let commitTime = "commited " + date;
    return (
        <div className="bucket-card">
            <div className="bucket-card-top">
                <div className="percentage-circle">
                    <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({pathColor: '#FF4D4D', textColor: 'white'})}/>
                </div>
                <div>
                    <div className="bucket-card-department_info">부서명: {departmentName}</div>
                    <div className="bucket-card-department_info">목표 : {departmentGoal}</div>
                    <div className="bucket-card-department_info">마감일: {departmentDeadLine}</div>
                </div>
            </div>
            <div className="bucket-card-commit-info">
                <div className="bucket-commit-Title">{bucketTitle}</div>
                <div className="bucket-commit-history">{commitHistory}</div>
                <div className="bucket-commit-history">{commitTime}</div>
            </div>
        </div>
    );
};