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
import { First, Last } from "react-bootstrap/esm/PageItem";

const workspace = new WorkspaceModel();
const workspaceViewModel = new WorkspaceViewModel(workspace);


export default function WorkspaceSelection() {
    let [modalIsOpen, setModalIsOpen] = useState(false);
    let [workspaceUpdateState, setWorkspaceUpdateState] = useState("");
    let [isReceivedWorkspace, setIsReceivedWorkspace] = useState(false);

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
        getWorkspaceData(localStorage.getItem('loginMemberEmail'))
        .then(
            (res) => {
                workspaceViewModel.update(res);
                setIsReceivedWorkspace(true);
            }
        )
    },[])

    useEffect( () => {
        getWorkspaceData(localStorage.getItem('loginMemberEmail'))
        .then(
            (res) => {
                workspaceViewModel.update(res);
                setWorkspaceUpdateState(res.length);
                setIsReceivedWorkspace(true);
            }
        )
    },[workspaceUpdateState])

    function logout(){
        localStorage.clear();
        navigate('/')
    }

    const closeModal = () => {
        setModalIsOpen(false);
        document.body.style.overflow = "unset";
    };

    if (isReceivedWorkspace){
    return(
        <div className="banner-container">

            <Modal ariaHideApp={false}  isOpen= {modalIsOpen} style={modalStyles} onRequestClose={() => closeModal()}>
                <WorkspaceAddModal 
                    modalIsOpen = {modalIsOpen} 
                    setModalIsOpen = {setModalIsOpen}
                    setWorkspaceUpdateState = {setWorkspaceUpdateState}
                    setIsReceivedWorkspace = {setIsReceivedWorkspace}
                />
            </Modal>
            <button className="logout-button" onClick={()=> logout()}> Logout </button>
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

            {/* <div className="banner-bottom">
                <button style={{border:'none',backgroundColor:'transparent'}} onClick={()=> logout()}> Logout </button>
            </div> */}
        </div>
    );
    }
}