import './Workspace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberCard from '../components/workspace/MemberCard';
import DepartmentAddModal from '../components/modals/DepartmentAddModal'
import DepartmentMemberAddModal from '../components/modals/DepartmentMemberAddModal';
import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { useRecoilValue } from "recoil";

import { getChattingData } from '../data/ChattingData';
import { getDepartmentData, getDepartmentGoal, getDepartmentDeadLine } from '../data/DepartmentData';
import { getDepartmentMemberData } from '../data/DepartmentMemberData';
import { getAllWorkspaceData } from '../data/WorkspaceData';
import { getWorkspaceMemberData } from '../data/WorkspaceMemberData';
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

const workspace = new WorkspaceModel();
const workspaceViewModel = new WorkspaceViewModel(workspace);
workspaceViewModel.update(getAllWorkspaceData());

const workspaceMember = new WorkspaceMember();
const workspaceMemberViewModel = new WorkspaceMemberViewModel(workspaceMember);
workspaceMemberViewModel.update(getWorkspaceMemberData());

const department = new Department();
const departmentViewModel = new DepartmentViewModel(department);
departmentViewModel.update(getDepartmentData());

const departmentMember = new DepartmentMember();
const departmentMemberViewModel = new DepartmentMemberViewModel(departmentMember);
departmentMemberViewModel.update(getDepartmentMemberData());

const chat = new Chat();
const chatViewModel = new ChatViewModel(chat);
chatViewModel.update(getChattingData())

const Workspace = function () {
    const messageEndRef = useRef(null); // 채팅메세지의 마지막

    let loginMember = useRecoilValue(LOGIN_MEMBER);
    let accessedDepartment = useRecoilValue(ACCESSED_DEPARTMENT);
    let workspaceId = useRecoilValue(WORKSPACE_ID);

    let [modalIsOpen, setModalIsOpen] = useState(false);
    let [modal2IsOpen, setModal2IsOpen] = useState(false);    
    let [chatUpdateState, setChatUpdateState] = useState("");

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

    return(
    <div className="maincontainer">
        <div className='first-col'>
            <div className='first-col-Workspace'>
                workSpace버튼
            </div>
            <div className='first-col-Bucket'>
                버켓버튼
            </div>
        </div>

        <div className='second-col'>
            <div className='second-col-WorkspaceInfo'>
                { workspaceViewModel.getName(workspaceId) }
            </div>
            <div className='second-col-UserInfo'>
                <MemberCard 
                    profilePicture='https://therichpost.com/wp-content/uploads/2020/06/avatar2.png'
                    name={loginMember.name}
                    onClicked={() => alert(loginMember.name)}
                />
            </div>
            
            <div className='add-button-title'>
                <p>그룹 <button className="add-button" onClick={()=> setModalIsOpen(true)}>+</button> </p>
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

            <div className='add-button-title'>
                <p>멤버 <button className="add-button" onClick={()=> alert("member + button")}>+</button> </p>
            </div>

            <div className='second-col-WholeMemberList'>
                <MemberList 
                    members = {workspaceMemberViewModel.getMembers(workspaceId)}
                />
            </div>
        </div>

        <div className='third-col'>
            <div className='third-col-DepartmentInfo'>
                <p className="h5">{ accessedDepartment.name } </p>
                <span className="small text-muted">&nbsp;{ getDepartmentGoal(accessedDepartment.id) }</span>
            </div>
            
            <div className='third-col-ChatList'>
                <ChatBox
                    departmentMemberViewModel = {departmentMemberViewModel}
                    chatViewModel = {chatViewModel}
                    departmentId = {accessedDepartment.id}
                    loginMemberEmail = {loginMember.email}
                    chats = {chatViewModel.getChats(accessedDepartment.id)}//chatViewModel.getChats(accessedDepartmentId)
                    messageEnd = {messageEndRef}
                />
            </div>
            <div className='third-col-ChatInput'>
                <ChatInputBox 
                    chatViewModel = {chatViewModel}
                    departmentId = {accessedDepartment.id}
                    memberEmail = {loginMember.email}
                    chatUpdateState = {chatUpdateState}
                    setChatUpdateState = {setChatUpdateState}
                    messageEnd = {messageEndRef}
                    // chatUpdateState = {props.chatUpdateState}
                    // setChatUpdateState = {props.setChatUpdateState}
                />
            </div>
        </div>

        <div className='fourth-col'>
            <div className='fourth-col-DepartmentInfo'>
                <span>{ departmentViewModel.getDeadLine(accessedDepartment.id) }</span>
                <p className="h5 mb-0 py-1">&nbsp;{ departmentViewModel.getDDay(accessedDepartment.id) }</p>
            </div>

            <div className='add-button-title'>
                <p>참여자<button className="add-button" onClick={()=> setModal2IsOpen(true)}>+</button> </p>
                <Modal isOpen= {modal2IsOpen} style={modalStyles} onRequestClose={() => setModal2IsOpen(false)}>
                    <DepartmentMemberAddModal modalIsOpen={modal2IsOpen} setModalIsOpen={setModal2IsOpen} accessedDepartmentId={accessedDepartment.id}/>
                </Modal>
            </div>

            <div className='fourth-col-DPMemberList'>
                <MemberList 
                    members = {departmentMemberViewModel.getMembers(accessedDepartment.id)}
                />
            </div>
            <div className='fourth-col-RoleDetermine'>
                역할정하기
            </div>
            <div className='fourth-col-UploadedFile'>
                파일목록
            </div>
            <div className='fourth-col-DPModify'>
                DP수정
            </div>
            <div className='fourth-col-Bucket'>
                버켓
            </div>
        </div>
    </div>
    );
}

export default Workspace;