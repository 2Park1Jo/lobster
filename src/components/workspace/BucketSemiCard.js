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
        <div className="bucket-semi-card" onClick={onClick} style={{width:`${width}`, boxShadow:'none'}}>
            <div className="bucket-card-commit-info">
                <div className="bucket-commit-Title">{bucketTitle}</div>
                <div className="bucket-commit-history">{commitHistory}</div>
                <div className="bucket-commit-history">{commitTime}</div>
            </div>
        </div>
    );
};