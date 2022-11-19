import './List.css'
import { AiOutlineFileText } from "react-icons/ai";

export default function FileList(props){
    let files = [];

    props.fileList.map( (file, index) => {
        let link = file.link
        files.push(
            <a href={link} key={index} className="file-container">
                <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                <div className="content">{file.content}</div>
            </a>
        )
    })


    if (files.length === 0){
        files.push(
            <div key='0' className="file-container" style={{fontSize:"10px"}}>등록된 파일이 없습니다.</div>
        )
    }

    return files;
}
