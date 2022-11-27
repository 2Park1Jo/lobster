import React, {useState, useEffect} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getChattingData } from '../../../api/DepartmentAPI';
import { getWorkspaceDepartments } from "../../../api/DepartmentAPI";
import 'react-circular-progressbar/dist/styles.css';
import './Statistics.css'

export default function DepartmentChatStatistics({departmentViewModel}){

    let [chatCount, setChatCount] = useState([]);
    let [countProgressBar, setCountProgressBar] = useState([]);

    useEffect( () => {
        let chatCountList = [];
        getWorkspaceDepartments(localStorage.getItem('accessedWorkspaceId'))
        .then( (res) => {
            res.map( (department) => {
                getChattingData(department.departmentId)
                .then((res) => {
                    chatCountList.push({
                        departmentId: department.departmentId,
                        chatCount: res.length,
                        key: department.departmentId
                    })
                    setChatCount([...chatCountList])
                })
            })
        })
    },[])

    useEffect( () => {
        let progressBars = [];
        let wholeChatCount = 0;
        let chatCountList = [...chatCount];

        chatCountList = chatCountList.sort((a,b) => (b.chatCount - a.chatCount));

        for (let index = 0; index < chatCountList.length; index++){
            wholeChatCount = wholeChatCount + Number(chatCountList[index].chatCount);
        }

        for (let index = 0; index < chatCountList.length; index++){
            let departmentName = departmentViewModel.getName(chatCountList[index].departmentId)
            let progress = Math.round((Number(chatCountList[index].chatCount) / wholeChatCount) * 100);
            progressBars.push(
                <>
                    <div className="progress-left-text">{departmentName}</div>
                    <ProgressBar key={chatCount[index].departmentId} className="progress-bar-in-departmentStatistics" variant="danger" now={progress} label={`${progress}% `}/>
                </>
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