import React, { useState, useEffect } from "react";
import { AiOutlineFileText } from "react-icons/ai";

export default function BucketBox({ bucketTitle, bucketCommit, link1, link2, link3, link4, link5}){
    let [fileList, setFileList] = useState([]);

    useEffect( () => {
        let files = [];
        if (link1 !== null){
            files.push(
                <a href={link1} key={link1} className="bucket-page-box-file-container">
                    <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                    <div className="content">{link1.substring(link1.lastIndexOf("/")+1)}</div>
                </a>
            )
            if (link2 !== null){
                files.push(
                    <a href={link2} key={link2} className="bucket-page-box-file-container">
                        <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                        <div className="content">{link2.substring(link2.lastIndexOf("/")+1)}</div>
                    </a>
                )
                if (link3 !== null){
                    files.push(
                        <a href={link3} key={link3} className="bucket-page-box-file-container">
                            <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                            <div className="content">{link3.substring(link3.lastIndexOf("/")+1)}</div>
                        </a>
                    )
                    if (link4 !== null){
                        files.push(
                            <a href={link4} key={link4} className="bucket-page-box-file-container">
                                <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                                <div className="content">{link4.substring(link4.lastIndexOf("/")+1)}</div>
                            </a>
                        )
                        if (link5 !== null){
                            files.push(
                                <a href={link5} key={link5} className="bucket-page-box-file-container">
                                    <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                                    <div className="content">{link5.substring(link5.lastIndexOf("/")+1)}</div>
                                </a>
                            )
                        }
                    }
                }
            }
        }
        setFileList([...files])
    }, [])

    return (
        <div className="bucket-page-box-container">
            <div style={{display:'inline-block'}}>
                제목
            </div>

            <div className="bucket-page-box-title">
                {bucketTitle}
            </div>

            <div className="bucket-page-box-files">{fileList}</div>

            <div style={{display:'inline'}}>
                내용
            </div>
            
            <div className="bucket-page-box-commit">
                {bucketCommit}
            </div>

            <div className="division-line"></div>

            <div className="bucket-page-box-comment">
                
            </div>
        </div>
    );
};