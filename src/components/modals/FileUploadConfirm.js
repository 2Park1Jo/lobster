import { useState,useEffect,useRef } from "react";
import FileUpload from "../../utils/FileUpload";

const FileUploadConfirm=({setFileUploadConfirmModalIsOpen,selectedFile,setSelectedFile,stomp})=>{
    let [isConfirmed,setIsConfirmed]=useState(false);
    let [isUpload,setIsUpload]=useState(false);
    let [isCanceled,setIsCancled]=useState(false);
    let [fileList,setFileList]=useState();
    useEffect(()=>{
        const list=[]
        for(var i=0;i<selectedFile.length;i++){
            const file=selectedFile.at(i)
            let fileUpload=<FileUpload file={file} stomp={stomp} isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} isCancled={isCanceled}/>
            list.push(fileUpload)
        }
        setFileList([...list])
    },[selectedFile, isConfirmed,isCanceled])
    
    function close(){
        setIsCancled(true)
        setFileUploadConfirmModalIsOpen(false)
        setSelectedFile([]);
    }

    function upload(){
        setIsConfirmed(true)
        setIsUpload(true)
    }



    return(
        <div>
            <button className="modal-close" type="button" onClick={() => close()}>X</button>
            <div className="upload-modal-container">
            <h1>파일목록</h1>
            {fileList}
            <h1>업로드 하시겠습니까?</h1>
            {isUpload===false?
                <button className="btn btn-primary" onClick={()=>upload()}>
                확인
                </button>
                :
                <button className="btn btn-primary" onClick={()=>close()}>
                닫기
                </button>
            }
            </div>
        </div>
    )
}
export default FileUploadConfirm;