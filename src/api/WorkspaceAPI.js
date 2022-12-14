import axios from "axios"
import '../utils/Constant.js'
import '../Config.js'
import { BACK_BASE_URL } from "../Config.js";
axios.defaults.withCredentials = true;

export const getAllWorkspace = async () =>{
    const responose = await axios.get(BACK_BASE_URL + 'workspaces')
    return responose.data;
}

export const getWorkspaceData = async (memberEmail) =>{
    const responose = await axios.get(BACK_BASE_URL + memberEmail + '/workspaces/')
    return responose.data;
}

export const getWorkspaceMemberData = async (workspaceId) =>{
    const responose = await axios.get(BACK_BASE_URL + 'workspace/' + workspaceId + '/members')
    return responose.data;
}

export const getWorkspaceChatCountData = async (workspaceId) =>{
    const responose = await axios.get(BACK_BASE_URL + 'workspace/' + workspaceId + '/chat/count')
    return responose.data;
}

export const addWorkspace = async (email, workspaceName, workspaceGoal, workspaceDeadline) => {
    const response = await axios.post(BACK_BASE_URL + 'workspace/create',
    {
        workspace:{
            workspaceId: "",
            workspaceName: workspaceName,
            workspaceGoal: workspaceGoal,
            workspaceDeadline: workspaceDeadline,
        },
        workspaceMemberList: [
            {
                email: email,
                workspaceId: "",
                workspaceGrade: ""
            },
        ]
    },
    {
        headers: {
        'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true
    })
    return response;
}

export const inviteMemberToWorkspace=async(emailList,nameList,workspaceId)=>{
    let bodyList=[]
    for(var i=0;i<emailList.length;i++){
        bodyList.push({email:emailList[i],
            memberName:nameList[i],workspaceGrade:null})
    }
    const responose=await axios.post(BACK_BASE_URL+'workspace/'+workspaceId+'/invitation',
    
    bodyList
    ,
    {
        headers: {
        'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true
    })
    return responose;
}

