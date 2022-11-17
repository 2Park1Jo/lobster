import { useState } from "react";
import { Alert } from 'reactstrap';

const FileUploadConfirm=({setFileUploadConfirmModalIsOpen,uploadFile,selectedFile,progress,setSelectedFile})=>{
    let [isConfirmed,setIsConfirmed]=useState(false);
    function confirm(selectedFile){
        uploadFile(selectedFile);
        setIsConfirmed(true);
    }

    function close(){
        setFileUploadConfirmModalIsOpen(false)
        setSelectedFile(null);
    }

    return(
        <div>
            <button className="modal-close" type="button" onClick={() => close()}>X</button>
            <div className="upload-modal-container">
            <h1>{selectedFile? selectedFile.name:"qwer"}을(를) 업로드 하시겠습니까?</h1>
            {isConfirmed===false?
                <button className="btn btn-primary" onClick={()=>confirm(selectedFile)}>
                확인
                </button>
                :
                <div >
                <Alert color="primary">업로드 진행률 : {progress}%</Alert>
                <button className="btn btn-primary" onClick={()=>close()}>
                닫기
                </button>
                </div>
            }
            </div>
        </div>
    )
}
export default FileUploadConfirm;