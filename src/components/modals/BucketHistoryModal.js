import { FileList } from "../workspace/FileList"
import { AiOutlineFileText } from "react-icons/ai"
import {getBucket} from "../../api/BucketAPI.js"
import { useState,useEffect,useRef,useCallback } from "react"
import BucketSemiCard from "../workspace/BucketSemiCard.js"
const BucketHistoryModal=({setBucketMenu,departmentId})=>{
    const [bucketList,setBucketList]=useState([]);
    const [title,setTitle]=useState("")
    const [fileList,setFileList]=useState([])
    const [detail,setDetail]=useState("")
    const [fileLinkList,setFileLinkList]=useState([])

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
                        <BucketSemiCard
                        bucketTitle = {data[i].title}
                        memberName = {data[i].memberName}
                        email = {data[i].email}
                        date = {data[i].date}
                        onClick={() => showHistory(data.length-1-i)}
                        key = {i}
                      />)
                }
                setBucketList([...list])
            }
        }).catch(err=>{
            alert("서버에 에러가 발생하였습니다.")
        })
    },[])

    function showHistory(i){
        if(bucket.length>0){
            let index=i;
            let list=[];
            let linkList=[];
            setTitle(bucket[index].title);
            if(bucket[index].fileLink1!==null){
                        list.push(
                        <a className="bucket-page-box-file-container" href={bucket[index].fileLink1} >
                        <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                        <div className="content">{bucket[index].fileLink1.substring(bucket[index].fileLink1.lastIndexOf("/")+1)}</div>
                        </a>);
                        let fileName = bucket[index].fileLink1.substring(bucket[index].fileLink1.lastIndexOf("/")+1);
                        let element = document.createElement('a');
                        element.href = bucket[index].fileLink1;
                        element.download = fileName;
                        linkList.push(element);
                        if(bucket[index].fileLink2!==null){
                            list.push(<a className="bucket-page-box-file-container" href={bucket[i].fileLink2}>
                            <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                            <div className="content">{bucket[index].fileLink2.substring(bucket[index].fileLink2.lastIndexOf("/")+1)}</div>
                            </a>)
                            let fileName = bucket[index].fileLink2.substring(bucket[index].fileLink2.lastIndexOf("/")+1);
                            let element = document.createElement('a');
                            element.href = bucket[index].fileLink2;
                            element.download = fileName;
                            linkList.push(element);
                            if(bucket[index].fileLink3!==null){
                                list.push(<a className="bucket-page-box-file-container" href={bucket[i].fileLink3}>
                                <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                                <div className="content">{bucket[index].fileLink3.substring(bucket[index].fileLink3.lastIndexOf("/")+1)}</div>
                                </a>)
                                let fileName = bucket[index].fileLink3.substring(bucket[index].fileLink3.lastIndexOf("/")+1);
                                let element = document.createElement('a');
                                element.href = bucket[index].fileLink3;
                                element.download = fileName;
                                linkList.push(element);
                                if(bucket[index].fileLink4!==null){
                                    list.push(<a className="bucket-page-box-file-container" href={bucket[i].fileLink4}>
                                    <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                                    <div className="content">{bucket[index].fileLink4.substring(bucket[index].fileLink4.lastIndexOf("/")+1)}</div>
                                    </a>)
                                    let fileName = bucket[index].fileLink4.substring(bucket[index].fileLink4.lastIndexOf("/")+1);
                                    let element = document.createElement('a');
                                    element.href = bucket[index].fileLink4;
                                    element.download = fileName;
                                    linkList.push(element);
                                    if(bucket[index].fileLink5!==null){
                                        list.push(<a className="bucket-page-box-file-container" href={bucket[index].fileLink5}>
                                        <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                                        <div className="content">{bucket[index].fileLink5.substring(bucket[index].fileLink5.lastIndexOf("/")+1)}</div>
                                        </a>)
                                        let fileName = bucket[index].fileLink5.substring(bucket[index].fileLink5.lastIndexOf("/")+1);
                                        let element = document.createElement('a');
                                        element.href = bucket[index].fileLink5;
                                        element.download = fileName;
                                        linkList.push(element);
                                    }
                                }
                            }
                        }
                    }
        setFileList([...list])
        setFileLinkList([...linkList])
        setDetail(bucket[index].commit)
            }
    }
    
    function fileDownload(){
        // console.log(fileLinkList[1].click())
        for(var i=0;i<fileLinkList.length;i++){
            let file=fileLinkList[i];
            setTimeout(() => {
                file.click()
            }, 1000*i);
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
                            <div className="bucket-history-empty">
                                <span style={{color:"white", fontSize:"30px"}}>버킷이 비어있습니다!</span>
                                <span style={{color:"white", fontSize:"20px",textAlign:"center"}}>버킷에 자료를 올리고 구성원들과 공유해보세요!</span>
                            </div>
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
                            <div style={{width:"600px",height:"95%"}}>
                            <div className="bucket-page-box-container">
                                <div style={{display:'inline-block'}}>
                                    제목
                                </div>

                                <div className="bucket-page-box-title">
                                    {title}
                                </div>

                                <div className="bucket-page-box-files">{fileList}</div>

                                <div style={{display:'inline'}}>
                                    내용
                                </div>
                                
                                <div className="bucket-page-box-commit">
                                    {detail}
                                </div>
                                <button className="btn btn-danger" style={{ marginTop:"20px",marginLeft:"396px", marginBottom:"20px"}} onClick={()=>fileDownload()}>파일 다운로드</button>
                            </div>
                            </div>
                            </div>
                            </>
                        }
        </div>
        </>
    )
}

export default BucketHistoryModal