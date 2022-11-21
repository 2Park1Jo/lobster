import { useState,useEffect } from "react";
import { Alert } from 'reactstrap';

const FileUploadConfirm=({setFileUploadConfirmModalIsOpen,uploadFile,selectedFile,progress,setSelectedFile})=>{
    let [isConfirmed,setIsConfirmed]=useState(false);
    let [fileList,setFileList]=useState()
    let [completeList,setCompleteList]=useState([])
    let [completeHTML,setCompleteHTML]=useState([])
    useEffect(()=>{
        let list=[]
        for(var i=0;i<selectedFile.length;i++){
            list.push(<h1>{i+1}.{selectedFile.at(i).name}</h1>)
        }
        setFileList([...list])
    },[selectedFile])

    useEffect(()=>{
        let list=[]
        for(var i=0;i<selectedFile.length;i++){
            list.push(<Alert color="secondary">{selectedFile.at(i).name}의 업로드가 완료되었습니다!</Alert>)
        }
        setCompleteHTML([...list])
    },[completeList])

    function sleep(sec) {
        return new Promise(resolve => setTimeout(resolve, sec * 1000));
      } 

    async function confirm(selectedFile){
        setIsConfirmed(true);
        console.log(selectedFile)
        for(var i=0;i<selectedFile.length;i++){
            uploadFile(selectedFile.at(i),completeList,setCompleteList)
            await sleep(1)
        }
    }

    function close(){
        setFileUploadConfirmModalIsOpen(false)
        setSelectedFile([]);
        setCompleteList([]);
        setCompleteHTML([]);
    }



    return(
        <div>
            <button className="modal-close" type="button" onClick={() => close()}>X</button>
            <div className="upload-modal-container">
            {fileList}
            <h1>을(를) 업로드 하시겠습니까?</h1>
            {isConfirmed===false?
                <button className="btn btn-secondary" onClick={()=>confirm(selectedFile)}>
                확인
                </button>
                :
                <div >
                <Alert color="secondary">업로드 비율: {progress}%</Alert>
                {/* {completeList} */}
                <button className="btn btn-secondary" onClick={()=>close()}>
                닫기
                </button>
                </div>
            }
            </div>
        </div>
    )
}
export default FileUploadConfirm;