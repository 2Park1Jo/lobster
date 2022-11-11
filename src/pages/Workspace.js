import './Workspace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberCard from '../components/workspace/MemberCard';
import DepartmentAddModal from '../components/modals/DepartmentAddModal'
import DepartmentMemberAddModal from '../components/modals/DepartmentMemberAddModal';
import DepartmentModifyModal from '../components/modals/DepartmentModifyModal';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useRecoilValue } from "recoil";

import { getAllWorkspace, getWorkspaceMemberData, getWorkspaceData } from '../api/WorkspaceAPI';
import { getAllDepartment, getDepartmentMemberData } from '../api/DepartmentAPI';

import { getChattingData } from '../data/ChattingData';
import { getDepartmentData, getDepartmentGoal, getDepartmentDeadLine } from '../data/DepartmentData';
// import { getDepartmentMemberData } from '../data/DepartmentMemberData';
// import { getAllWorkspaceData } from '../data/WorkspaceData';
// import { getWorkspaceMemberData } from '../data/WorkspaceMemberData';
import { ACCESSED_DEPARTMENT, LOGIN_MEMBER, WORKSPACE_ID } from '../recoil/Atoms';

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
chatViewModel.update(getChattingData())

const Workspace = function () {
    const messageEndRef = useRef(null); // 채팅메세지의 마지막
    // let loginMember = useRecoilValue(LOGIN_MEMBER);
    let accessedDepartment = useRecoilValue(ACCESSED_DEPARTMENT);
    let workspaceId = useRecoilValue(WORKSPACE_ID);

    let [isReceivedWorkspace, setIsReceivedWorkspace] = useState(false);
    let [isReceivedDepertment, setIsReceivedDepertment] = useState(false);
    let [isReceivedDepertmentMember, setIsReceivedDepertmentMember] = useState(false);
    let [isReceivedWorkspaceMember, setIsReceivedWorkspaceMember] = useState(false);

    let [modalIsOpen, setModalIsOpen] = useState(false);
    let [modal2IsOpen, setModal2IsOpen] = useState(false); 
    let [dpModifyModalIsOpen, setdpModifyModalIsOpen] = useState(false);    
    let [chatUpdateState, setChatUpdateState] = useState("");
    let [isShowDPmemberList,setIsShowDPmemberList]=useState(true);

    let[selectedMenu,setSelectedMenu]=useState(1);

    let navigate = useNavigate();
    useEffect( () => {
        getWorkspaceData(localStorage.getItem('loginMemberEmail'))
        .then(
            (res) => {
                workspaceViewModel.update(res);
                setIsReceivedWorkspace(true)
            }
        )

        getAllDepartment()
        .then(
            (res) => {
                departmentViewModel.update(res);
                setIsReceivedDepertment(true)
            }
        )

        getDepartmentMemberData(accessedDepartment.id)
        .then(
            (res) => {
                departmentMemberViewModel.update(res);
                setIsReceivedDepertmentMember(true)
            }
        )

        getWorkspaceMemberData(workspaceId)
        .then(
            (res) => {
                workspaceMemberViewModel.update(res);
                setIsReceivedWorkspaceMember(true)
            }
        )
    },[])


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

    if(isReceivedWorkspace && isReceivedDepertment && isReceivedDepertmentMember && isReceivedWorkspaceMember){

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
                        { workspaceViewModel.getName(workspaceId) }
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
                            <Modal isOpen= {modalIsOpen} style={modalStyles} onRequestClose={() => setModalIsOpen(false)}>
                                <DepartmentAddModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
                            </Modal>
                        </div>

                        <div className='second-col-DPList'>
                            <DepartmentList
                                workspaceId = {workspaceId}
                                departments = {departmentViewModel.get(workspaceId)}
                            />
                        </div>

                        <div className='container-top'>
                            <p>멤버 <BiUserPlus className="setting" onClick={()=> alert("member + button")}/> </p>
                        </div>

                        <div className='second-col-WholeMemberList'>
                            <MemberList 
                                members = {workspaceMemberViewModel.getMembers(workspaceId)}
                            />
                        </div>
                    </div>
                </div>

                <div className='third-col'>
                    <div className='third-col-DepartmentInfo'>
                        <span className="h5">{ accessedDepartment.name } </span>
                        <p className="small text-muted">&nbsp;{ departmentViewModel.getGoal(accessedDepartment.id) }</p>
                    </div>
                    
                    <div className='third-col-ChatList'>
                        <ChatBox
                            departmentMemberViewModel = {departmentMemberViewModel}
                            chatViewModel = {chatViewModel}
                            departmentId = {accessedDepartment.id}
                            loginMemberEmail = {localStorage.getItem('loginMemberEmail')}
                            chats = {chatViewModel.getChats(accessedDepartment.id)}//chatViewModel.getChats(accessedDepartmentId)
                            messageEnd = {messageEndRef}
                        />
                    </div>
                    <div className='third-col-ChatInput'>
                        <ChatInputBox 
                            chatViewModel = {chatViewModel}
                            departmentId = {accessedDepartment.id}
                            loginMemberEmail = {localStorage.getItem('loginMemberEmail')}
                            chatUpdateState = {chatUpdateState}
                            setChatUpdateState = {setChatUpdateState}
                            messageEnd = {messageEndRef}
                            // chatUpdateState = {props.chatUpdateState}
                            // setChatUpdateState = {props.setChatUpdateState}
                        />
                    </div>
                </div>
                <div className='fourth-col-container'>
                    <div className='fourth-col-DepartmentInfo'>
                        <span>{ departmentViewModel.getDeadLine(accessedDepartment.id) }</span>
                        <FaPowerOff className='setting' style={{marginLeft:'10px'}} onClick={()=> logout()}/>
                        <BsGearFill className='setting' onClick={()=> setdpModifyModalIsOpen(true)}/>
                            <Modal isOpen= {dpModifyModalIsOpen} style={modalStyles} onRequestClose={() => setdpModifyModalIsOpen(false)}>
                                <DepartmentModifyModal departmentName={accessedDepartment.name} departmentGoal={departmentViewModel.getGoal(accessedDepartment.id)} departmentDeadLine={departmentViewModel.getDeadLine(accessedDepartment.id)} setdpModifyModalIsOpen={setdpModifyModalIsOpen}/>
                            </Modal>
                        <p className="h5 mb-0 py-1">&nbsp;{ departmentViewModel.getDDay(accessedDepartment.id) }</p>
                    </div>

                    <div className='fourth-col'>

                        <div className='fourth-col-DPMemberListContainer'>
                            <div className='container-top'>
                                <div style={{float:'left'}}>참여자 {departmentMemberViewModel.getMembers(accessedDepartment.id).length}</div>
                                
                                <div style={{float:'right'}} onClick={()=>setIsShowDPmemberList(!isShowDPmemberList)}>{
                                    isShowDPmemberList===true?
                                    <BiChevronsDown className='arrow'/>
                                    :
                                    <BiChevronsUp className='arrow'/>
                                }</div>
                                <BiUserPlus style={{float:'right'}} className="arrow" onClick={()=> setModal2IsOpen(true)}/>
                                <Modal isOpen= {modal2IsOpen} style={modalStyles} onRequestClose={() => setModal2IsOpen(false)}>
                                    <DepartmentMemberAddModal modalIsOpen={modal2IsOpen} setModalIsOpen={setModal2IsOpen} accessedDepartmentId={accessedDepartment.id}/>
                                </Modal>
                            </div>
                            <div className='fourth-col-DPMemberList'>
                                {isShowDPmemberList===true?
                                    <MemberList members = {departmentMemberViewModel.getMembers(accessedDepartment.id)}/>
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
            <Bucket>adgadsg</Bucket>
                        }
    </div>
    );
                    }
}

export default Workspace;