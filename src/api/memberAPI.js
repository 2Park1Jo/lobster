import axios from "axios"

axios.defaults.withCredentials = true;

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
            if(res.data===true){
                return true
            }
            return false
        })
    return response
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
                console.log("Ok")
            }
            else{
                console.log(response)
            }
        }).catch(error=>{
            console.log(error)
        })

}