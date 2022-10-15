import './Workspace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DepartmentAddModal from './DepartmentAddModal';
import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { useLocation } from "react-router";
import { getMemberData, getMemberName } from '../data/MemberData';
import { getChattingData } from '../data/ChattingData';
import { getDepartmentData, getDepartmentGoal, getDepartmentDeadLine } from '../data/DepartmentData';
import { getDepartmentMemberData } from '../data/DepartmentMemberData';
import { getWorkspaceData } from '../data/WorkspaceData';
import { getWorkspaceMemberData } from '../data/WorkspaceMemberData';


const Workspace = function () {
    let location = useLocation();
    let loginUserName = location.state.loginUserName;
    let loginUserEmail = location.state.loginUserEmail;
    let [accessedDepartmentName, setAccessedDepartmentName] = useState("📢 공지방");
    let [accessedDepartmentId, setAccessedDepartmentId] = useState("1");
    let [inputChattingContent,  setInputChattingContent] = useState("");
    let [chattingData, setChattingData] = useState(getChattingData());
    let [departmentChattingData, setDepartmentChattingData] = useState([]);
    let [departmentUserData, setDepartmentUserData] = useState([]);
    let workspaceData = getWorkspaceData();
    let workspaceMemberData = getWorkspaceMemberData();
    let departmentMemberData = getDepartmentMemberData();

    let [departmentData, setDepartmentData] = useState(getDepartmentData());

    let [modalIsOpen, setModalIsOpen] = useState(false);
    const messageEndRef = useRef(null)

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

    useEffect( () => {
        setDepartmentScreen(accessedDepartmentId, accessedDepartmentName);
        setInputChattingContent("");
        scrollToBottom();
    }, [chattingData]);

    useEffect( () => {
        //setDepartmentScreen(accessedDepartmentId, accessedDepartmentName);
        setModalIsOpen(false);
    }, [departmentData]);

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth"})
    }

    function addChattingData(chatContent) {
        let copiedChattingData = [...chattingData];
        let date = new Date();
        let houres = String(date.getHours()).padStart(2, "0");
        let minutes = String(date.getMinutes()).padStart(2, "0");
        let currentTime = houres + ':' + minutes;

        if (chatContent === ""){
            return;
        }
        
        copiedChattingData.push({
            workspaceId: "1",
            departmentId: accessedDepartmentId, 
            memberEmail: loginUserEmail,
            content: chatContent,
            date: currentTime,
            content_type: "TEXT",
            link: "",
        })

        setChattingData(copiedChattingData);
    }

    function setChattingDataEachDepartment(targetDepartmentId) {
        let chatContents = [];
        for (let index = 0; index < chattingData.length; index++){
            if (chattingData[index].departmentId === targetDepartmentId){
                chatContents.push(chattingData[index]);
            }
        }

        let htmlArrayForDepartmentChat = [];

        for (let index = 0; index < chatContents.length; index++){
            let chatContent = chatContents[index].content;
            let chatDate = chatContents[index].date;
            let chatSender = getMemberName(chatContents[index].memberEmail);

            htmlArrayForDepartmentChat.push(
                // chat form
                <div>
                    <li className="small text-muted">{ chatSender } { chatDate }</li>
                    <ListGroup.Item action variant="primary" className="rounded">
                        <span className="small"> { chatContent } </span>
                    </ListGroup.Item>
                </div>
                )
        }

        setDepartmentChattingData(htmlArrayForDepartmentChat);
    }

    function setDepartmentScreen(departmentId, departmentName) {
        let departmentUserDataList = [];

        for (let index = 0; index < departmentMemberData.length; index++){
            if (departmentMemberData[index].departmentId === departmentId){
                departmentUserDataList.push(departmentMemberData[index]);
            }
        }
        setAccessedDepartmentName(departmentName);
        setAccessedDepartmentId(departmentId);
        setChattingDataEachDepartment(departmentId);
        setDepartmentUserData(departmentUserDataList);
    }

    function applyDepartmentList() {
        let htmlArrayForDepartmentList = [];

        for (let index = 0; index < departmentData.length; index++) {
            let departmentName = departmentData[index].departmentName
            let departmentId = departmentData[index].departmentId

            htmlArrayForDepartmentList.push(
                    // departmentList form
                    <ListGroup>
                        <ListGroup.Item action variant="danger" onClick={ () => setDepartmentScreen(departmentId, departmentName) }>
                            { departmentName }
                        </ListGroup.Item>
                    </ListGroup>
                )
        }
        return htmlArrayForDepartmentList
    }

    function applyMemberList(memberData) {
        let htmlArrayForWholeMemberList = [];

        for (let index = 0; index < memberData.length; index++) {
            htmlArrayForWholeMemberList.push(
                    // memberCard form
                    <ListGroup>
                        <ListGroup.Item action variant="danger">
                            <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="25" className="rounded-circle" />
                            <span> { memberData[index].memberName } </span>
                        </ListGroup.Item>
                    </ListGroup>
                )
        }
        return htmlArrayForWholeMemberList
    }

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            addChattingData(inputChattingContent); // Enter 입력이 되면 클릭 이벤트 실행
        }
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
                        <p className="h5 mb-0 py-1">{ workspaceData[0].workspaceName }</p>
                    </div>

                    <div className="left-box">
                        <ListGroup>
                            <ListGroup.Item action variant="danger">
                                <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="25" className="rounded-circle" />
                                <span> { loginUserName } </span>
                            </ListGroup.Item>
                        </ListGroup>
                    
                        {/* department List */}
                        <div className="bg-gray px-4 py-2 bg-light">
                            <p className="mb-0 py-1">그룹 <button onClick={()=> setModalIsOpen(true)}>+</button> </p>
                            <Modal isOpen= {modalIsOpen} style={modalStyles} onRequestClose={() => setModalIsOpen(false)}>
                                <DepartmentAddModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
                            </Modal>
                        </div>

                        { applyDepartmentList() }
                        
                        {/* whole member List */}
                        <div className="bg-gray px-4 py-2 bg-light">
                            <p className="mb-0 py-1">멤버</p>
                        </div>
                        
                        { applyMemberList(workspaceMemberData) }
                        
                    </div>
                </div>

                {/* right center */}
                <div className="col-7 px-0">
                    <div className="bg-gray px-4 bg-light">
                        <p className="h5">{ accessedDepartmentName } </p>
                        <span className="small text-muted">&nbsp;{ getDepartmentGoal(accessedDepartmentId) }</span>
                    </div>

                    <div className="px-4 py-3 chat-box bg-white">
                        <ListGroup>
                            { departmentChattingData }
                        </ListGroup>
                        <div className="media w-50 ml-auto mb-3">
                            &nbsp;
                            <div ref={ messageEndRef } />
                        </div>

                    </div>

                
                    <div className="input-group">
                        <input type="text" placeholder="Type a message" className="form-control py-3 bg-light" value={ inputChattingContent }
                            onChange={e => setInputChattingContent(e.target.value)} onKeyDown={handleOnKeyPress}/>
                        <Button onClick={ () => addChattingData(inputChattingContent) }> send </Button>
                    </div>

                </div>
                
                {/* right */}
                <div className="col-2 px-0">
                    <div className="bg-gray px-4 py-2 bg-light">
                        <p className="h5 mb-0 py-1">&nbsp;{ getDepartmentDeadLine(accessedDepartmentId) }</p>
                    </div>
                    <div className="bg-gray px-4 py-2 bg-light">
                        <p className="mb-0 py-1">참여자</p>
                    </div>

                    <div className="member-box">
                        { applyMemberList(departmentUserData) }
                    </div>

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