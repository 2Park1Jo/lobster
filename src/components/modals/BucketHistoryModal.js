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
                for(let i=data.length-1;i>=0;i--){
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
                        {bucketList.length===0?
                            <>
                                <span style={{color:"black", fontSize:"30px"}}>버킷이 비어있습니다!</span>
                                <span style={{color:"black", fontSize:"20px",textAlign:"center"}}>버킷에 자료를 올리고 구성원들과 공유해보세요!</span>
                            </>
                            :
                        <div className="bucket-history-modal-commitList">
                                {bucketList}
                        </div>
                        }
                    </div>
                        {title.length===0?
                            <div className="bucket-history-modal-contentContainer">
                            <span style={{color:"whit", fontSize:"50px",textAlign:"center"}}>버킷 내역을 클릭하시면 동료들이 올린 내용을 확인하실 수 있어요!</span>
                            </div>
                        :
                            <>
                            <div className="bucket-history-modal-selected-container">
                                <div style={{flexDirection:"row", marginTop:"30px"}}>
                                <span style={{float:"left", marginLeft:"20px", fontSize:"30px"}}>제목</span>
                                <input type="text" className="w-75 form-control bg-light" value={ title }
                                style={{paddingBottom:"10px", marginLeft:"105px"}} readonly="readonly"/>
                                </div>

                                <div className="bucket-history-modal-file" style={{marginTop:"40px"}}>
                                    {fileList}
                                </div>
                                
                                <div style={{flexDirection:"row",marginTop:"40px"}}>
                                <span style={{float:"left" , marginLeft:"10px",fontSize:"20px"}}>세부사항</span>
                                <textarea style={{resize: 'none', float:"left", height:"200px",marginLeft:"30px"}} type="text" className="w-75 form-control bg-light" readonly="readonly" value={detail}/>
                                </div>
                                <div>
                                <button className="btn btn-danger" style={{float:"right", marginTop:"20px", marginRight:"61px", marginBottom:"20px"}}>파일 다운로드</button>
                                </div>
                                </div>
                            </>
                        }
        </div>
        </>
    )
}

export default BucketHistoryModal