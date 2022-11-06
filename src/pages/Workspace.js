import './Workspace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberCard from '../components/workspace/MemberCard';
import DepartmentAddModal from '../components/modals/DepartmentAddModal'
import DepartmentMemberAddModal from '../components/modals/DepartmentMemberAddModal';
import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { useRecoilValue } from "recoil";

import { getChattingData } from '../data/ChattingData';
import { getDepartmentData, getDepartmentGoal, getDepartmentDeadLine } from '../data/DepartmentData';
import { getDepartmentMemberData } from '../data/DepartmentMemberData';
import { getWorkspaceData, getAllWorkspaceData } from '../data/WorkspaceData';
import { getWorkspaceMemberData } from '../data/WorkspaceMemberData';
import { ACCESSED_DEPARTMENT, LOGIN_MEMBER, WORKSPACE_ID } from '../recoil/Atoms';

import MemberList from '../components/workspace/MemberList';
import DepartmentList from '../components/workspace/DepartmentList';
import ChatBox from '../components/workspace/chat/ChatBox';

import { WorkspaceViewModel } from '../models/view-model/WorkspaceViewModel';
import { WorkspaceMember } from '../models/model/WorkspaceMember';
import { WorkspaceMemberViewModel } from '../models/view-model/WorkspaceMemberViewModel';
import { DepartmentViewModel } from '../models/view-model/DepartmentViewModel';
import { DepartmentMember } from '../models/model/DepartmentMember';
import { DepartmentMemberViewModel } from '../models/view-model/DepartmentMemberViewModel';
import { Chat } from '../models/model/Chat';
import { ChatViewModel } from '../models/view-model/ChatViewModel';
import { Department } from '../models/model/Department';

const Workspace = function () {
    let loginMember = useRecoilValue(LOGIN_MEMBER);
    let accessedDepartment = useRecoilValue(ACCESSED_DEPARTMENT);
    let workspaceId = useRecoilValue(WORKSPACE_ID);

    let workspaceData = getWorkspaceData(workspaceId); // 워크스페이스 정보

    let [departmentData, setDepartmentData] = useState(getDepartmentData()); // 부서정보

    let [modalIsOpen, setModalIsOpen] = useState(false); // 모달관리 
    let [modal2IsOpen, setModal2IsOpen] = useState(false);

    const messageEndRef = useRef(null); // 채팅메세지의 마지막
    
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
                workSpace정보
            </div>
            <div className='second-col-UserInfo'>
                유저정보
            </div>
            <div className='second-col-DPList'>
                DP리스트
            </div>
            <div className='second-col-WholeMemberList'>
                전체멤버
            </div>
        </div>

        <div className='third-col'>
            <div className='third-col-ChatList'>
                <div className='first-col-Workspace'>
                    채팅1
                </div>
                <div className='first-col-Workspace'>
                    채팅2
                </div>
                <div className='first-col-Workspace'>
                    채팅3
                </div>
                <div className='first-col-Workspace'>
                    채팅4
                </div>
                <div className='first-col-Workspace'>
                    채팅5
                </div>
            </div>
            <div className='third-col-ChatInput'>
                채팅입력창
            </div>
        </div>

        <div className='fourth-col'>
            <div className='fourth-col-DPMemberList'>
                DP멤버 리스트
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