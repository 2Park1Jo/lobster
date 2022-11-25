import React, {useState, useEffect} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import TalkKingCard from "./TalkKingCard";
import { getChattingData} from '../../../api/DepartmentAPI';
import 'react-circular-progressbar/dist/styles.css';
import './Statistics.css'

export default function DepartmentChatStatistics({departmentViewModel, chatViewModel, departmentIdList}){

    let [chatCount, setChatCount] = useState([]);
    let [countProgressBar, setCountProgressBar] = useState([]);
    console.log(departmentIdList)

    useEffect( () => {
        let chatCountList = [];
        departmentIdList.map( (departmentId) => {
            getChattingData(departmentId)
            .then((res) => {
                chatCountList.push({
                    departmentId: departmentId,
                    chatCount: res.length,
                    key: departmentId
                })
                setChatCount([...chatCountList])
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