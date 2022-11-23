import { FileList } from "../workspace/FileList"
import { AiOutlineFileText } from "react-icons/ai"
import {getBucket} from "../../api/BucketAPI.js"
import { useState,useEffect,useRef } from "react"
const BucketHistoryModal=({setBucketMenu,departmentId})=>{
    const [bucketList,setBucketList]=useState([]);
    const [title,setTitle]=useState("")
    const [fileList,setFileList]=useState([])
    const [detail,setDetail]=useState("")

    let bucket=[]

    useEffect(()=>{
        let request=Promise.resolve(getBucket(departmentId))
        request.then((value)=>{
            let data=value.data
            if(data.length>0){
                let list=[]
                for(let i=0;i<data.length;i++){
                    bucket.push(data[i])
                    console.log(data[i])
                    let fileCount=0

                    if(data[i].fileLink1!==null){
                        fileCount++
                        if(data[i].fileLink2!==null){
                            fileCount++
                            if(data[i].fileLink3!==null){
                                fileCount++
                                if(data[i].fileLink4!==null){
                                    fileCount++
                                    if(data[i].fileLink5!==null){
                                        fileCount++
                                    }
                                }
                            }
                        }
                    }

                    list.push(
                    <div className="bucket-history-modal-commit" onClick={()=>showHistory(i)}>
                        <span style={{fontSize:"20px"}}>{data[i].title}</span>
                        <span style={{fontSize:"12px"}}>파일개수 : {fileCount}</span>
                        <span style={{fontSize:"12px"}}>{data[i].date}</span>
                    </div>)
                }
                setBucketList([...list])
            }
        }).catch(err=>{
            alert("서버에 에러가 발생하였습니다.")
        })
    },[])

    function showHistory(i){
        console.log(bucket)
        if(bucket.length>0){
            let index=i
            let list=[];
            setTitle(bucket[index].title);
            if(bucket[index].fileLink1!==null){
                        list.push(
                        <a className="file-container" href={bucket[index].fileLink1} >
                        <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                        <div className="content">{bucket[index].fileLink1.substring(bucket[index].fileLink1.lastIndexOf("/")+1)}</div>
                        </a>)
                        if(bucket[index].fileLink2!==null){
                            list.push(<a className="file-container" href={bucket[i].fileLink2}>
                            <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                            <div className="content">{bucket[index].fileLink2.substring(bucket[index].fileLink2.lastIndexOf("/")+1)}</div>
                            </a>)
                            if(bucket[index].fileLink3!==null){
                                list.push(<a className="file-container" href={bucket[i].fileLink3}>
                                <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                                <div className="content">{bucket[index].fileLink3.substring(bucket[index].fileLink3.lastIndexOf("/")+1)}</div>
                                </a>)
                                if(bucket[index].fileLink4!==null){
                                    list.push(<a className="file-container" href={bucket[i].fileLink4}>
                                    <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                                    <div className="content">{bucket[index].fileLink4.substring(bucket[index].fileLink4.lastIndexOf("/")+1)}</div>
                                    </a>)
                                    if(bucket[index].fileLink5!==null){
                                        list.push(<a className="file-container" href={bucket[index].fileLink5}>
                                        <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                                        <div className="content">{bucket[index].fileLink5.substring(bucket[index].fileLink5.lastIndexOf("/")+1)}</div>
                                        </a>)
                                    }
                                }
                            }
                        }
                    }
        setFileList([...list])
        setDetail(bucket[index].commit)
            }
    }
    return(
        <>
        <div>
                <div className='bucket-modal-menu'>버킷 내역</div>
                <div className='bucket-modal-menu-unselected' onClick={()=>setBucketMenu(1)}>버킷 최신화</div>
        </div>
        <div className="bucket-history-modal-container">
                    <div className="bucket-history-modal-commitsContainer">
                        <div className="bucket-history-modal-commitList">
                            {bucketList}
                        </div>
                    </div>
                    <div className="bucket-history-modal-contentContainer">
                        <h2 style={{marginTop:"30px"}}>
                            {title}
                        </h2>
                        <div className="bucket-history-modal-file">
                            {fileList}
                        </div>
                        <div style={{width:"400px", height:"200px"}}>
                            {detail}
                        </div>
                </div>
        </div>
        </>
    )
}

export default BucketHistoryModal