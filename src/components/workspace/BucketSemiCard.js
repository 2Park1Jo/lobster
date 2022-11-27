import React from "react";

export default function BucketSemiCard({ bucketTitle, memberName, email, date, onClick, width, border }){

    let commitHistory = memberName + " (" + email + ") "
    let commitTime = "commited " + date;
    return (
        width === undefined ?
        <div className="bucket-semi-card" onClick={onClick}>
            <div className="bucket-card-commit-info">
                <div className="bucket-commit-Title">{bucketTitle}</div>
                <div className="bucket-commit-history">{commitHistory}</div>
                <div className="bucket-commit-history">{commitTime}</div>
            </div>
        </div>
        :
            date === undefined ?
            <div className="bucket-semi-card" style={{width:`${width}`, boxShadow:'none', cursor:'default'}}>
                <div className="bucket-card-commit-info">
                    <div className="bucket-commit-history" style={{paddingTop:'12px'}}>등록된 버킷이 없습니다.</div>
                    <div className="bucket-commit-history">버킷을 등록하여 팀원들과 공유해보세요!</div>
                </div>
            </div>
            :
            <div className="bucket-semi-card" onClick={onClick} style={{width:`${width}`, boxShadow:'none'}}>
                <div className="bucket-card-commit-info">
                    <div className="bucket-commit-Title">{bucketTitle}</div>
                    <div className="bucket-commit-history">{commitHistory}</div>
                    <div className="bucket-commit-history">{commitTime}</div>
                </div>
            </div>
    );
};