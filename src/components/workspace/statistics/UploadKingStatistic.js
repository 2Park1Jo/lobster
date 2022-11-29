import React, { useEffect, useState } from "react";
import UploadKingCard from "./UploadKingCard";
import { getUploadKingMembers } from "../../../api/MemberAPI";
import 'react-circular-progressbar/dist/styles.css';
import './Statistics.css'

export default function UploadKingStatistics(){

    let [uploadKingMembers, setUploadKingMembers] = useState([]); 
    let [uploadKingTopCard, setUploadKingTopCard] = useState([]);
    let [uploadKingBottomCards, setUploadKingBottomCards] = useState([]);

    useEffect( () => {
        getUploadKingMembers(localStorage.getItem('accessedWorkspaceId'))
        .then( (res) =>{
            setUploadKingMembers(res);
        })
    },[])

    useEffect( () => {
        let topCard = [];
        let bottomCards = [];
        uploadKingMembers.map( (member, index) => {
            if (index === 0){
                topCard.push(
                    <UploadKingCard
                        rank= {index + 1}
                        memberName = {member.memberName}
                        memberEmail = {member.email}
                        bucketCount = {member.commitCount}
                        key = {index}
                    />
                )
            }
            else{
                bottomCards.push(
                    <UploadKingCard
                        rank= {index + 1}
                        memberName = {member.memberName}
                        memberEmail = {member.email}
                        bucketCount = {member.commitCount}
                        key = {index}
                    />
                )
            }
        })
        setUploadKingTopCard([...topCard])
        setUploadKingBottomCards([...bottomCards])

    }, [uploadKingMembers])
    
    return (   
        <div className="talk-king-statistics-main-container">
            <div>이구역의 버킷왕 !</div>
            <div className="talk-king-statistics-container">
                {uploadKingTopCard}
            </div>
            <div className="talk-king-statistics-container">
                {uploadKingBottomCards}
            </div>
        </div>
    );
};