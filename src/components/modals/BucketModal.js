import { useState,useRef } from "react"
import { uploadFiles } from "../../utils/FileUpload"
const BucketModal=({setBucketModalIsOpen})=>{
    let [bucketMenu,setBucketMenu]=useState(0)
    let [inputTitle,setInputTitle]=useState("")
    let [fileList,setFileList]=useState([])
    const inputRef = useRef(null);

    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };
    const handleFileInput = (e) => {
        if(fileList.length<5){
            
            setFileList([...fileList,e.target.files[0]])
            console.log(fileList)
        }
        else{
            alert("최대 5개의 파일만 업로드 하실 수 있습니다!")
        }
    }
    return(
        <div>
            <button className="modal-close" type="button" onClick={() => setBucketModalIsOpen(false)}>X</button>
            {bucketMenu===0?
            <>
                <div>
                        <div className='bucket-menu'>버켓 내역</div>
                        <div className='bucket-menu-unselected' onClick={()=>setBucketMenu(1)}>버켓 최신화</div>
                </div>
                <div className="bucket-modal-container">
                </div>
            </>
            :
            <>
                <div>
                        <div className='bucket-menu-unselected' onClick={()=>setBucketMenu(0)}>버켓 내역</div>
                        <div className='bucket-menu'>버켓 최신화</div>
                </div>
                <div className="bucket-modal-container">
                    <span>제목</span>
                    <input type="text" placeholder="제목을 입력해주세요" className="form-control bg-light" value={ inputTitle }
                    onChange={e => setInputTitle(e.target.value)} style={{paddingBottom:"10px"}}/>
                    <input style={{display: 'none'}} ref={inputRef} type="file" onChange={handleFileInput}/>
                    <span>파일</span><button onClick={handleClick}>PC</button>

                </div>
            </>
            }
        </div>
    )
}
export default BucketModal