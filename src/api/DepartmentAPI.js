import axios from "axios"
import '../utils/Constant.js'
import '../Config.js'
import { BACK_BASE_URL } from "../Config.js";
axios.defaults.withCredentials = true;

export const getAllDepartment = async () =>{
    const responose = await axios.get(BACK_BASE_URL + 'departments')
    return responose.data;
}

export const getDepartmentMemberData = async (departmentId) =>{
    const responose = await axios.get(BACK_BASE_URL + 'department/' + departmentId + '/members')
    return responose.data;
}