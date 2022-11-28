import { useState,useEffect } from "react"
import DepartmentSelectionContainer from "./DepartmentSelectionContainer"
import JSZip from "jszip"
import FileSaver from "file-saver"

const BucketZipDownloadModal=({setBucketZipDownloadModalIsOpen,fileList,workspaceName})=>{
    const [checkList,setCheckList]=useState([])
    const [departmentList,setDepartmentList]=useState([])
    let checkedList=[]
    let wholeSize=0;
    useEffect(()=>{
        console.log(fileList)
        let list=[]
        for(var i=0;i<fileList.length;i++){
            list.push(true);
        }
        checkedList=[...list]
        setCheckList([...list])
        let departmentContainer=[]
        
        for(var i=0;i<fileList.length;i++){
            let files=[]
            for(var j=0;j<fileList[i][1].length;j++){
                files.push(<p>{fileList[i][1][j].substring(fileList[i][1][j].lastIndexOf("/")+1)}</p>)
            }
            departmentContainer.push(
                <DepartmentSelectionContainer
                    departmentName={fileList[i][0]}
                    fileList={files}
                    setChecked={setChecked}
                    index={i}
                />
            )
        }
        setDepartmentList([...departmentContainer])

    },[])

    function setChecked(index){
        checkedList[index]=!checkedList[index]
        setCheckList([...checkedList])
    }

    function downloadZip(){
        let list=[]
        console.log(checkList)
        for(var i=0;i<checkList.length;i++){
            if(checkList[i]===true){
                list.push([fileList[i][0],fileList[i][1]]);
                wholeSize+=fileList[i][1].length;
            }
        }
        if(wholeSize===0){
            alert("한 개 이상의 부서를 포함해 주세요!")
            return;
        }
        var zip = new JSZip();
        var count = 0;

        for(var i=0;i<list.length;i++){
            for(var j=0;j<list[i][1].length;j++){
                const url = list[i][1][j]
                const departmentName=list[i][0]
                const fileName = url.substring(url.lastIndexOf('/')+1)
                fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const file=new File([blob], {fileName}, {
                        type: blob.type})
                    zip.folder(departmentName).file(fileName,file);
                }).then(file=>{
                    count+=1
                    if(count==wholeSize){
                        zip.generateAsync({type:"blob"}) //압축파일 생성
                    .then((resZip) => {
                        console.log(resZip)
                        FileSaver(resZip, workspaceName+".zip"); //file-saver 라이브러리 사용
                        const url = URL.createObjectURL(resZip); //객체 URL 생성
                        const aTag = document.createElement('a');
                        aTag.download = workspaceName+".zip"; //저장될 파일 이름
                        aTag.href= url;
                    })}
                    })
            }
        }

    }

    return(
        <div>
            <button className="modal-close" type="button" onClick={() => setBucketZipDownloadModalIsOpen(false)}>X</button>
            <div className="download-modal-container">
            <h1>제출물 폴더에</h1>
            <h1>포함하고 싶은 부서를</h1>
            <h1>선택해 주세요!</h1>

            <div className="download-modal-departmentList-container">
                {departmentList}
            </div>
            <button className="btn btn-secondary" onClick={()=>downloadZip()}>
                다운로드
            </button>
            </div>
        </div>
    )
}
export default BucketZipDownloadModal