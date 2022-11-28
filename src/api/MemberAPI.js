import axios from "axios"
import '../utils/Constant.js'
import '../Config.js'
import { BACK_BASE_URL } from "../Config.js";
axios.defaults.withCredentials = true;
// axios.defaults.timeout=4000;

export const getAllMemberData = async () =>{
    const responose = await axios.get(BACK_BASE_URL + 'member/allmember')
    return responose.data;
}

export const setLastChatData = async (memberEmail, departmentId, workspaceId, lastChatId, checkedMessageCount) =>{
    const data=await axios.post(BACK_BASE_URL+'workspace/last-chat/create',
        {
            email:memberEmail,
            departmentId:departmentId,
            workspaceId: workspaceId,
            lastChatId:lastChatId,
            messageCount:checkedMessageCount
        },
        {
            headers: {
            'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true
        
        })
    return data; //success -> 201
}

export const getLastChatData = async (memberEmail, workspaceId) =>{
    const responose = await axios.get(BACK_BASE_URL + memberEmail + '/workspace/' + workspaceId + '/last-chat')
    return responose.data;
}

export const getTalkKingMembers = async (workspaceId) =>{
    const responose = await axios.get(BACK_BASE_URL + 'workspace/' + workspaceId + '/top-three-chats')
    return responose.data;
}

export const isLoginSuccessed =async function(email,password){
    const data=await axios.post(BACK_BASE_URL+'member/login',
        {
            email:email,
            password:password,
        },
        {
            headers: {
            'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true
        
        })
    return data;
}

export const isDuplicatedId=async function(email){
    const data=await axios.get(
        BACK_BASE_URL+'member/duplicateid',
        {
            params:{
                email:email
            }
        },
        {
            headers: {
            'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true
        
        }).then(response=>{
            return response.data;
        }).catch(error=>{
            console.log(error)
        })
    return data
}

export const getMemberProfile=async function(email){
    const data=await axios.get(
        BACK_BASE_URL+'member/profile',
        {
            params:{
                email:email
            }
        },
        {
            headers: {
            'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true
        
        }).then(response=>{
            return [response.data,response.status];
        }).catch(error=>{
            if(error.message.indexOf("400")!==-1){
                return[null,400]
            }
        })
    return data
}

export const registerUser=async function(email,password,name){
    const data=await axios.post(BACK_BASE_URL+'member/signup',
        {
            email:email,
            password:password,
            memberName:name
        },
        {
            headers: {
            'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true
        
        }).then(response=>{
            if(response.status===201){
                return "success"
            }
        }).catch(error=>{
            if(error.response.status===409){
                return "duplicated"
            }
            else{
                return "error"
            }
        })
    return data;
}