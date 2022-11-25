import React from "react";
import TalkKingCard from "./TalkKingCard";
import 'react-circular-progressbar/dist/styles.css';
import './Statistics.css'

export default function TalkKingStatistics(){
    
    return (   
        <div className="talk-king-statistics-main-container">
            <div>이구역의 채팅왕 !</div>
            <div className="talk-king-statistics-container">
                <TalkKingCard
                    rank={1}
                    memberName="박대원"
                    departmentName="채팅방, 새로만든방"
                    chatCount="999"
                />
            </div>
            <div className="talk-king-statistics-container">
                <TalkKingCard
                    rank={2}
                    memberName="박대원"
                    departmentName="채팅방, 새로만든방"
                    chatCount="888"
                />
                <TalkKingCard
                    rank={3}
                    memberName="박대원"
                    departmentName="채팅방, 새로만든방"
                    chatCount="777"
                />
            </div>
        </div>
    );
};