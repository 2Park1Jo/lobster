import { useState,useRef,useEffect } from "react"
import { FaUpload} from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";
import { SiBitbucket } from "react-icons/si";
import AWS from 'aws-sdk';
import { ACCESS_KEY, REGION, S3_BUCKET, SECRET_ACCESS_KEY } from '../../Config.js'
const BucketAddModal=({setBucketMenu})=>{
    const [inputTitle,setInputTitle]=useState("")
    const [selectedFile, setSelectedFile] = useState([]);
    const [fileList,setFileList]=useState([])
    const [drag,setDrag]=useState("")
    const inputRef = useRef(null);
    const [inputDetail,setInputDetail]=useState("")
    const [completeCount,setCompleteCount]=useState(0)
    const [complete,setComplete]=useState(false)
    const [isConfirmed,setIsConfirmed]=useState(false)
    let a=0

    useEffect(()=>{
        let list=[]
        for(var i=0;i<selectedFile.length;i++){
            let index=i;
            list.push(<div className="added-file-div">
                <AiOutlineFileText style={{fontSize : '20px',float:'left'}}/>
                <div style={{color:'black', fontSize : '14px', float:'left', marginTop:'0.2px'}}>{selectedFile.at(i).name}</div>
                <div style={{color:'black', fontSize : '14px', float:'right', marginTop:'0.2px',marginRight:'5px',cursor:"pointer"}} onClick={()=>deleteFile(index)}>X</div>
            </div>)
        }
        setFileList([...list]);
    },[selectedFile])

    useEffect(()=>{
        console.log(completeCount)
    },[completeCount])

    AWS.config.update({
        accessKeyId:ACCESS_KEY,
        secretAccessKey:SECRET_ACCESS_KEY
    });
    
    const myBucket=new AWS.S3({
        params:{Bucket: S3_BUCKET},
        region: REGION
    });
    const uploadFile = (file,i) => {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let date = currentDate.getDate();
        let houres = String(currentDate.getHours()).padStart(2, "0");
        let minutes = String(currentDate.getMinutes()).padStart(2, "0");
        let seconds = String(currentDate.getSeconds()).padStart(2, "0");
        let currentTime = year + '-' + month + '-' + date + ' ' + houres + ':' + minutes + ':' + seconds;
        let key=("bucket/"+currentTime+"/"+ file.name).replace(/ /g, '')
        let contentType;


    
        const params = {
            ACL: 'public-read',
            Body: file,
            ACL: AWS.config.acl,
            Bucket: S3_BUCKET,
            Key: key
        };
        
        // myBucket.putObject(params)
        // .send((err,data) => {
        //     if (err){ console.log(err)
        //         alert("서버에 에러가 발생하였습니다!")
        //     }
        //     else{
        //         if(file.type.indexOf("image")===-1){
        //                     contentType=1
        //                   }
        //                 else{
        //                     contentType=2
        //                   }
        //                 // stomp.send('/pub/chat/message', {}, JSON.stringify({
        //                 //     departmentId: localStorage.getItem('accessedDepartmentId'),
        //                 //     email: localStorage.getItem('loginMemberEmail'),
        //                 //     content: file.name,
        //                 //     contentType: contentType,
        //                 //     date : currentTime,
        //                 //     link:"https://"+S3_BUCKET+".s3."+REGION+".amazonaws.com/"+key
        //                 //  }))
                        
                        
        //     }
        //   })
        setTimeout(() => {
            a+=1
            setCompleteCount(a)
        }, 1000*(i+1));

    }
    function bucketUpload(){
        if(inputTitle.length===0){
            alert("제목은 필수입니다!")
        }
        else{
            setIsConfirmed(true)
            for(var i=0;i<selectedFile.length;i++){
                uploadFile(selectedFile.at(i),i)
            }
        }
    }

    function deleteFile(index){
        console.log(index)
        selectedFile.splice(index,1)
        setSelectedFile([...selectedFile])
    }

    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };

    const handleFileInput = (e) => {
        if(selectedFile.length<5){
            setSelectedFile([...selectedFile,e.target.files[0]]);
            e.target.value=''
        }
        else{
            alert("최대 5개 파일까지 업로드 하실 수 있습니다!")
        }
    }

    function containsFiles(event) {
        if (event.dataTransfer.types) {
            for (var i=0; i<event.dataTransfer.types.length; i++) {
                if (event.dataTransfer.types[i] === "Files") {
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

    
        var files = e.dataTransfer.files;
        if(files.length+selectedFile.length>5){
            alert("최대 5개의 파일까지 업로드 하실 수 있습니다!")
            return
        }
        else{
            let files = e.dataTransfer ? e.dataTransfer.files : 'null';
            let list=[]
            let count=0
            for(let i=0, file; file = files[i]; i++) {
                var reader = new FileReader();

                reader.onerror=function(e){
                    count++
                    if(count===files.length){
                        alert("폴더는 업로드 하실 수 없습니다!")
                    }
                }

                reader.onload=function(e){
                    list.push(file)
                }

                reader.onloadend=function(e){
                    count++
                    if(count===files.length){
                        if(list.length===files.length){
                            setSelectedFile([...selectedFile].concat(list));
                        }
                        else{
                            alert("폴더는 업로드 하실 수 없습니다!")          
                        }
                    }
                }

                reader.readAsText(file);
            }
        }
    }
    

    function handleDragEnter(e) {
        e.preventDefault();
        if (containsFiles(e)) {
            setDrag(true)
        } else {
            setDrag(false)
        }
    }

    function setTitle(e){
        if(e.target.value.length<50){
            setInputTitle(e.target.value)
        }
        else{
            alert("50자 이하로 입력해주세요!")
        }
    }

    function setDetail(e){
        if(e.target.value.length<300){
            setInputDetail(e.target.value)
        }
        else{
            alert("300자 이하로 입력해주세요!")
        }
    }
    if(isConfirmed&&completeCount===selectedFile.length){
        setTimeout(() => {
            setComplete(true)
            alert("업로드가 완료되었습니다!")
            setBucketMenu(0)
        }, 500);
    }
    return(
        <>
        {!isConfirmed?
            null //업로드 누르기 전
            :complete?//업로드 누르고 나서 완료되었으면
            null
            :<div className="defence-wall">
                <SiBitbucket />
                <h3>업로드 중입니다 {completeCount}/{selectedFile.length}...</h3>
            </div>//업로드 누르고 완료되기 전 사용자 클릭 막기
        }
        <div>
            <div className='bucket-modal-menu-unselected' onClick={()=>setBucketMenu(0)}>버켓 내역</div>
            <div className='bucket-modal-menu'>버켓 최신화</div>
        </div>
            <div className="bucket-modal-container">
                <div style={{flexDirection:"row", marginTop:"30px"}}>
                <span style={{float:"left", marginLeft:"20px"}}>제목</span>
                <input type="text" placeholder="제목을 입력해주세요" className="w-75 form-control bg-light" value={ inputTitle }
                onChange={e => setTitle(e)} style={{paddingBottom:"10px", marginLeft:"105px"}}/>
                </div>

                <div style={{flexDirection:"row", marginTop:"30px"}}>
                <input style={{display: 'none'}} ref={inputRef} type="file" onChange={handleFileInput}/>
                <span style={{ marginLeft:"20px"}}>파일</span><button className="btn btn-secondary" style={{marginLeft:"60px"}} onClick={handleClick}>PC</button>                   
                <div className="bucket-modal-file-container" onDrop={e=>handleDrop(e)} onDragLeave={()=>setDrag(false)} onDragOver={e=>handleDragEnter(e)}>
                    {drag===true?
                        <div className='bucket-modal-fileDraged'><FaUpload /></div>
                        :<></>}
                    <div className="bucket-modal-file-list">
                        {fileList}
                    </div>
                </div>
                </div>
                
                <div style={{flexDirection:"row"}}>
                <span style={{float:"left" , marginLeft:"20px"}}>세부사항</span>
                <textarea style={{resize: 'none', float:"left", height:"200px",marginLeft:"30px"}} type="text" placeholder="내용을 입력해주세요" className="w-75 form-control bg-light" onChange={e => setDetail(e)}/>
                </div>
                <div>
                <button className="btn btn-danger" style={{float:"right", marginTop:"20px", marginRight:"61px"}} onClick={()=>bucketUpload()}>버킷 업로드</button>
                </div>
            </div>
        </>
    )
}

export default BucketAddModal;