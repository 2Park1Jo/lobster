import { useState,useRef,useEffect } from "react"
import { FaUpload} from "react-icons/fa";
import { uploadFiles } from "../../utils/FileUpload"
import BucketAddModal from "./BucketAddModal";
const BucketModal=({setBucketModalIsOpen})=>{
    const [bucketMenu,setBucketMenu]=useState(0)
    const [inputTitle,setInputTitle]=useState("")
    const [selectedFile, setSelectedFile] = useState([]);
    const [fileList,setFileList]=useState([])
    const [drag,setDrag]=useState("")
    const inputRef = useRef(null);

    // useEffect(()=>{

    // },[selectedFile])

    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };

    const handleFileInput = (e) => {
        if(selectedFile.length<5){
            setSelectedFile([...selectedFile,e.target.files[0]]);
        }
    }

    function containsFiles(event) {
        if (event.dataTransfer.types) {
            for (var i=0; i<event.dataTransfer.types.length; i++) {
                if (event.dataTransfer.types[i] == "Files") {
                    return true;
                }
            }
        }
        
        return false;
    }

    function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        setDrag(false)
    
        // var files = e.dataTransfer.files;
        // if(files.length>5){
        //     alert("한번에 최대 5개의 파일까지 업로드 하실 수 있습니다!")
        //     return
        // }
        // else{
        //     let files = e.dataTransfer ? e.dataTransfer.files : 'null';
        //     setIsContainFolder(false)
        //     let list=[]
        //     console.log(files.length)
        //     for(let i=0, file; file = files[i]; i++) {
        //         var reader = new FileReader();

        //         reader.onerror = function (e) {
        //             setIsContainFolder(true)
        //             // alert("거부된 파일명 :"+file.name+"\n폴더는 업로드 하실 수 없습니다!")
        //         };

        //         reader.onload=function(e){
        //             list.push(file)
        //             setSelectedFile([...list]);

        //             console.log("file")
        //             if(i===files.length-1&&!isContainFolder){
        //                 setFileUploadConfirmModalIsOpen(true)
        //             }
        //         }

        //         reader.readAsText(file);
        //     }
        //     if(isContainFolder){
        //         alert("폴더는 업로드 하실 수 없습니다!")          
        //     }
        // }
    }
    

    function handleDragEnter(e) {
        e.preventDefault();
        if (containsFiles(e)) {
            setDrag(true)
        } else {
            setDrag(false)
        }
    }

    return(
        <div>
            <button className="modal-close" type="button" onClick={() => setBucketModalIsOpen(false)}>X</button>
            {bucketMenu===0?
            <>
                <div>
                        <div className='bucket-modal-menu'>버켓 내역</div>
                        <div className='bucket-modal-menu-unselected' onClick={()=>setBucketMenu(1)}>버켓 최신화</div>
                </div>
                <div className="bucket-modal-container">
                </div>
            </>
            :
            <>
                <BucketAddModal setBucketMenu={setBucketMenu}/>
            </>
            }
        </div>
    )
}
export default BucketModal