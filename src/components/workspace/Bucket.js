import '../../pages/Workspace.css'
import {useState} from "react";
import AWS from 'aws-sdk';
import { Row, Col, Button, Input, Alert } from 'reactstrap';
import { ACCESS_KEY, REGION, S3_BUCKET, SECRET_ACCESS_KEY } from '../../Config.js'
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

AWS.config.update({
    accessKeyId:ACCESS_KEY,
    secretAccessKey:SECRET_ACCESS_KEY
});

const myBucket=new AWS.S3({
    params:{Bucket: S3_BUCKET},
    region: REGION
});

export default function Bucket(){
    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
     setFile(file);
    };
    const handleFileInput = (e) => {
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        // if(file.type !== 'image/jpeg' || fileExt !=='jpg'){
        //   alert('jpg 파일만 Upload 가능합니다.');
        //   return;
        // }
        setProgress(0);
        setSelectedFile(e.target.files[0]);
    }
    
    const uploadFile = (file) => {
        const params = {
          ACL: 'public-read',
          Body: file,
          ACL: AWS.config.acl,
          Bucket: S3_BUCKET,
          Key: "upload/" + file.name.replace(/ /g, '')
        };
        
        myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
              setSelectedFile(null);
            }, 3000)
          })
          .send((err) => {
            if (err) console.log(err)
          })
    }
    return(
        <div className="contents-container">
            <div>
      <div>
        <Row>
          <Col><h1>File Upload</h1></Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col>
            { showAlert?
              <Alert color="primary">업로드 진행률 : {progress}%</Alert>
              : 
              <Alert color="primary">파일을 선택해 주세요.</Alert> 
            }
          </Col>
        </Row>
        <Row>
          <Col>
            <Input color="primary" type="file" onChange={handleFileInput}/>
            {selectedFile?(
              <Button color="primary" onClick={() => uploadFile(selectedFile)}> Upload to S3</Button>
            ) : null }
          </Col>
        </Row>
      </div>
    </div>
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
        </div>
    );
    
}