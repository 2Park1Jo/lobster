import "./WorkspaceSelection.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorkSpaceBanner from "../components/banner/WorkspaceBanner";
import { getAllWorkspaceData } from "../data/WorkspaceData";
import { getWorkspaceMemberData } from "../data/WorkspaceMemberData";
import { WorkspaceModel } from "../models/model/Workspace";
import { WorkspaceViewModel } from "../models/view-model/WorkspaceViewModel";
import { getAllMemberData } from "../api/MemberAPI"

import WorkspaceAddModal from "../components/modals/WorkspaceAddModal";
import Modal from 'react-modal';
import { WorkspaceMember } from "../models/model/WorkspaceMember";
import { WorkspaceMemberViewModel } from "../models/view-model/WorkspaceMemberViewModel";
import { Member } from "../models/model/Member";
import { MemberViewModel } from "../models/view-model/MemberViewModel";

const workspace = new WorkspaceModel();
const workspaceViewModel = new WorkspaceViewModel(workspace);
workspaceViewModel.update(getAllWorkspaceData());

const workspaceMember = new WorkspaceMember();
const workspaceMemberViewModel = new WorkspaceMemberViewModel(workspaceMember);
workspaceMemberViewModel.update(getWorkspaceMemberData());

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


    useEffect( () => {
        // setAllMemberData(memberViewModel.getAll());
        getAllMemberData()
        .then(
            (res) => {
                console.log(res)
                // setAllMemberData(res)
                memberViewModel.update(res);
            }
        )
    },[])

    function logout(){
        localStorage.clear();
        navigate('/')
    }


    return(
        <div className="banner-container">
            <div className="banner-top">
                <h2>LOBSTER</h2>
            </div>

            <div className="banner-body">
                <WorkSpaceBanner 
                    allWorkspace={ workspaceViewModel.getAll() }
                />
            </div>

            <div className="banner-bottom">
                <button className="add-button" onClick={()=> setModalIsOpen(true)}> + </button>

                <button className="add-button" onClick={()=> logout()}> Logout </button>
            </div>

            <Modal isOpen= {modalIsOpen} style={modalStyles} onRequestClose={() => setModalIsOpen(false)}>
                <WorkspaceAddModal 
                    modalIsOpen = {modalIsOpen} 
                    setModalIsOpen = {setModalIsOpen}
                    allMemberViewModel = {memberViewModel}
                    workspaceViewModel = {workspaceViewModel}
                    workspaceMemberViewModel = {workspaceMemberViewModel}
                />
            </Modal>
        </div>
    );
}