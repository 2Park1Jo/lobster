import axios from "axios"
import '../utils/Constant.js'
import '../Config.js'
import { errorText } from "../utils/Constant.js";
import { BACK_BASE_URL } from "../Config.js";
axios.defaults.withCredentials = true;
axios.defaults.timeout=4000;

export const getAllMemberData = async () =>{
    const responose = await axios.get(BACK_BASE_URL + '/member/allmember')
    return responose.data;
}

export const isSuccessedLogin = async (email, password) =>{
    const responose = await axios.post(BACK_BASE_URL + '/member/login',
    {
        email:email,
        password:password,
    })
    return responose.data;
}

export const isDepulicatedId=async function(email){
    const response=await axios.get(
        BACK_BASE_URL + '/member/duplicateid',
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

export const registerUser=async function(email,password,name){
    const request=await axios.post(BACK_BASE_URL + '/member/signup',
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
            console.log(response)
            if(response.status===200){
                return "sucess"
            }
            else if(response.status===409){
                return "depulicated"
            }
            else{
                console.log(response)
                return "error"
            }
        }).catch(error=>{
            return "error"
        })
    return data;
}
