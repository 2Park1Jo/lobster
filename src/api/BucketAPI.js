import axios from "axios"
import '../utils/Constant.js'
import '../Config.js'
import { BACK_BASE_URL } from "../Config.js";
import { response } from "express";

export const putBucket=async function(departmentId,time,memberEmail,memberName,title,detail,fileList){
    const request=await axios.post(BACK_BASE_URL+'bucket/upload',
    {
        departmentId:departmentId,
        time:time,
        memberEmail:memberEmail,
        memberName:memberName,
        title:title,
        detail:detail,
        fileList
    },
    {
        headers: {
        'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true
    
    }).then()
}

export const getBucket=async function(departmentId){
    const request=await axios.get(BACK_BASE_URL+'bucket/get',
    {
        departmentId:departmentId,
    },
    {
        headers: {
        'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true
    
    }).then(response=>{
        return response
    }).catch(err=>{
        
    })

    return request
}