import axios from "axios"
import '../utils/Constant.js'
import { errorText } from "../utils/Constant.js";
axios.defaults.withCredentials = true;
axios.defaults.timeout=4000;

export const getAllMemberData = async () =>{
    const responose = await axios.get('http://ec2-13-125-252-42.ap-northeast-2.compute.amazonaws.com:8080/member/allmember')
    return responose.data;
}


export const isDepulicatedId=async function(email){
    const response=await axios.get(
        'http://13.125.252.42:8080/member/duplicateid',
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
    const request=await axios.post('http://13.125.252.42:8080/member/signup',
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
