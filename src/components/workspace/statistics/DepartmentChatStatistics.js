import React, {useState, useEffect} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getWorkspaceChatCountData } from '../../../api/WorkspaceAPI'
import 'react-circular-progressbar/dist/styles.css';
import './Statistics.css'

export default function DepartmentChatStatistics(){

    let [chatCount, setChatCount] = useState([]);
    let [countProgressBar, setCountProgressBar] = useState([]);

    useEffect( () => {
        let chatCountList = [];
        getWorkspaceChatCountData(localStorage.getItem('accessedWorkspaceId'))
        .then ( (res) => {
            res.map( (department) => {
                chatCountList.push({
                    departmentName: department.departmentName,
                    departmentId: department.departmentId,
                    chatCount: department.messageCount,
                    key: department.departmentId
                })
            })
            setChatCount([...chatCountList])
        })
    }, [])

    useEffect( () => {
        let progressBars = [];
        let wholeChatCount = 0;
        let chatCountList = [...chatCount];

        for (let index = 0; index < chatCountList.length; index++){
            wholeChatCount = wholeChatCount + Number(chatCountList[index].chatCount);
        }

        for (let index = 0; index < chatCountList.length; index++){
            let progress = Math.round((Number(chatCountList[index].chatCount) / wholeChatCount) * 100);
            progressBars.push(
                <div key={chatCount[index].departmentId}>
                    <div className="progress-left-text">{chatCountList[index].departmentName}</div>
                    <ProgressBar key={chatCount[index].departmentId} className="progress-bar-in-departmentStatistics" variant="danger" now={progress} label={`${progress}% `}/>
                </div>
            )
            setCountProgressBar([...progressBars])           
        }
    }, [chatCount])

    return (   
        <div className="department-statistics">
            <div className="department-chat-progress-container">
                <div>어떤 부서가 채팅을 많이 쳤을까요?</div>
                {countProgressBar}
            </div>
        </div>
    );
};