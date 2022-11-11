import "./WorkspaceSelection.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMemberData } from "../api/MemberAPI"
import { getWorkspaceData } from "../api/WorkspaceAPI";

import Modal from 'react-modal';
import WorkspaceAddModal from "../components/modals/WorkspaceAddModal";
import WorkSpaceBanner from "../components/banner/WorkspaceBanner";

import { Member } from "../models/model/Member";
import { MemberViewModel } from "../models/view-model/MemberViewModel";
import { WorkspaceModel } from "../models/model/Workspace";
import { WorkspaceViewModel } from "../models/view-model/WorkspaceViewModel";

const workspace = new WorkspaceModel();
const workspaceViewModel = new WorkspaceViewModel(workspace);

const member = new Member();
const memberViewModel = new MemberViewModel(member);

export default function WorkspaceSelection() {
    let [modalIsOpen, setModalIsOpen] = useState(false);
    let navigate = useNavigate();
    
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

    let [isReceivedWorkspace, setIsReceivedWorkspace] = useState(false);
    let [isReceivedMember, setIsReceivedMember] = useState(false);

    useEffect( () => {
        getAllMemberData()
        .then(
            (res) => {
                memberViewModel.update(res);
                setIsReceivedMember(true);
            }
        )

        getWorkspaceData(localStorage.getItem('loginMemberEmail'))
        .then(
            (res) => {
                workspaceViewModel.update(res);
                setIsReceivedWorkspace(true);
            }
        )
    },[])

    function logout(){
        localStorage.clear();
        navigate('/')
    }

    const closeModal = () => {
        setModalIsOpen(false);
        document.body.style.overflow = "unset";
    };

    if (isReceivedMember && isReceivedWorkspace){
    return(
        <div className="banner-container">

            <Modal isOpen= {modalIsOpen} style={modalStyles} onRequestClose={() => closeModal()}>
                <WorkspaceAddModal 
                    modalIsOpen = {modalIsOpen} 
                    setModalIsOpen = {setModalIsOpen}
                    allMemberViewModel = {memberViewModel}
                    workspaceViewModel = {workspaceViewModel}
                />
            </Modal>
            <div className="banner-top">
                <h2>LOBSTER</h2>
            </div>

            <div className="banner-body">
                <WorkSpaceBanner 
                    allWorkspace={ workspaceViewModel.getAll() }
                    modalIsOpen={modalIsOpen} 
                    setModalIsOpen={setModalIsOpen}
                />
            </div>

            <div className="banner-bottom">
                <button className="add-button" onClick={()=> logout()}> Logout </button>
            </div>
        </div>
    );
    }
}