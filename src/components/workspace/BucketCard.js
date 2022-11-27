import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function BucketCard({departmentName, departmentGoal, departmentDeadLine, bucketTitle, memberName, email, date, bucketProgress, onClick}){

    let commitHistory = memberName + " (" + email + ") "
    let commitTime = "commited " + date;
    return (
        date !== undefined ?
        <div className="bucket-card" onClick={onClick}>
            <div className="bucket-card-top">
                <div className="percentage-circle">
                    <CircularProgressbar value={bucketProgress} text={`${bucketProgress}%`} styles={buildStyles({pathColor: '#FF4D4D', textColor: 'white'})}/>
                </div>
                <div style={{marginTop:'5px'}}>
                    <div className="bucket-card-department_info">부서명: {departmentName}</div>
                    <div className="bucket-card-department_info">목표 : {departmentGoal}</div>
                    <div className="bucket-card-department_info">{departmentDeadLine}</div>
                </div>
            </div>
            <div className="bucket-card-commit-info">
                <div className="bucket-commit-Title">{bucketTitle}</div>
                <div className="bucket-commit-history">{commitHistory}</div>
                <div className="bucket-commit-history">{commitTime}</div>
            </div>
        </div>
        :
        <div className="bucket-card" style={{height:'105px'}}>
            <div className="bucket-card-top">
                <div className="percentage-circle">
                    <CircularProgressbar value={0} text={`${0}%`} styles={buildStyles({pathColor: '#FF4D4D', textColor: 'white'})}/>
                </div>
                <div style={{marginTop:'10px'}}>
                    <div className="bucket-card-department_info">등록된 버킷이 없습니다.</div>
                    <div className="bucket-card-department_info">버킷을 등록하여 팀원들과 공유해보세요!</div>
                </div>
            </div>
        </div>
    );
};