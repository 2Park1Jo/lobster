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