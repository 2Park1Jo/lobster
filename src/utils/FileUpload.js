import {useState} from "react";
import AWS from 'aws-sdk';
import { ACCESS_KEY, REGION, S3_BUCKET, SECRET_ACCESS_KEY } from '../Config.js'

// AWS.config.update({
//     accessKeyId:ACCESS_KEY,
//     secretAccessKey:SECRET_ACCESS_KEY
// });

const myBucket=new AWS.S3({
    params:{Bucket: S3_BUCKET},
    region: REGION
});

// const [progress , setProgress] = useState(0);
// const [selectedFile, setSelectedFile] = useState(null);
// const handleFileInput = (e) => {
//     const file = e.target.files[0];
//     const fileExt = file.name.split('.').pop();
//     if(file.type !== 'image/jpeg' || fileExt !=='jpg'){
//       alert('jpg 파일만 Upload 가능합니다.');
//       return;
//     }
//     setProgress(0);
//     setSelectedFile(e.target.files[0]);
// }

export const uploadFiles=(e)=>{
    
    console.log(e.target.files[0].name)
}

// const uploadFile = (file,departmentId,time) => {
//     const params = {
//       ACL: 'public-read',
//       Body: file,
//       Bucket: S3_BUCKET,
//       Key: departmentId + "/"+file.name.replace(/ /g, '')+ "/"+time

//     };
    
//     myBucket.putObject(params)
//       .on('httpUploadProgress', (evt) => {
//         setProgress(Math.round((evt.loaded / evt.total) * 100))
//         setShowAlert(true);
//         setTimeout(() => {
//           setShowAlert(false);
//           setSelectedFile(null);
//         }, 3000)
//       })
//       .send((err) => {
//         if (err) console.log(err)
//       })
// }

