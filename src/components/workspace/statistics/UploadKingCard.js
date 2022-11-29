import React from "react";
import '../Card.css'
import 'react-circular-progressbar/dist/styles.css';
import {IoPersonCircle} from "react-icons/io5";
import {FaMedal} from "react-icons/fa"

export default function UploadKingCard({rank, memberName, memberEmail, bucketCount}){
    return (
        <div className="talk-king-card">
            {
                rank === 1 ?
                <div className="talk-rank" style={{color:'gold'}}>
                    <FaMedal/>
                </div>
                :
                rank === 2?
                <div className="talk-rank" style={{color:'silver'}}>
                    <FaMedal/>
                </div>
                :
                rank === 3?
                <div className="talk-rank" style={{color:'sienna'}}>
                    <FaMedal/>
                </div>         
                :
                <></>  
            }
            <div className="talk-king-card-body">
                <IoPersonCircle style={{ minWidth:'100px', fontSize:'60px', marginTop:'20px'}}/>
                <div style={{marginTop:'13px'}}>
                <div className="talk-king-card-info">이름: {memberName} ({memberEmail})</div>
                    <div className="talk-king-card-info">업로드수 : {bucketCount}</div>
                </div>
            </div>
        </div>
    );
};