import './List.css'
import { AiOutlineFileText } from "react-icons/ai";
import { useMemo } from "react";

export default function FileList(props){

    let files = useMemo( () => {

        let fileList = [];

        props.fileList.map( (file, index) => {
            let link = file.link
            fileList.push(
                <a href={link} key={index} className="file-container">
                    <AiOutlineFileText style={{fontSize:"50px", color:"black"}}/>
                    <div className="content">{file.content}</div>
                </a>
            )
        })

        if (fileList.length === 0){
            fileList.push(
                <div key="-1" className='empty-text'>등록된 파일이 없습니다.</div>
            )
        }
        return fileList;}, [props.fileList.length]);

    return files;
}
