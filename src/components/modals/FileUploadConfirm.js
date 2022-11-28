import { useState,useEffect,useRef } from "react";
import FileUpload from "../../utils/FileUpload";


const FileUploadConfirm=({setFileUploadConfirmModalIsOpen,selectedFile,setSelectedFile,stomp})=>{
    let [isConfirmed,setIsConfirmed]=useState(false);
    let [isUpload,setIsUpload]=useState(false);
    let [fileList,setFileList]=useState();
    let [completeList,setCompleteList]=useState(0);
    let a=0
    useEffect(()=>{
        const list=[]
        for(var i=0;i<selectedFile.length;i++){
            const file=selectedFile.at(i)
            let fileUpload=<FileUpload file={file} stomp={stomp} isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} index={i} callback={callback}/>
            list.push(fileUpload)
        }
        setFileList([...list])
    },[selectedFile,isConfirmed])

    function close(){
        setFileUploadConfirmModalIsOpen(false)
        setSelectedFile([]);
    }

    function upload(){
        setIsConfirmed(true)
        setIsUpload(true)
    }

    function callback(index){
        a+=index
        setCompleteList(a)
    }



    return(
        <div>
            <button className="modal-close" type="button" onClick={() => close()}>X</button>
            <div className="upload-modal-container">
            <h1>파일목록</h1>
            {fileList}
            {isUpload===false?
            <>
                <h1>업로드 하시겠습니까?</h1>
                <button className="btn btn-secondary" onClick={()=>upload()}>
                확인
                </button>
            </>
                :
            <>
                {completeList===selectedFile.length?
                    <h1>업로드가 완료되었습니다!</h1>   
                :
                <>
                    <div className="defence-wall"></div>
                    <h1>업로드 중입니다...</h1>   
                </>
                }   
                <button className="btn btn-secondary" onClick={()=>close()}>
                닫기
                </button>
                </>
            }
            </div>
        </div>
    )
}
export default FileUploadConfirm;