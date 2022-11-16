import './Workspace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberCard from '../components/workspace/MemberCard';
import DepartmentAddModal from '../components/modals/DepartmentAddModal'
import DepartmentMemberAddModal from '../components/modals/DepartmentMemberAddModal';
import DepartmentModifyModal from '../components/modals/DepartmentModifyModal';
import WorkspaceMemberAdd from '../components/modals/WorkspaceMemberAdd';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useRecoilState } from "recoil";

import { getWorkspaceMemberData, getWorkspaceData } from '../api/WorkspaceAPI';
import { getDepartmentMemberData, getChattingData, getDepartments } from '../api/DepartmentAPI';

import { ACCESSED_DEPARTMENT, WORKSPACE_ID } from '../recoil/Atoms';

import MemberList from '../components/workspace/MemberList';
import DepartmentList from '../components/workspace/DepartmentList';
import ChatBox from '../components/workspace/chat/ChatBox';
import ChatInputBox from '../components/workspace/chat/ChatInputBox';

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

import { FaPowerOff } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";
import { BiChevronsDown,BiChevronsUp,BiUserPlus } from "react-icons/bi";
import {SiBitbucket} from "react-icons/si";
import {MdOutlineWork} from "react-icons/md";

import { ListGroup } from 'react-bootstrap';
import Bucket from '../components/workspace/Bucket';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { BACK_BASE_URL } from '../Config';
import { Last } from 'react-bootstrap/esm/PageItem';
import Dropzone from 'react-dropzone'
import '../utils/FileUpload.js'
import { uploadFiles } from '../utils/FileUpload.js';

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

const sockJs = new SockJS(BACK_BASE_URL + "chat");
let stomp = Stomp.over(sockJs);

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
    let [drag,setDrag]=useState("")
    let [chatUpdateState, setChatUpdateState] = useState("");
    let [departmentUpdateState, setDepartmentUpdateState] = useState("");
    let [dpMemberUpdateState, setDpMemberUpdateState] = useState("");
    let [workspaceMemberUpdateState, setWorkspaceMemberUpdateState] = useState("");

    let [isShowDPmemberList,setIsShowDPmemberList]=useState(true);
    let [selectedMenu,setSelectedMenu]=useState(1);

    let [departmentIdList, setDepartmentIdList] = useState([]);

    let navigate = useNavigate();
    
    useEffect( () => {     
        getWorkspaceData(localStorage.getItem('loginMemberEmail'))
        .then(
            (res) => {
                workspaceViewModel.update(res);
                setWorkspaceId(localStorage.getItem('accessedWorkspaceId'))
                setIsReceivedWorkspace(true)
            }
        )
    },[])

    useEffect( () => {
        if (stomp.connected){
            if (departmentIdList.length > 0){
                if (departmentIdList.length !== stomp.counter - 1){
                    console.log('구독추가')
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
                    chatViewModel.update(res);
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

    // if(isReceivedWorkspace && isReceivedDepertment && isReceivedDepertmentMember && isReceivedWorkspaceMember && isReceivedChat){
        return(
            <div className="maincontainer">
                <div className='first-col'>
                    <div className='first-col-Button'>
                        {selectedMenu===1?
                            <MdOutlineWork style={{color:'black'}} onClick={()=>setSelectedMenu(1)}/>
                            :
                            <MdOutlineWork className='menu-unselected' onClick={()=>setSelectedMenu(1)}/>
                        }
                    </div>
                    <div className='first-col-Button'>
                        {selectedMenu===2?
                            <SiBitbucket style={{color:'black'}} onClick={()=>setSelectedMenu(2)}/>
                            :
                            <SiBitbucket className='menu-unselected' onClick={()=>setSelectedMenu(2)}/>
                        }
                    </div>
                </div>
                {selectedMenu===1?
                    <div className='contents-container'>
                        <div className='second-col'>
                            <div className='second-col-WorkspaceInfo'>
                                { workspaceViewModel.getName(localStorage.getItem('accessedWorkspaceId') ) }
                            </div>
                            <div className='second-col-container'>
                                <div className='second-col-UserInfo'>
                                    <ListGroup variant='flush'>
                                        <MemberCard 
                                            profilePicture='https://therichpost.com/wp-content/uploads/2020/06/avatar2.png'
                                            name={departmentMemberViewModel.getMemberName(localStorage.getItem('loginMemberEmail'))}
                                            onClicked={() => alert(departmentMemberViewModel.getMemberName(localStorage.getItem('loginMemberEmail')))}
                                        />
                                    </ListGroup>
                                </div>
                            
                                <div className='container-top'>
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

                                <div className='container-top'>
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
                                        members = {workspaceMemberViewModel.getMembers(localStorage.getItem('accessedWorkspaceId') )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='third-col'>
                            <div className='third-col-DepartmentInfo'>
                                <span className="h5">{ accessedDepartment.name } </span>
                                <p className="small text-muted">&nbsp;{ departmentViewModel.getGoal(localStorage.getItem('accessedDepartmentId')) }</p>
                            </div>
                            <Dropzone onDrop={acceptedFiles=>console.log(acceptedFiles)} onDragLeave={()=>setDrag(false)} noClick={true} onDragOver={()=>setDrag(true)}>
                                {({getRootProps, getInputProps}) => (
                                <div className='third-col-ChatContainer'>
                                    <div {...getRootProps()} >
                                        <input {...getInputProps()} />
                                        {drag===true?
                                            <div className='third-col-fileUpload'><SiBitbucket /></div>
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
                                )}
                            </Dropzone>
                        </div>
                        <div className='fourth-col-container'>
                            <div className='fourth-col-DepartmentInfo'>
                                <span>{ departmentViewModel.getDeadLine(localStorage.getItem('accessedDepartmentId')) }</span>
                                <FaPowerOff className='setting' style={{marginLeft:'10px'}} onClick={()=> logout()}/>
                                <BsGearFill className='setting' onClick={()=> setdpModifyModalIsOpen(true)}/>
                                    <Modal isOpen= {dpModifyModalIsOpen} style={modalStyles} onRequestClose={() => setdpModifyModalIsOpen(false)}>
                                        <DepartmentModifyModal departmentName={accessedDepartment.name} departmentGoal={departmentViewModel.getGoal(localStorage.getItem('accessedDepartmentId'))} departmentDeadLine={departmentViewModel.getDeadLine(localStorage.getItem('accessedDepartmentId'))} setdpModifyModalIsOpen={setdpModifyModalIsOpen}/>
                                    </Modal>
                                <p className="h5 mb-0 py-1">&nbsp;{ departmentViewModel.getDDay(localStorage.getItem('accessedDepartmentId')) }</p>
                            </div>

                            <div className='fourth-col'>

                                <div className='fourth-col-DPMemberListContainer'>
                                    <div className='container-top'>
                                        <div style={{float:'left'}}>참여자 {departmentMemberViewModel.getMembers(localStorage.getItem('accessedDepartmentId')).length}</div>
                                        
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
                                        파일목록
                                    </div>
                                    <div className='child'></div>
                                </div>
                                <div className='fourth-col-Bucket'>
                                    <div className='container-top'>
                                        버켓
                                    </div>
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