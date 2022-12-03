import './Workspace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberCard from '../components/workspace/MemberCard';
import DepartmentAddModal from '../components/modals/DepartmentAddModal'
import DepartmentMemberAddModal from '../components/modals/DepartmentMemberAddModal';
import DepartmentModifyModal from '../components/modals/DepartmentModifyModal';
import WorkspaceMemberAdd from '../components/modals/WorkspaceMemberAdd';
import FileUploadConfirm from '../components/modals/FileUploadConfirm';
import BucketModal from '../components/modals/BucketModal';
import BucketSemiCard from '../components/workspace/BucketSemiCard';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { useRecoilState } from "recoil";

import { getLastChatData } from '../api/MemberAPI';
import { getWorkspaceMemberData, getWorkspaceData } from '../api/WorkspaceAPI';
import { getDepartmentMemberData, getChattingData, getDepartments, getDepartmentsChatCountData } from '../api/DepartmentAPI';
import { getLastBucket } from '../api/BucketAPI'

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

import { FaPowerOff, FaUpload, FaFileUpload} from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";
import { BiChevronsDown,BiChevronsUp,BiUserPlus } from "react-icons/bi";
import { SiBitbucket } from "react-icons/si";
import { MdOutlineWork, MdSensorDoor } from "react-icons/md";

import { ListGroup } from 'react-bootstrap';
import Bucket from '../components/workspace/Bucket';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { BACK_BASE_URL } from '../Config';

import useSound from 'use-sound'
import mySound from './alert.mp3'

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
    let [accessedDepartment, setAccessedDepartment] = useRecoilState(ACCESSED_DEPARTMENT);
    let [workspaceId, setWorkspaceId] = useRecoilState(WORKSPACE_ID);

    let [modalIsOpen, setModalIsOpen] = useState(false);
    let [modal2IsOpen, setModal2IsOpen] = useState(false); 
    let [dpModifyModalIsOpen, setdpModifyModalIsOpen] = useState(false);  
    let [WorkspaceMemberAddModalIsOpen,setWorkspaceMemberAddModalIsOpen]=useState(false); 
    let [FileUploadConfirmModalIsOpen,setFileUploadConfirmModalIsOpen]=useState(false);
    let [BucketModalIsOpen,setBucketModalIsOpen]=useState(false);
    let [drag,setDrag]=useState("")

    let [isShowDPmemberList,setIsShowDPmemberList]=useState(true);
    let [selectedMenu,setSelectedMenu]=useState(1);

    let [departmentIdList, setDepartmentIdList] = useState([]);
    const [selectedFile, setSelectedFile] = useState([]);

    let [isShowFileList, setIsShowFileList]=useState(true);
    let [fileList, setFileList] = useState([]);
    let [imgList, setImgList] = useState([]);

    let [fileClassification, setFileClassification] = useState('file');
    let [fileSearch, setFileSearch] = useState('');

    let [lastBucketData, setLastBucketData] = useState("");
    let [lastBucketUpdateState, setLastBucketUpdateState] = useState(false);

    let navigate = useNavigate();
    const location = useLocation();

    let [connectedMemberList, setConnectedMemberList] = useState([]);

    let lastChatLengthRef = useRef([]);
    let receivedDepartmentId = useRef();
    let isChatReceived = useRef(false);

    let [messageCountGapUpdate, setMessageCountGapUpdate] = useState(false);
    let [messageCountGap, setMessageCountGap] = useState([]);

    let [chatUpdateState, setChatUpdateState] = useState(false);
    let [departmentUpdateState, setDepartmentUpdateState] = useState(false);
    let [dpMemberUpdateState, setDpMemberUpdateState] = useState(false);
    let [workspaceMemberUpdateState, setWorkspaceMemberUpdateState] = useState(false);
    let [isShowLast,setIsShowLast]=useState(false);
    const [play] = useSound(mySound);

    let [workspaceMembers, setWorkspaceMembers] = useState([]);
    let [departmentMembers, setDepartmentMembers] = useState([]);
    let [departments, setDepartments] = useState([]);
    let [chats, setChats] = useState([]);

    console.log('render')
    console.log(chatUpdateState)
    useEffect( () => {     
        getWorkspaceData(localStorage.getItem('loginMemberEmail'))
        .then(
            (res) => {
                workspaceViewModel.update(res);
                setWorkspaceId(localStorage.getItem('accessedWorkspaceId'))
            }
        )
        stomp = Stomp.over(new SockJS(BACK_BASE_URL + "chat"));
        // stomp.debug = null
        stomp.connect({}, onConnected, (error) => {
            console.log('sever error : ' + error );
        });
    },[])

    useEffect(() => {
        console.log('lastBucketUpdateState')
        getLastBucket(localStorage.getItem('accessedDepartmentId'))
        .then(
            (res) => {
                setLastBucketData(res);
            }
        )
    },[lastBucketUpdateState])

    useEffect(() => {
        console.log('messageCountGap')
        let isGapUpperZero = false;
        for (let index = 0; index < messageCountGap.length; index++){
            if (messageCountGap[index].countGap > 0){
                isGapUpperZero = true;
                break;
            }
        }
        if (receivedDepartmentId.current === localStorage.getItem('accessedDepartmentId')){
            return;
        }
        if (isGapUpperZero && isChatReceived.current){    
            play();
            isChatReceived.current = false;
        }
    },[messageCountGap])

    useEffect(() => {
        console.log('location')
        localStorage.setItem('accessedDepartmentId', location.pathname.split('department/')[1].replace("%20", " "))
        setAccessedDepartment({
            id: localStorage.getItem('accessedDepartmentId'),
            name: departmentViewModel.getName(localStorage.getItem('accessedDepartmentId'))
        })
    }, [ location ])
    
    useEffect( () => {
        getDepartmentsChatCountData(localStorage.getItem('accessedWorkspaceId'), localStorage.getItem('loginMemberEmail'))
        .then(
            (res) => {
                setGap(res)
                isChatReceived.current = true;
            }
        )
    },[messageCountGapUpdate])

    useEffect( () => {
        console.log('chatUpdateState, accessedDepartment')
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

                    setChats(chatViewModel.getChats(localStorage.getItem('accessedDepartmentId')))
                    setMessageCountGapUpdate(!messageCountGapUpdate);
                }
            }
        )

    }, [chatUpdateState, accessedDepartment])

    useEffect( () => {
        console.log('departmentUpdateState')
        getDepartments(localStorage.getItem('accessedWorkspaceId'),localStorage.getItem('loginMemberEmail'))
        .then(
            (res) => {
                departmentViewModel.update(res);
                setAccessedDepartment({
                    id: localStorage.getItem('accessedDepartmentId'),
                    name: departmentViewModel.getName(localStorage.getItem('accessedDepartmentId'))
                })
                setDepartmentIdList(departmentViewModel.getIdList(localStorage.getItem('accessedWorkspaceId')))
                setDepartments(departmentViewModel.get(localStorage.getItem('accessedWorkspaceId')))
            }
        )
    }, [departmentUpdateState])

    useEffect( () => {
        console.log('dpMemberUpdateState, accessedDepartment')
        getDepartmentMemberData(localStorage.getItem('accessedDepartmentId'))
        .then(
            (res) => {
                departmentMemberViewModel.update(res);
                setDepartmentMembers(departmentMemberViewModel.getMembers(localStorage.getItem('accessedDepartmentId')))
            }
        )
    }, [dpMemberUpdateState, accessedDepartment])

    // useEffect( () => {
    //     console.log('accessedDepartment')
    //     getDepartmentsChatCountData(localStorage.getItem('accessedWorkspaceId'), localStorage.getItem('loginMemberEmail'))
    //     .then(
    //         (res) => {
    //             setGap(res)
    //         }
    //     )

    //     setLastBucketUpdateState(!lastBucketUpdateState)
    // }, [accessedDepartment])

    useEffect( () => {
        console.log('workspaceMemberUpdateState')
        getWorkspaceMemberData(localStorage.getItem('accessedWorkspaceId') )
        .then(
            (res) => {
                workspaceMemberViewModel.update(res);
                setWorkspaceMembers(workspaceMemberViewModel.getMembers(localStorage.getItem('accessedWorkspaceId')))
            }
        )
    }, [workspaceMemberUpdateState])

    function setGap(workspaceChatCountData){
        getLastChatData(localStorage.getItem('loginMemberEmail'), localStorage.getItem('accessedWorkspaceId'))
        .then(
            (res) => {
                lastChatLengthRef.current = res;
                let gap = [];
                for (let index = 0; index < departmentIdList.length; index++){
                    if (lastChatLengthRef.current[index] === undefined){
                        let countGap = 1;               
                        gap.push({
                            departmentId: departmentIdList[index],
                            countGap: countGap,
                            isNewDepartment: true
                        })
                    }
                    else{
                        let countGap = Number(workspaceChatCountData[index].chatCount) - Number(lastChatLengthRef.current[index].messageCount);
                        if (departmentIdList[index] === localStorage.getItem('accessedDepartmentId')){
                            countGap = 0;
                        }
                        
                        gap.push({
                            departmentId: departmentIdList[index],
                            countGap: countGap,
                            isNewDepartment: false
                        });
                    }
                }
                setMessageCountGap([...gap])
            }
        )
    }

    useEffect( () => {
        console.log('departmentIdList')
        if (stomp.connected){
            if (departmentIdList.length > 0){
                if (departmentIdList.length !== stomp.counter - 3){
                    stomp.subscribe("/sub/chat/department/" + departmentIdList[departmentIdList.length - 1], function (chat) {
                        let result = JSON.parse(chat.body);
                        console.log("setChatUpdateState 진입점2")
                        setChatUpdateState(!chatUpdateState);
                        receivedDepartmentId.current = result.departmentId;
                        if (result.contentType === "-1"){ // invite
                            setDpMemberUpdateState(!dpMemberUpdateState);
                        }
                        else if (result.contentType === "-2"){// bucket modify
                            setLastBucketUpdateState(!lastBucketUpdateState);
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
    
    function onConnected() {
        if (stomp.connected){
            // chat 
            for (let index = 0; index < departmentIdList.length; index++){
                stomp.subscribe("/sub/chat/department/" + departmentIdList[index], function (chat) {
                    let result = JSON.parse(chat.body);
                    console.log("setChatUpdateState 진입점1")
                    setChatUpdateState(!chatUpdateState);
                    receivedDepartmentId.current = result.departmentId;
                    if (result.contentType === "-1"){ // invite
                        setDpMemberUpdateState(!dpMemberUpdateState);
                    }
                    else if (result.contentType === "-2"){// bucket modify
                        setLastBucketUpdateState(!lastBucketUpdateState);
                    }
                });
            }

            //dp add
            stomp.subscribe("/sub/chat/workspace/" + localStorage.getItem('accessedWorkspaceId'), function (data) {
                if(data.body.includes("이미 존재하는 부서입니다")){
                    alert("워크스페이스 내에 동일한 이름의 그룹이 이미 생성되어있습니다.")
                }
                else{
                    console.log('setDepartmentUpdateState 진입')
                    let result = JSON.parse(data.body);
                    setDepartmentUpdateState(!departmentUpdateState);
                    if (result.contentType === "-1"){ // modify
                        setChatUpdateState(!chatUpdateState);
                    }
                }
            });

            stomp.subscribe("/sub/chat/workspace", function (data) {
                let result = data.body;
                setWorkspaceMemberUpdateState(!workspaceMemberUpdateState);
                setDepartmentUpdateState(!departmentUpdateState);
                setDpMemberUpdateState(!dpMemberUpdateState);
            });

            stomp.subscribe("/sub/chat/session", function (data) {
                let result = JSON.parse(data.body);
                setConnectedMemberList(result)
                
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
        stomp.disconnect()
        navigate('/')
    }

    function moveToWorkspaceBanner(){
        stomp.disconnect();
        navigate('/workspacebanner');
    }

    const inputRef = useRef(null);

    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };

    const handleFileInput = (e) => {
        setSelectedFile([e.target.files[0]]);
        setFileUploadConfirmModalIsOpen(true)
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

    async function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        setDrag(false)
    
        var files = e.dataTransfer.files;
        if(files.length>5){
            alert("한번에 최대 5개의 파일까지 업로드 하실 수 있습니다!")
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
                            setSelectedFile([...list]);
                            setFileUploadConfirmModalIsOpen(true)
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

    function preventModalScroll(){
        document.body.style.overflow = "unset"
    }

    function lastCommitClick(){
        setIsShowLast(true);
        setBucketModalIsOpen(true);
    }

    function bucketIconClick(){
        setIsShowLast(false);
        setBucketModalIsOpen(true);
    }

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
                                        // onClicked={() => alert(departmentMemberViewModel.getMemberName(localStorage.getItem('loginMemberEmail')))}
                                    />
                                </ListGroup>
                            </div>
                        
                            <div className='container-top' style={{backgroundColor:'#E0E0E0'}}>
                                <p>그룹 <MdPostAdd className="setting" onClick={()=> setModalIsOpen(true)}/> </p>
                                <Modal ariaHideApp={false} isOpen= {modalIsOpen} style={modalStyles} onRequestClose={() => setModalIsOpen(false)}>
                                    <DepartmentAddModal 
                                        modalIsOpen={modalIsOpen} 
                                        setModalIsOpen={setModalIsOpen}
                                        workspaceMembers={workspaceMembers}
                                        loginMemberName={departmentMemberViewModel.getMemberName(localStorage.getItem('loginMemberEmail'))}
                                        departmentMembers={departmentMembers}
                                        stomp = {stomp}
                                    />
                                </Modal>
                            </div>

                            <div className='second-col-DPList'>
                                <DepartmentList
                                    workspaceId = {localStorage.getItem('accessedWorkspaceId') }
                                    departmentId = {localStorage.getItem('accessedDepartmentId')}
                                    departments = {departments}
                                    lastChatData = {chatViewModel.getLastChatData(localStorage.getItem('accessedDepartmentId'))}
                                    checkedMessageCount = {chatViewModel.getChatLength(localStorage.getItem('accessedDepartmentId'))}
                                    messageCountGap = {messageCountGap}
                                    isChatReceived = {isChatReceived}
                                />
                            </div>

                            <div className='container-top'style={{backgroundColor:'#E0E0E0'}}>
                                <p>멤버 <BiUserPlus className="setting" onClick={()=> setWorkspaceMemberAddModalIsOpen(true)}/> </p>
                                <Modal ariaHideApp={false} isOpen= {WorkspaceMemberAddModalIsOpen} style={modalStyles} onRequestClose={() => setWorkspaceMemberAddModalIsOpen(false)}>
                                    <WorkspaceMemberAdd 
                                        setWorkspaceMemberAddModalIsOpen={setWorkspaceMemberAddModalIsOpen}
                                        workspaceId={localStorage.getItem('accessedWorkspaceId')}
                                        workspaceMembers={workspaceMembers}
                                        stomp={stomp}
                                        />
                                </Modal>
                            </div>

                            <div className='second-col-WholeMemberList'>
                                <MemberList 
                                    members = {workspaceMemberViewModel.getMembers(localStorage.getItem('accessedWorkspaceId'))}//.filter(member => member.email !== localStorage.getItem('loginMemberEmail'))}
                                    connectedMemberList = {connectedMemberList}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='third-col'>
                        <div className='third-col-DepartmentInfo'>
                            <div style={{float:'left', paddingTop:'10px'}}>
                                <div className='department-name'>{ accessedDepartment.name } </div>
                                <div className='department-goal'>{ departmentViewModel.getGoal(localStorage.getItem('accessedDepartmentId')) }</div>
                            </div>
                            <img style={{float:'right'}} draggable="false" src = "https://paasta-lobster-bucket.s3.ap-northeast-2.amazonaws.com/image/lobster_img.png" height="74px"/>
                        </div>
                        <div onDrop={e=>handleDrop(e)} onDragLeave={()=>setDrag(false)} onDragOver={e=>handleDragEnter(e)}>
                            <div className='third-col-ChatContainer'>
                                    {drag===true?
                                        <div className='third-col-fileUpload'><FaUpload /></div>
                                        :<></>}
                                    <div className='third-col-ChatList'>
                                        <ChatBox
                                            departmentMemberViewModel = {departmentMemberViewModel}
                                            chats = {chats}
                                            messageEnd = {messageEndRef}
                                        />
                                    </div>
                                    <div className='third-col-ChatInput'>
                                        <ChatInputBox 
                                            chatViewModel = {chatViewModel}
                                            departmentId = {localStorage.getItem('accessedDepartmentId')}
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
                                <Modal ariaHideApp={false} isOpen={dpModifyModalIsOpen} style={modalStyles} onRequestClose={() => setdpModifyModalIsOpen(false)}>
                                    <DepartmentModifyModal 
                                        departmentName={accessedDepartment.name} 
                                        departmentGoal={departmentViewModel.getGoal(localStorage.getItem('accessedDepartmentId'))} 
                                        departmentDeadLine={String(departmentViewModel.getDeadLine(localStorage.getItem('accessedDepartmentId'))).replace("마감일 : ","")} 
                                        setdpModifyModalIsOpen={setdpModifyModalIsOpen}
                                        stomp = {stomp}
                                    />
                                </Modal>
                            <MdSensorDoor className='setting' onClick={()=> moveToWorkspaceBanner()}/>
                            <div className='department-dday'>{ departmentViewModel.getDDay(localStorage.getItem('accessedDepartmentId')) }</div>
                        </div>

                        <div className='fourth-col'>

                            <div className='fourth-col-DPMemberListContainer'>
                                <div className='container-top'>
                                    <div style={{float:'left', color:'white'}}>참여자 ({departmentMemberViewModel.getMembers(localStorage.getItem('accessedDepartmentId')).length})</div>
                                    
                                    <div style={{float:'right'}} onClick={()=>setIsShowDPmemberList(!isShowDPmemberList)}>{
                                        isShowDPmemberList===true?
                                        <BiChevronsUp className='arrow'/>
                                        :
                                        <BiChevronsDown className='arrow'/>
                                    }</div>
                                    <BiUserPlus style={{float:'right'}} className="arrow" onClick={()=> setModal2IsOpen(true)}/>
                                    <Modal ariaHideApp={false} isOpen= {modal2IsOpen} style={modalStyles} onRequestClose={() => setModal2IsOpen(false)}>
                                        <DepartmentMemberAddModal 
                                            modalIsOpen={modal2IsOpen} 
                                            setModalIsOpen={setModal2IsOpen} 
                                            accessedDepartmentId={localStorage.getItem('accessedDepartmentId')}
                                            departmentMembers={departmentMembers}
                                            workspaceMembers={workspaceMembers}
                                            stomp = {stomp}
                                            />
                                    </Modal>
                                </div>
                                <div className='fourth-col-DPMemberList'>
                                    {isShowDPmemberList===true?
                                        <MemberList 
                                            members = {workspaceMembers}
                                            connectedMemberList = {connectedMemberList}
                                        />
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
                                                <BiChevronsUp className='arrow'/>
                                            :
                                                <BiChevronsDown className='arrow'/>
                                        }
                                    </div>

                                    <FaFileUpload onClick={handleClick} style={{float:'right', fontSize:'16px', marginTop:'2px', marginRight:'3px'}} className="arrow"/>
                                </div>
                                <Modal ariaHideApp={false} isOpen= {FileUploadConfirmModalIsOpen} style={modalStyles} onRequestClose={() => document.body.style.overflow = "unset"}>
                                    <FileUploadConfirm 
                                        setFileUploadConfirmModalIsOpen={setFileUploadConfirmModalIsOpen}
                                        selectedFile={selectedFile}
                                        setSelectedFile={setSelectedFile}
                                        stomp={stomp}
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
                            {
                                localStorage.getItem('accessedDepartmentId') === localStorage.getItem('accessedWorkspaceId') ?
                                <></>
                                :
                                <div className='fourth-col-Bucket'>
                                    <div className='container-top'>
                                        <div style={{float:'left', color:'white'}}>버킷</div>
                                        <SiBitbucket onClick={()=>bucketIconClick()} style={{float:'right'}} className="arrow"/>
                                    </div>
                                    <Modal ariaHideApp={false} isOpen= {BucketModalIsOpen} style={modalStyles} onRequestClose={() => preventModalScroll()}>
                                        <BucketModal 
                                            setBucketModalIsOpen={setBucketModalIsOpen}
                                            departmentId={localStorage.getItem('accessedDepartmentId')} 
                                            workspaceId={localStorage.getItem('accessedWorkspaceId')}
                                            email={localStorage.getItem('loginMemberEmail')}
                                            isShowLast={isShowLast} 
                                            memberName={departmentMemberViewModel.getMemberName(localStorage.getItem('loginMemberEmail'))}
                                            stomp={stomp}
                                            />
                                    </Modal>
                                    <div className='child'>
                                        <BucketSemiCard
                                            bucketTitle={lastBucketData.title}
                                            memberName={lastBucketData.memberName}
                                            email={lastBucketData.email}
                                            date={lastBucketData.date}
                                            onClick={()=>lastCommitClick()}
                                            width="274px"
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            :
            <div className='workspace-bucketPage-container'>
                <Bucket
                    workspaceViewModel = {workspaceViewModel}
                />
            </div>
            }
        </div>
    );
}

export default Workspace;