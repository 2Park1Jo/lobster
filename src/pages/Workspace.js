import './Workspace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberCard from '../components/workspace/MemberCard';
import DepartmentAddModal from '../components/modals/DepartmentAddModal'
import DepartmentMemberAddModal from '../components/modals/DepartmentMemberAddModal';
import React, { useState } from 'react';
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
        <div className="container py-5 px-0">
            <div className="row rounded-lg overflow-hidden shadow">
                {/* left */}
                <div className="col-1 px-0">
                    <div className="bg-white">
                        <div className="messages-box">
                            <div className="list-group rounded-0">
                            <a className="list-group-item list-group-item-action active text-white rounded-0">
                                ⚙️
                            </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* left center */}
                <div className="col-2 px-0">
                    {/* workspace info */}
                    <div className="bg-gray px-4 py-2 bg-light">
                        <p className="h5 mb-0 py-1">{ workspaceViewModel.getName(workspaceId) }</p>
                    </div>

                    <div className="left-box">
                        <MemberCard 
                            profilePicture='https://therichpost.com/wp-content/uploads/2020/06/avatar2.png'
                            name={loginMember.name}
                            onClicked={() => alert(loginMember.name)}
                        />
                    
                        {/* department List */}
                        <div className="bg-gray px-4 py-2 bg-light">
                            <p className="mb-0 py-1">그룹 <button className="add-button" onClick={()=> setModalIsOpen(true)}>+</button> </p>
                            <Modal isOpen= {modalIsOpen} style={modalStyles} onRequestClose={() => setModalIsOpen(false)}>
                                <DepartmentAddModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
                            </Modal>
                        </div>

                        <DepartmentList 
                            workspaceId = {workspaceId}
                            departments = {departmentViewModel.get(workspaceId)}
                        />
                        
                        {/* workspace member List */}   
                        <div className="bg-gray px-4 py-2 bg-light">
                            <p className="mb-0 py-1">멤버</p>
                        </div>                    
                        <MemberList 
                            members = {workspaceMemberViewModel.getMembers(workspaceId)}
                        />
                        
                    </div>
                </div>

                {/* right center */}
                <div className="col-7 px-0">
                    <div className="bg-gray px-4 bg-light">
                        <p className="h5">{ accessedDepartment.name } </p>
                        <span className="small text-muted">&nbsp;{ getDepartmentGoal(accessedDepartment.id) }</span>
                    </div>

                    <ChatBox
                        departmentMemberViewModel = {departmentMemberViewModel}
                        chatViewModel = {chatViewModel}
                        departmentId = {accessedDepartment.id}
                        loginMemberEmail = {loginMember.email}
                        chats = {chatViewModel.getChats(accessedDepartment.id)}
                        chatUpdateState = {chatUpdateState}
                        setChatUpdateState = {setChatUpdateState}
                    />
                </div>
                
                {/* right */}
                <div className="col-2 px-0">
                    <div className="bg-gray px-4 py-2 bg-light">
                        <span>{ departmentViewModel.getDeadLine(accessedDepartment.id) }</span>
                        <p className="h5 mb-0 py-1">&nbsp;{ departmentViewModel.getDDay(accessedDepartment.id) }</p>
                    </div>

                    <div className="bg-gray px-4 py-2 bg-light">
                        <p className="mb-0 py-1">참여자<button className="add-button" onClick={()=> setModal2IsOpen(true)}>+</button> </p>
                        <Modal isOpen= {modal2IsOpen} style={modalStyles} onRequestClose={() => setModal2IsOpen(false)}>
                            <DepartmentMemberAddModal modalIsOpen={modal2IsOpen} setModalIsOpen={setModal2IsOpen} accessedDepartmentId={accessedDepartment.id}/>
                        </Modal>

                    </div>

                    <MemberList 
                        members = {departmentMemberViewModel.getMembers(accessedDepartment.id)}
                    />

                    <div className="bg-gray px-4 py-2 bg-light">
                        <p className="mb-0 py-1">역할정하기</p>
                    </div>
                    <div className="bg-gray px-4 py-2 bg-light">
                        <p className="mb-0 py-1">파일함</p>
                    </div>
                    <div className="bg-gray px-4 py-2 bg-light">
                        <p className="mb-0 py-1">버킷</p>
                    </div>
                </div>

            </div>
        </div>

    </div>
    );
}

export default Workspace;