import './Workspace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberCard from '../components/workspace/MemberCard';
import DepartmentAddModal from '../components/modals/DepartmentAddModal'
import DepartmentMemberAddModal from '../components/modals/DepartmentMemberAddModal';
import DepartmentModifyModal from '../components/modals/DepartmentModifyModal';
import WorkspaceMemberAdd from '../components/modals/WorkspaceMemberAdd';
import FileUploadConfirm from '../components/modals/FileUploadConfirm';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { useRecoilState } from "recoil";

import { getWorkspaceMemberData, getWorkspaceData } from '../api/WorkspaceAPI';
import { getDepartmentMemberData, getChattingData, getDepartments } from '../api/DepartmentAPI';

import { ACCESSED_DEPARTMENT, WORKSPACE_ID } from '../recoil/Atoms';

import MemberList from '../components/workspace/MemberList';
import DepartmentList from '../components/workspace/DepartmentList';
import ChatBox from '../components/workspace/chat/ChatBox';
import ChatInputBox from '../components/workspace/chat/ChatInputBox';
import ImgList from '../components/workspace/ImgList';
import FileList from '../components/workspace/FileList';

import { WorkspaceModel } from '../models/model/Workspace';
import { WorkspaceViewModel } from '../models/view-model/WorkspaceViewModel';
import { WorkspaceMember } from '../models/model/WorkspaceMember';
import { WorkspaceMemberViewModel } from '../models/view-model/WorkspaceMemberViewModel';
import { DepartmentViewModel } from '../models/view-model/DepartmentViewModel';
import { DepartmentMember } from '../models/model/DepartmentMember';
import { DepartmentMemberViewModel } from '../models/view-model/DepartmentMemberViewModel';
import { Chat } from '../models/model/Chat';
import { ChatViewModel } from '../models/view-model/ChatViewModel';
import { Department } from '../models/model/Department';

import { FaPowerOff, FaUpload} from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";
import { BiChevronsDown,BiChevronsUp,BiUserPlus } from "react-icons/bi";
import {SiBitbucket} from "react-icons/si";
import {MdOutlineWork, MdSensorDoor} from "react-icons/md";

import { ListGroup } from 'react-bootstrap';
import Bucket from '../components/workspace/Bucket';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { BACK_BASE_URL,ACCESS_KEY,SECRET_ACCESS_KEY,S3_BUCKET,REGION } from '../Config';
import { Last } from 'react-bootstrap/esm/PageItem';
import AWS from 'aws-sdk';


const workspace = new WorkspaceModel();
const workspaceViewModel = new WorkspaceViewModel(workspace);

const workspaceMember = new WorkspaceMember();
const workspaceMemberViewModel = new WorkspaceMemberViewModel(workspaceMember);

const department = new Department();
const departmentViewModel = new DepartmentViewModel(department);

const departmentMember = new DepartmentMember();
const departmentMemberViewModel = new DepartmentMemberViewModel(departmentMember);

const chat = new Chat();
const chatViewModel = new ChatViewModel(chat);

let stomp;

const Workspace = function () {
    const messageEndRef = useRef(null); // 채팅메세지의 마지막
    // let loginMember = useRecoilValue(LOGIN_MEMBER);
    let [accessedDepartment, setAccessedDepartment] = useRecoilState(ACCESSED_DEPARTMENT);
    let [workspaceId, setWorkspaceId] = useRecoilState(WORKSPACE_ID);

    let [isReceivedWorkspace, setIsReceivedWorkspace] = useState(false);

    let [modalIsOpen, setModalIsOpen] = useState(false);
    let [modal2IsOpen, setModal2IsOpen] = useState(false); 
    let [dpModifyModalIsOpen, setdpModifyModalIsOpen] = useState(false);  
    let [WorkspaceMemberAddModalIsOpen,setWorkspaceMemberAddModalIsOpen]=useState(false); 
    let [FileUploadConfirmModalIsOpen,setFileUploadConfirmModalIsOpen]=useState(false);
    let [drag,setDrag]=useState("")
    let [chatUpdateState, setChatUpdateState] = useState("");
    let [departmentUpdateState, setDepartmentUpdateState] = useState("");
    let [dpMemberUpdateState, setDpMemberUpdateState] = useState("");
    let [workspaceMemberUpdateState, setWorkspaceMemberUpdateState] = useState("");

    let [isShowDPmemberList,setIsShowDPmemberList]=useState(true);
    let [selectedMenu,setSelectedMenu]=useState(1);

    let [departmentIdList, setDepartmentIdList] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress , setProgress] = useState(0);

    let [isShowFileList, setIsShowFileList]=useState(false);
    let [fileList, setFileList] = useState([]);
    let [imgList, setImgList] = useState([]);
    let [fileClassification, setFileClassification] = useState('file');
    let [fileSearch, setFileSearch] = useState('');

    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('accessedDepartmentId', location.pathname.split('department/')[1].replace("%20", " "))
        setAccessedDepartment({
            id: localStorage.getItem('accessedDepartmentId'),
            name: departmentViewModel.getName(localStorage.getItem('accessedDepartmentId'))
        })
    }, [ location ])
    
    useEffect( () => {     
        getWorkspaceData(localStorage.getItem('loginMemberEmail'))
        .then(
            (res) => {
                workspaceViewModel.update(res);
                setWorkspaceId(localStorage.getItem('accessedWorkspaceId'))
                setIsReceivedWorkspace(true)
            }
        )

        stomp = Stomp.over(new SockJS(BACK_BASE_URL + "chat"));
        stomp.connect({}, onConnected, (error) => {
            console.log('sever error : ' + error );
        });
    },[])

    useEffect( () => {
        if (stomp.connected){
            if (departmentIdList.length > 0){
                if (departmentIdList.length !== stomp.counter - 2){
                    stomp.subscribe("/sub/chat/department/" + departmentIdList[departmentIdList.length - 1], function (chat) {
                        let result = JSON.parse(chat.body);
                        if (chatUpdateState !== result.body){
                            setChatUpdateState(result.content);
                        }
                        if (result.contentType === "-1"){ // invite
                            setChatUpdateState(result.content);
                            setDpMemberUpdateState(result.content);
                        }
                    });
                }
            }
        }
        else{
            stomp.connect({}, onConnected, (error) => {
                console.log('sever error : ' + error );
            });
        }
    }, [departmentIdList])

    useEffect( () => {
        getChattingData(localStorage.getItem('accessedDepartmentId'))
        .then(
            (res) => {
                if (res.length > 0){
                    let files = chatViewModel.getFiles(localStorage.getItem('accessedDepartmentId'))
                    let imgs = chatViewModel.getImgs(localStorage.getItem('accessedDepartmentId'))

                    chatViewModel.update(res);
                    if (fileList.length !== files.length){
                        setFileList(files)
                    }
                    if (imgList.length !== imgs.length){
                        setImgList(imgs)
                    }
                    setChatUpdateState(res.at(Last).chatId);
                }
            }
        )
    }, [chatUpdateState, accessedDepartment])

    useEffect( () => {
        getDepartments(localStorage.getItem('accessedWorkspaceId'),localStorage.getItem('loginMemberEmail'))
        .then(
            (res) => {
                departmentViewModel.update(res);
                setAccessedDepartment({
                    id: localStorage.getItem('accessedDepartmentId'),
                    name: departmentViewModel.getName(localStorage.getItem('accessedDepartmentId'))
                })
                setDepartmentIdList(departmentViewModel.getIdList(localStorage.getItem('accessedWorkspaceId')))
                setDepartmentUpdateState(res.at(Last).departmentId)
            }
        )
    }, [departmentUpdateState])

    useEffect( () => {
        getDepartmentMemberData(localStorage.getItem('accessedDepartmentId'))
        .then(
            (res) => {
                departmentMemberViewModel.update(res);
                setDpMemberUpdateState(res.at(Last).departmentId)
            }
        )
    }, [dpMemberUpdateState, accessedDepartment])

    useEffect( () => {
        getWorkspaceMemberData(localStorage.getItem('accessedWorkspaceId') )
        .then(
            (res) => {
                workspaceMemberViewModel.update(res);
                setWorkspaceMemberUpdateState(res.at(Last).workspaceId)
            }
        )
    }, [workspaceMemberUpdateState])

    useEffect(()=>{
        console.log(drag)
    },[drag])

    function onConnected() {
        if (stomp.connected){
            // chat 
            for (let index = 0; index < departmentIdList.length; index++){
                stomp.subscribe("/sub/chat/department/" + departmentIdList[index], function (chat) {
                    let result = JSON.parse(chat.body);
                    if (chatUpdateState !== result.body){
                        setChatUpdateState(result.content);
                    }
                    if (result.contentType === "-1"){ // invite
                        setChatUpdateState(result.content);
                        setDpMemberUpdateState(result.content);
                    }
                });
            }

            //dp add
            stomp.subscribe("/sub/chat/workspace/" + localStorage.getItem('accessedWorkspaceId'), function (data) {
                let result = JSON.parse(data.body);
                setDepartmentUpdateState(result.content);
            });

            stomp.subscribe("/sub/chat/workspace", function (data) {
                let result = data.body;
                setWorkspaceMemberUpdateState(result.content);
            });

            stomp.send('/pub/chat/enter', {}, JSON.stringify({departmentId: localStorage.getItem('accessedDepartmentId'), email: localStorage.getItem('loginMemberEmail')}))
        }
    }
    
    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function logout(){
        localStorage.clear();
        navigate('/')
    }

    const inputRef = useRef(null);

    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };

    AWS.config.update({
        accessKeyId:ACCESS_KEY,
        secretAccessKey:SECRET_ACCESS_KEY
    });
    
    const myBucket=new AWS.S3({
        params:{Bucket: S3_BUCKET},
        region: REGION
    });

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        // if(file.type !== 'image/jpeg' || fileExt !=='jpg'){
        //   alert('jpg 파일만 Upload 가능합니다.');
        //   return;
        // }
        setProgress(0);
        setSelectedFile(e.target.files[0]);
        setFileUploadConfirmModalIsOpen(true)
    }

    const uploadFile = async (file) => {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let date = currentDate.getDate();
        let houres = String(currentDate.getHours()).padStart(2, "0");
        let minutes = String(currentDate.getMinutes()).padStart(2, "0");
        let seconds = String(currentDate.getSeconds()).padStart(2, "0");
        let currentTime = year + '-' + month + '-' + date + ' ' + houres + ':' + minutes + ':' + seconds;
        let key=("upload/"+currentTime+"/"+ file.name).replace(/ /g, '')
        let contentType;

        const params = {
            ACL: 'public-read',
            Body: file,
            ACL: AWS.config.acl,
            Bucket: S3_BUCKET,
            Key: key
        };
        
        myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err,data) => {
            if (err){ console.log(err)
                alert("서버에 에러가 발생하였습니다!")
                return;
            }
            else{
                if(file.type.indexOf("image")===-1){
                    contentType=1
                }
                else{
                    contentType=2
                }

                stomp.send('/pub/chat/message', {}, JSON.stringify({
                    departmentId: localStorage.getItem('accessedDepartmentId'),
                    email: localStorage.getItem('loginMemberEmail'),
                    content: decodeURI(encodeURI(file.name)), 
                    contentType: contentType,
                    date : currentTime,
                    link:"https://"+S3_BUCKET+".s3."+REGION+".amazonaws.com/"+key
                }))
            }
        })
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
    
        var files = e.dataTransfer.files;
        if(files.length>1){
            alert("한번에 1개의 파일만 업로드 하실 수 있습니다!")
            return
        }
        for (var i = 0, f; f = files[i]; i++) { // iterate in the files dropped
            if (f.type=="") {
                alert(f.name+"\n해당 파일은 지원하지 않는 형식입니다!")
            } else {
                console.log("file")
                setSelectedFile(f);
                setFileUploadConfirmModalIsOpen(true)
                
            }
            console.log(f.name)
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
    // if(isReceivedWorkspace && isReceivedDepertment && isReceivedDepertmentMember && isReceivedWorkspaceMember && isReceivedChat){
        return(
            <div className="maincontainer">
                <div className='first-col'>
                    <div className='first-col-Button'>
                        {selectedMenu===1?
                            <MdOutlineWork style={{color:'white'}} onClick={()=>setSelectedMenu(1)}/>
                            :
                            <MdOutlineWork className='menu-unselected' onClick={()=>setSelectedMenu(1)}/>
                        }
                    </div>
                    <div className='first-col-Button'>
                        {selectedMenu===2?
                            <SiBitbucket style={{color:'white'}} onClick={()=>setSelectedMenu(2)}/>
                            :
                            <SiBitbucket className='menu-unselected' onClick={()=>setSelectedMenu(2)}/>
                        }
                    </div>
                </div>
                {selectedMenu===1?
                    <div className='contents-container'>
                        <div className='second-col'>
                            <div className='second-col-WorkspaceInfo'>
                                <span className='workspace-name'>{ workspaceViewModel.getName(localStorage.getItem('accessedWorkspaceId') ) }</span>
                            </div>
                            <div className='second-col-container'>
                                <div className='second-col-UserInfo'>
                                    <ListGroup variant='flush'>
                                        <MemberCard 
                                            profilePicture='https://therichpost.com/wp-content/uploads/2020/06/avatar2.png'
                                            name={departmentMemberViewModel.getMemberName(localStorage.getItem('loginMemberEmail'))}
                                            email={localStorage.getItem('loginMemberEmail')}
                                            onClicked={() => alert(departmentMemberViewModel.getMemberName(localStorage.getItem('loginMemberEmail')))}
                                        />
                                    </ListGroup>
                                </div>
                            
                                <div className='container-top' style={{backgroundColor:'#E0E0E0'}}>
                                    <p>그룹 <MdPostAdd className="setting" onClick={()=> setModalIsOpen(true)}/> </p>
                                    <Modal ariaHideApp={false} isOpen= {modalIsOpen} style={modalStyles} onRequestClose={() => setModalIsOpen(false)}>
                                        <DepartmentAddModal 
                                            modalIsOpen={modalIsOpen} 
                                            setModalIsOpen={setModalIsOpen}
                                            workspaceMembers={workspaceMemberViewModel.getMembers(localStorage.getItem('accessedWorkspaceId') )}
                                            loginMemberName={departmentMemberViewModel.getMemberName(localStorage.getItem('loginMemberEmail'))}
                                            stomp = {stomp}
                                        />
                                    </Modal>
                                </div>

                                <div className='second-col-DPList'>
                                    <DepartmentList
                                        workspaceId = {localStorage.getItem('accessedWorkspaceId') }
                                        departments = {departmentViewModel.get(localStorage.getItem('accessedWorkspaceId') )}
                                    />
                                </div>

                                <div className='container-top'style={{backgroundColor:'#E0E0E0'}}>
                                    <p>멤버 <BiUserPlus className="setting" onClick={()=> setWorkspaceMemberAddModalIsOpen(true)}/> </p>
                                    <Modal ariaHideApp={false} isOpen= {WorkspaceMemberAddModalIsOpen} style={modalStyles} onRequestClose={() => setWorkspaceMemberAddModalIsOpen(false)}>
                                        <WorkspaceMemberAdd 
                                            setWorkspaceMemberAddModalIsOpen={setWorkspaceMemberAddModalIsOpen}
                                            workspaceId={localStorage.getItem('accessedWorkspaceId')}
                                            workspaceMembers={workspaceMemberViewModel.getMembers(localStorage.getItem('accessedWorkspaceId'))}
                                            stomp={stomp}
                                            />
                                    </Modal>
                                </div>

                                <div className='second-col-WholeMemberList'>
                                    <MemberList 
                                        members = {workspaceMemberViewModel.getMembers(localStorage.getItem('accessedWorkspaceId')).filter(member => member.email !== localStorage.getItem('loginMemberEmail'))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='third-col'>
                            <div className='third-col-DepartmentInfo'>
                                <span className='department-name'>{ accessedDepartment.name } </span>
                                <div className='department-goal'>{ departmentViewModel.getGoal(localStorage.getItem('accessedDepartmentId')) }</div>
                            </div>
                            <div onDrop={e=>handleDrop(e)} onDragLeave={()=>setDrag(false)} onDragOver={e=>handleDragEnter(e)}>
                                <div className='third-col-ChatContainer'>
                                        {drag===true?
                                            <div className='third-col-fileUpload'><FaUpload /></div>
                                            :<></>}
                                        <div className='third-col-ChatList'>
                                            <ChatBox
                                                departmentMemberViewModel = {departmentMemberViewModel}
                                                chatViewModel = {chatViewModel}
                                                departmentId = {localStorage.getItem('accessedDepartmentId')}
                                                loginMemberEmail = {localStorage.getItem('loginMemberEmail')}
                                                chats = {chatViewModel.getChats(localStorage.getItem('accessedDepartmentId'))}//chatViewModel.getChats(accessedDepartmentId)
                                                messageEnd = {messageEndRef}
                                            />
                                        </div>
                                        <div className='third-col-ChatInput'>
                                            <ChatInputBox 
                                            chatViewModel = {chatViewModel}
                                            departmentId = {localStorage.getItem('accessedDepartmentId')}
                                            chatUpdateState = {chatUpdateState}
                                            setChatUpdateState = {setChatUpdateState}
                                            messageEnd = {messageEndRef}
                                            stomp = {stomp}
                                            />
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className='fourth-col-container'>
                            <div className='fourth-col-DepartmentInfo'>
                                <span className='department-deadline'>{ departmentViewModel.getDeadLine(localStorage.getItem('accessedDepartmentId')) }</span>
                                <FaPowerOff className='setting' style={{marginLeft:'10px'}} onClick={()=> logout()}/>
                                <BsGearFill className='setting' style={{marginLeft:'10px'}} onClick={()=> setdpModifyModalIsOpen(true)}/>
                                    <Modal isOpen= {dpModifyModalIsOpen} style={modalStyles} onRequestClose={() => setdpModifyModalIsOpen(false)}>
                                        <DepartmentModifyModal departmentName={accessedDepartment.name} departmentGoal={departmentViewModel.getGoal(localStorage.getItem('accessedDepartmentId'))} departmentDeadLine={departmentViewModel.getDeadLine(localStorage.getItem('accessedDepartmentId'))} setdpModifyModalIsOpen={setdpModifyModalIsOpen}/>
                                    </Modal>
                                <MdSensorDoor className='setting' onClick={()=> navigate('/workspacebanner')}/>
                                <div className='department-dday'>{ departmentViewModel.getDDay(localStorage.getItem('accessedDepartmentId')) }</div>
                            </div>

                            <div className='fourth-col'>

                                <div className='fourth-col-DPMemberListContainer'>
                                    <div className='container-top'>
                                        <div style={{float:'left', color:'white'}}>참여자 ({departmentMemberViewModel.getMembers(localStorage.getItem('accessedDepartmentId')).length})</div>
                                        
                                        <div style={{float:'right'}} onClick={()=>setIsShowDPmemberList(!isShowDPmemberList)}>{
                                            isShowDPmemberList===true?
                                            <BiChevronsDown className='arrow'/>
                                            :
                                            <BiChevronsUp className='arrow'/>
                                        }</div>
                                        <BiUserPlus style={{float:'right'}} className="arrow" onClick={()=> setModal2IsOpen(true)}/>
                                        <Modal ariaHideApp={false} isOpen= {modal2IsOpen} style={modalStyles} onRequestClose={() => setModal2IsOpen(false)}>
                                            <DepartmentMemberAddModal 
                                                modalIsOpen={modal2IsOpen} 
                                                setModalIsOpen={setModal2IsOpen} 
                                                accessedDepartmentId={localStorage.getItem('accessedDepartmentId')}
                                                departmentMembers={departmentMemberViewModel.getMembers(localStorage.getItem('accessedDepartmentId'))}
                                                workspaceMembers={workspaceMemberViewModel.getMembers(localStorage.getItem('accessedWorkspaceId') )}
                                                stomp = {stomp}
                                                />
                                        </Modal>
                                    </div>
                                    <div className='fourth-col-DPMemberList'>
                                        {isShowDPmemberList===true?
                                            <MemberList members = {departmentMemberViewModel.getMembers(localStorage.getItem('accessedDepartmentId'))}/>
                                        :
                                            <></>
                                        }

                                    </div>
                                </div>
                                <div className='fourth-col-UploadedFile'>
                                    <div className='container-top'>
                                        <div style={{float:'left', color:'white'}}>파일함</div>
                                            <input
                                                style={{display: 'none'}}
                                                ref={inputRef}
                                                type="file"
                                                onChange={handleFileInput}
                                            />

                                        <div style={{float:'right'}} onClick={()=>setIsShowFileList(!isShowFileList)}>
                                            {
                                                isShowFileList===true?
                                                    <BiChevronsDown className='arrow'/>
                                                :
                                                    <BiChevronsUp className='arrow'/>
                                            }
                                        </div>

                                        <FaUpload onClick={handleClick} style={{float:'right'}} className="arrow"/>
                                    </div>
                                    <Modal ariaHideApp={false} isOpen= {FileUploadConfirmModalIsOpen} style={modalStyles} onRequestClose={() => setFileUploadConfirmModalIsOpen(false)}>
                                        <FileUploadConfirm 
                                            setFileUploadConfirmModalIsOpen={setFileUploadConfirmModalIsOpen}
                                            uploadFile={uploadFile}
                                            selectedFile={selectedFile}
                                            progress={progress}
                                            setSelectedFile={setSelectedFile}
                                            />
                                    </Modal>

                                    {
                                        isShowFileList === true ?
                                            fileClassification === 'file' ?
                                            <>
                                                <div>
                                                    <div className='file-category' onClick={() => setFileClassification('file')} style={{backgroundColor:'black'}}>파일</div>
                                                    <div className='file-category' onClick={() => setFileClassification('img')} style={{backgroundColor:'#717171'}}>이미지</div>
                                                    <input
                                                        className="file-search"
                                                        placeholder="search"
                                                        value={ fileSearch }
                                                        onChange={e => setFileSearch(e.target.value)}
                                                    />
                                                </div>
                                                <div className='file-list-container'>
                                                    <FileList
                                                        fileList = {fileList.filter(file => file.content.includes(fileSearch))}
                                                    />
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div>
                                                    <div className='file-category' onClick={() => setFileClassification('file')} style={{backgroundColor:'#717171'}}>파일</div>
                                                    <div className='file-category' onClick={() => setFileClassification('img')} style={{backgroundColor:'black'}}>이미지</div>      
                                                    <input
                                                        className="file-search"
                                                        placeholder="search"
                                                        value={ fileSearch }
                                                        onChange={e => setFileSearch(e.target.value)}
                                                    />
                                                </div>
                                                <div className='file-list-container'>
                                                    <ImgList
                                                        imgList = {imgList.filter(img => img.content.includes(fileSearch))}
                                                    />  
                                                </div>
                                            </>                              
                                        :
                                        <></>
                                    }
                                </div>
                                <div className='fourth-col-Bucket'>
                                    <div className='container-top'>
                                        <div style={{float:'left', color:'white'}}>버켓</div>
                                    </div>
                                    {/* <img src="https://passta-lobster-bucket.s3.ap-northeast-2.amazonaws.com/upload/2022-11-1813%3A57%3A08/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA2022-10-29%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB3.13.25.png"/> */}
                                    <div className='child'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    <Bucket/>
                }
            </div>
        );
    // }
}

export default Workspace;