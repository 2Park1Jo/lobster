import axios from "axios"
import '../utils/Constant.js'
import '../Config.js'
import { BACK_BASE_URL } from "../Config.js";
axios.defaults.withCredentials = true;
axios.defaults.timeout=4000;

export const getAllMemberData = async () =>{
    const responose = await axios.get(BACK_BASE_URL + 'member/allmember')
    return responose.data;
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
            console.log(response)
            return response.data;
        }).catch(error=>{
            console.log(error)
        })
    return data
}

export const registerUser=async function(email,password,name){
    const data=await axios.post(BACK_BASE_URL+'member/signup',
        {
            email:email,
            password:password,
            name:name
        },
        {
            headers: {
            'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true
        
        }).then(response=>{
            console.log(response.status)
            if(response.status===201){
                return "success"
            }
        }).catch(error=>{
            console.log(error.response.status)
            if(error.response.status===409){
                return "duplicated"
            }
            else{
                return "error"
            }
        })
    return data;
}