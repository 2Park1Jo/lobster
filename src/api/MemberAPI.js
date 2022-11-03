import axios from "axios"
import '../utils/Constant.js'
import { serverURL } from "../utils/Constant.js";
axios.defaults.withCredentials = true;
axios.defaults.timeout=4000;

export const getAllMemberData = async () =>{
    const responose = await axios.get(serverURL+'/member/allmember')
    return responose.data;
}


export const isDepulicatedId=async function(email){
    const data=await axios.get(
        serverURL+'/member/duplicateid',
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
    const data=await axios.post(serverURL+'/member/signup',
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
                return true
            }
            else{
                console.log(response)
                return false
            }
        }).catch(error=>{
            console.log(error)
        })
    return data;
}
