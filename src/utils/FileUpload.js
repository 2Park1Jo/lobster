import {useEffect, useState} from "react";
import { Alert } from 'reactstrap';
import AWS from 'aws-sdk';
import { ACCESS_KEY, REGION, S3_BUCKET, SECRET_ACCESS_KEY } from '../Config.js'

const FileUpload=({file,stomp,isConfirmed,setIsConfirmed,isCancled})=>{
    const [progress , setProgress] = useState(0);
    AWS.config.update({
        accessKeyId:ACCESS_KEY,
        secretAccessKey:SECRET_ACCESS_KEY
    });
    
    const myBucket=new AWS.S3({
        params:{Bucket: S3_BUCKET},
        region: REGION
    });
    
    const uploadFile = async () => {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let date = currentDate.getDate();
        let houres = String(currentDate.getHours()).padStart(2, "0");
        let minutes = String(currentDate.getMinutes()).padStart(2, "0");
        let seconds = String(currentDate.getSeconds()).padStart(2, "0");
        let currentTime = year + '-' + month + '-' + date + ' ' + houres + ':' + minutes + ':' + seconds;
        let key=("upload/"+currentTime+"/"+ file.name).replace(/ /g, '')
        let contentType;


    
        const params = {
            ACL: 'public-read',
            Body: file,
            ACL: AWS.config.acl,
            Bucket: S3_BUCKET,
            Key: key
        };
        
        myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err,data) => {
            if (err){ console.log(err)
                alert("서버에 에러가 발생하였습니다!")
            }
            else{
                if(file.type.indexOf("image")===-1){
                            contentType=1
                          }
                        else{
                            contentType=2
                          }
                        stomp.send('/pub/chat/message', {}, JSON.stringify({
                            departmentId: localStorage.getItem('accessedDepartmentId'),
                            email: localStorage.getItem('loginMemberEmail'),
                            content: file.name,
                            contentType: contentType,
                            date : currentTime,
                            link:"https://"+S3_BUCKET+".s3."+REGION+".amazonaws.com/"+key
                         }))
            }
          })
    }
    if(isCancled){
        alert("파일 업로드가 취소되었습니다!")
    }

    if(isConfirmed){
        uploadFile();
        setIsConfirmed(false)
    }
    
    return(
        <div>
        <Alert color="primary">{file.name}의 업로드 비율: {progress}%</Alert>
        </div>
    )    
}

export default FileUpload