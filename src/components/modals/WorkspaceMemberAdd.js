import React, { useEffect, useState } from 'react';
import { WorkspaceMember } from '../../models/model/WorkspaceMember';
import { isDuplicatedId } from '../../api/MemberAPI';
import './Modal.css'
import { inviteMemberToWorkspace } from '../../api/WorkspaceAPI';

const WorkspaceMemberAdd=({setWorkspaceMemberAddModalIsOpen,WorkspaceId})=>{
    let [inputMemberEmail,setinputMemberEmail]=useState("");
    let [searchedMemberHTML,setSearchedMemberHTML]=useState();
    let [memberList,setMemberList]=useState([]);
    let [addedMemberHTML,setAddedMemberHTML]=useState();
    
    useEffect(()=>{
        let memberListHTML=[];
        for(var i=0;i<memberList.length;i++){
            let key=memberList.at(i)
            console.log(memberList.at(i));
            memberListHTML.push(<div className='searched-Email-div' onClick={()=>deleteMemberAtList(key)}>
                    <div>
                        <span style={{color:'black', fontSize : '14px', float:'left'}}>{key}</span>
                        <span style={{color:'black', fontSize : '14px', float:'right'}}>X</span>
                    </div>
                </div>)
        }
        setAddedMemberHTML([...memberListHTML]);
    },[memberList])

    function addMemberToList(email){
        let isExistedInList=false;
        for(var i=0;i<memberList.length;i++){
            if(memberList.at(i)===email){
                isExistedInList=true
            }
            console.log(memberList.length)
        }
        if(isExistedInList===false){
            setMemberList([...memberList,email])
        }
        setSearchedMemberHTML(<span style={{color:'green', fontSize : '14px'}}>추가되었습니다.</span>)
    }

    function deleteMemberAtList(value){
        let key=value
        memberList.splice(memberList.indexOf(key),1);
        setMemberList([...memberList])
        console.log(memberList)
    }

    function inviteMember(){
        if(memberList.length===0){
            alert("초대할 멤버가 없습니다.")
        }
        else{
            inviteMemberToWorkspace(memberList,WorkspaceId);
        }
    }




    function searchMember(){
        let result=Promise.resolve(isDuplicatedId(inputMemberEmail))
            result.then(value=>{
                if(value){
                    setSearchedMemberHTML(
                        <div className='searched-Email-div' onClick={()=>addMemberToList(inputMemberEmail)}>
                            <div>
                                <span style={{color:'black', fontSize : '14px', float:'left'}}>{inputMemberEmail}</span>
                                <span style={{color:'black', fontSize : '14px', float:'right'}}>+</span>
                            </div>
                        </div>)
                }
                else if(value===false){
                    setSearchedMemberHTML(<span style={{color:'red', fontSize : '14px'}}>존재하지 않는 유저의 이메일입니다.</span>)
                }
                else {
                    setSearchedMemberHTML(<span style={{color:'red', fontSize : '14px'}}>서버에 에러가 발생했습니다.</span>)
                }
            }).catch(error=>{
                setSearchedMemberHTML(<span style={{color:'red', fontSize : '14px'}}>서버에 에러가 발생했습니다.</span>)
            })
    }

return(
    <div>
        <button className="modal-close" type="button" onClick={() => setWorkspaceMemberAddModalIsOpen(false)}>X</button>
        <div className='modal-container'>
            <h3 >멤버 초대하기</h3>
            <div>
                <label>이메일 검색</label>
                <div>
                    <input
                        type="text"
                        placeholder="초대할 유저의 이메일을 입력해주세요"
                        value={ inputMemberEmail }
                        onChange={e => setinputMemberEmail(e.target.value)}
                        style={{float:'left', height:"38px"}}
                    />
                    <button className="btn btn-primary" style={{float:'right'}} onClick={()=>searchMember()}>검색</button>
                </div>
            </div>
            
            <div>
                {searchedMemberHTML}
            </div>

            <div className='added-member-container'>
                <label>멤버 리스트</label>
                {addedMemberHTML}
            </div>

            <button className="btn btn-primary" onClick={()=>inviteMember()}>
                초대하기
            </button>
        </div>
    </div>
);
}
export default WorkspaceMemberAdd;