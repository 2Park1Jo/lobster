import './List.css'
import { AiOutlineFileText } from "react-icons/ai";

export default function FileList(props){
    let files = [];

    props.fileList.map( (file, index) => {
        let link = file.link
        files.push(
            <a href={link} key={index} className="file-container">
                <AiOutlineFileText style={{fontSize:"50px"}}/>
                <div className="content">{file.content}</div>
            </a>
        )
    })

    return files;
}
