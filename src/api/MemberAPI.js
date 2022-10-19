import axios from "axios";

const BASE_URL = "ec2-13-125-252-42.ap-northeast-2.compute.amazonaws.com:8080";

const getWaitResources = async () =>{
    const apiData = await axios.get('ec2-13-125-252-42.ap-northeast-2.compute.amazonaws.com:8080/member/allmember')
    return apiData.data;
}

export {
    getWaitResources
};
