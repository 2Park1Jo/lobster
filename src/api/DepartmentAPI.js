import axios from "axios"
import '../utils/Constant.js'
import '../Config.js'
import { BACK_BASE_URL } from "../Config.js";
axios.defaults.withCredentials = true;

export const getAllDepartment = async () =>{
    const responose = await axios.get(BACK_BASE_URL + 'departments')
    return responose.data;
}

export const getDepartments = async (workspaceId, memberEmail) =>{
    const responose = await axios.get(BACK_BASE_URL + 'member/' + memberEmail + '/workspace/' + workspaceId + '/departments')
    return responose.data;
}

export const getDepartmentMemberData = async (departmentId) =>{
    const responose = await axios.get(BACK_BASE_URL + 'department/' + departmentId + '/members')
    return responose.data;
}

export const getChattingData = async (departmentId) =>{
    const responose = await axios.get(BACK_BASE_URL + 'department/' + departmentId + '/chat/content')
    return responose.data;
}

export const addDepartment = async (departmentId, departmentName, departmentGoal, departmentDeadline) => {
    const response = await axios.post(BACK_BASE_URL + 'department/login',
    {
        departmentId: departmentId,
        departmentName: departmentName,
        departmentGoal: departmentGoal,
        departmentDeadline: departmentDeadline
    },
    {
        headers: {
        'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true
    })
    return response;
}