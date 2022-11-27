import React, { useEffect, useState } from "react";
import TalkKingCard from "./TalkKingCard";
import { getTalkKingMembers } from "../../../api/MemberAPI";
import 'react-circular-progressbar/dist/styles.css';
import './Statistics.css'

export default function TalkKingStatistics(){

    let [talkKingMembers, setTalkKingMembers] = useState([]); 
    let [talkKingTopCard, setTalkKingTopCard] = useState([]);
    let [talkKingBottomCards, setTalkKingBottomCards] = useState([]);

    useEffect( () => {
        getTalkKingMembers(localStorage.getItem('accessedWorkspaceId'))
        .then( (res) =>{
            setTalkKingMembers(res);
        })
    },[])

    useEffect( () => {
        let topCard = [];
        let bottomCards = [];
        talkKingMembers.map( (member, index) => {
            if (index === 0){
                topCard.push(
                    <TalkKingCard
                        rank= {index + 1}
                        memberName = {member.memberName}
                        departmentName = {member.departmentNameList}
                        chatCount = {member.numberOfChats}
                        key = {index}
                    />
                )
            }
            else{
                bottomCards.push(
                    <TalkKingCard
                        rank= {index + 1}
                        memberName = {member.memberName}
                        departmentName = {member.departmentNameList}
                        chatCount = {member.numberOfChats}
                        key = {index}
                    />
                )
            }
        })
        setTalkKingTopCard([...topCard])
        setTalkKingBottomCards([...bottomCards])

    }, [talkKingMembers])
    
    return (   
        <div className="talk-king-statistics-main-container">
            <div>이구역의 채팅왕 !</div>
            <div className="talk-king-statistics-container">
                {talkKingTopCard}
            </div>
            <div className="talk-king-statistics-container">
                {talkKingBottomCards}
            </div>
        </div>
    );
};