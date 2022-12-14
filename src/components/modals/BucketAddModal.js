import { useState,useRef,useEffect } from "react"
import { FaUpload} from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";
import { SiBitbucket } from "react-icons/si";
import {putBucket} from "../../api/BucketAPI.js"
import { Slider } from "@material-ui/core";
import AWS from 'aws-sdk';
import { ACCESS_KEY, REGION, S3_BUCKET, SECRET_ACCESS_KEY } from '../../Config.js'
import Stomp from "stompjs";

const BucketAddModal=({setBucketMenu,departmentId,workspaceId,email,memberName,stomp})=>{
    const [inputTitle,setInputTitle]=useState("")
    const [selectedFile, setSelectedFile] = useState([]);
    const [fileList,setFileList]=useState([])
    const [drag,setDrag]=useState("")
    const inputRef = useRef(null);
    const [inputDetail,setInputDetail]=useState("")
    const [completeCount,setCompleteCount]=useState(0)
    const [complete,setComplete]=useState(false)
    const [isConfirmed,setIsConfirmed]=useState(false)
    const [urlList,setUrlList]=useState([])
    let count=0
    let url=[]

    let [bucketProgress, setBucketProgress] = useState(0);

    // console.log(bucketProgress)

    const handleSliderChange = (event, newValue) => {
        setBucketProgress(newValue);
    };

    const handleInputChange = (event) => {
        setBucketProgress(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (bucketProgress < 0) {
            setBucketProgress(0);
        } else if (bucketProgress > 100) {
            setBucketProgress(100);
        }
    };

    useEffect(()=>{
        let list=[]
        for(var i=0;i<selectedFile.length;i++){
            let index=i;
            list.push(<div className="added-file-div">
                <AiOutlineFileText style={{fontSize : '20px',float:'left'}}/>
                <div style={{width:"460px", color:'black', fontSize : '14px', float:'left', marginTop:'0.2px'}}>{selectedFile.at(i).name}</div>
                <div style={{color:'black', fontSize : '14px', float:'right', marginTop:'0.2px',marginRight:'5px',cursor:"pointer"}} onClick={()=>deleteFile(index)}>X</div>
            </div>)
        }
        setFileList([...list]);
    },[selectedFile])

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

    
        const params = {
            ACL: 'public-read',
            Body: file,
            ACL: AWS.config.acl,
            Bucket: S3_BUCKET,
            Key: key
        };
        
        myBucket.putObject(params)
        .send((err,data) => {
            if (err){ 
                alert("????????? ????????? ?????????????????????!")
            }
            else{
                url.push("https://"+S3_BUCKET+".s3."+REGION+".amazonaws.com/"+key)
                setUrlList([...url]);       
                count+=1;
                setCompleteCount(count);
            }
        })

    }
    function bucketUpload(){
        if(inputTitle.length===0){
            alert("????????? ???????????????!")
        }
        else if(fileList.length<1){
            alert("??? ??? ????????? ????????? ?????????????????????!")
        }
        else{
            setIsConfirmed(true)
            for(var i=0;i<selectedFile.length;i++){
                uploadFile(selectedFile.at(i),i)
            }
        }
    }

    function deleteFile(index){
        selectedFile.splice(index,1)
        setSelectedFile([...selectedFile])
    }

    const handleClick = () => {
        // ??????? open file input box on click of other element
        inputRef.current.click();
    };

    const handleFileInput = (e) => {
        if(selectedFile.length<5){
            setSelectedFile([...selectedFile,e.target.files[0]]);
            e.target.value=''
        }
        else{
            alert("?????? 5??? ???????????? ????????? ?????? ??? ????????????!")
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
            alert("?????? 5?????? ???????????? ????????? ?????? ??? ????????????!")
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
                        alert("????????? ????????? ?????? ??? ????????????!")
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
                            alert("????????? ????????? ?????? ??? ????????????!")          
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
            alert("50??? ????????? ??????????????????!")
        }
    }

    function setDetail(e){
        if(e.target.value.length<300){
            setInputDetail(e.target.value)
        }
        else{
            alert("300??? ????????? ??????????????????!")
        }
    }

    function uploadBucket(){
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let date = currentDate.getDate();
        let houres = String(currentDate.getHours()).padStart(2, "0");
        let minutes = String(currentDate.getMinutes()).padStart(2, "0");
        let seconds = String(currentDate.getSeconds()).padStart(2, "0");
        let currentTime = year + '-' + month + '-' + date + ' ' + houres + ':' + minutes + ':' + seconds;

        let request=Promise.resolve(putBucket(departmentId,workspaceId,currentTime,email,memberName,inputTitle,inputDetail,urlList,bucketProgress))

        request.then((value)=>{
            if(value===201){
                stomp.send('/pub/chat/message', {}, JSON.stringify({
                    departmentId: departmentId,
                    email: email,
                    content: memberName+"("+email+")"+" ?????? ?????? ????????? ????????? ???????????????",
                    contentType: -2,
                    date : currentTime
                }))         
                alert("???????????? ?????????????????????!")
                setBucketMenu(0)
            }
            else{
                alert("????????? ????????? ?????????????????????!")
                setBucketMenu(0)
            }
        })

    }
    
    if(isConfirmed&&completeCount===selectedFile.length){
        uploadBucket();
    }
    return(
        <>
        {!isConfirmed?
            null //????????? ????????? ???
            :complete?//????????? ????????? ?????? ??????????????????
            null
            :<div className="defence-wall">
                <SiBitbucket />
                <h3>????????? ???????????? {completeCount}/{selectedFile.length}...</h3>
            </div>//????????? ????????? ???????????? ??? ????????? ?????? ??????
        }
        <div>
            <div className='bucket-modal-menu-unselected' onClick={()=>setBucketMenu(0)}>?????? ??????</div>
            <div className='bucket-modal-menu'>?????? ?????????</div>
        </div>
            <div className="bucket-modal-container">
                <div style={{flexDirection:"row", marginTop:"30px"}}>
                <span style={{float:"left", marginLeft:"20px"}}>??????</span>
                <input type="text" placeholder="????????? ??????????????????" className="w-75 form-control bg-light" value={ inputTitle }
                onChange={e => setTitle(e)} style={{paddingBottom:"10px", marginLeft:"105px"}}/>
                </div>

                <div style={{flexDirection:"row", marginTop:"30px"}}>
                <input style={{display: 'none'}} ref={inputRef} type="file" onChange={handleFileInput}/>
                <span style={{ marginLeft:"20px"}}>??????</span><button className="btn btn-secondary" style={{marginLeft:"60px"}} onClick={handleClick}>PC</button>                   
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
                    <span style={{float:"left" , marginLeft:"20px"}}>????????????</span>
                    <textarea style={{resize: 'none', float:"left", height:"160px",marginLeft:"30px"}} type="text" placeholder="????????? ??????????????????" className="w-75 form-control bg-light" onChange={e => setDetail(e)}/>
                </div>
                
                <div className="slider-bard-container">
                    <div style={{float:"left" , marginLeft:"20px"}}>?????????</div>
                    <Slider
                        style={{float:"left", width:'498px', height:'10px', marginLeft:'45px'}}

                        value={typeof bucketProgress === 'number' ? bucketProgress : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"

                        size="small"
                        defaultValue={0}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        color="secondary"
                    />
                    <input
                        style={{width:'50px', fontWeight:'500' , fontSize:'14px', border:'none', marginLeft:'5px', color:'red'}}
                        value={bucketProgress}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        type="number"
                    />
                </div>

                <div>
                    <button className="btn btn-danger" style={{float:"right", marginRight:"61px"}} onClick={()=>bucketUpload()}>?????? ?????????</button>
                </div>
            </div>
        </>
    )
}

export default BucketAddModal;