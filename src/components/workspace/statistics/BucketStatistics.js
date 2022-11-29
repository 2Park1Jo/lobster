import React, {useState, useEffect} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getBucketCommitCountData } from '../../../api/BucketAPI'
import 'react-circular-progressbar/dist/styles.css';
import './Statistics.css'

export default function BucketStatistics(){

    let [commitCount, setCommitCount] = useState([]);
    let [countProgressBar, setCountProgressBar] = useState([]);

    useEffect( () => {
        let commitCountList = [];
        getBucketCommitCountData(localStorage.getItem('accessedWorkspaceId'))
        .then ( (res) => {
            res.map( (department) => {
                console.log(department)
                commitCountList.push({
                    departmentName: department.departmentName,
                    departmentId: department.departmentId,
                    commitCount: department.commitCount,
                    key: department.departmentId
                })
            })
            setCommitCount([...commitCountList])
        })
    }, [])

    useEffect( () => {
        let progressBars = [];
        let wholeCommitCount = 0;
        let commitCountList = [...commitCount];

        for (let index = 0; index < commitCountList.length; index++){
            wholeCommitCount = wholeCommitCount + Number(commitCountList[index].commitCount);
        }

        for (let index = 0; index < commitCountList.length; index++){
            let progress = Math.round((Number(commitCountList[index].commitCount) / wholeCommitCount) * 100);
            progressBars.push(
                <div key={commitCount[index].departmentId}>
                    <div className="progress-left-text">{commitCountList[index].departmentName}</div>
                    <ProgressBar key={commitCount[index].departmentId} className="progress-bar-in-departmentStatistics" variant="danger" now={progress} label={`${progress}% `}/>
                </div>
            )
            setCountProgressBar([...progressBars])           
        }
    }, [commitCount])

    return (   
        <div className="department-statistics">
            <div className="department-chat-progress-container">
                <div>어떤 부서가 버킷을 많이 채웠을까요?</div>
                {countProgressBar}
            </div>
        </div>
    );
};