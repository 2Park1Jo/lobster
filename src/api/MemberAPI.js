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

export const isSuccessedLogin = async () =>{
    const responose = await axios.get(BACK_BASE_URL + '/member/login')
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
        
        }).then(res=>{
            console.log(res);
            return res.data;
            // if(res.data===true){
            //     return true
            // }
            // else if(res.data===false){
            //     return false
            // }
            // else{
            //     return errorText;
            // }
        });
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
            if(response.status===200){
                return true
            }
            else{
                console.log(response)
                return false
            }
        }).catch(error=>{
            console.log(error)
        })

}
