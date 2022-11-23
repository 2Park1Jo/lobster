import axios from "axios"
import '../utils/Constant.js'
import '../Config.js'
import { BACK_BASE_URL } from "../Config.js";

export const putBucket=async function(departmentId,workspaceId,date,email,memberName,title,commit,fileList){
    let fileLink=[...fileList]
    for(var i=0;i<5-fileList.length;i++){
        fileLink.push(null)
    }
    const request=await axios.post(BACK_BASE_URL+'workspace/department/bucket/create',
    {
        departmentId:departmentId,
        workspaceId:workspaceId,
        date:date,
        email:email,
        memberName:memberName,
        title:title,
        commit:commit,
        fileLink1:fileLink[0],
        fileLink2:fileLink[1],
        fileLink3:fileLink[2],
        fileLink4:fileLink[3],
        fileLink5:fileLink[4]
    },
    {
        headers: {
        'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true
    
    }).then(res=>{
        console.log(res)
        if(res.status===201){
            return 201
        }
        else{
            return 400
        }
    }).catch(err=>{
        return 400;
    })
    return request;
}

export const getBucket=async function(departmentId){
    const request=await axios.get(BACK_BASE_URL+'workspace/department/'+departmentId+'/bucket-history',
    {
        headers: {
        'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true
    
    }).then(response=>{
        return response
    }).catch(err=>{
        if(err.message.indexOf("400")!==-1){
            return {"data":[]}
        }
    })

    return request
}