import './List.css'
import { useMemo } from "react";

export default function ImgList(props){

    let imgs = useMemo( () => {

        let imgList = [];

        props.imgList.map( (img, index) => {
            let link = img.link
            imgList.push(
                <a href={link} key={index} className="file-container">
                    <img src={link} width='50px' height='50px'/>
                    <div className="content">{img.content}</div>
                </a>
            )
        })
    
        if (imgList.length === 0){
            imgList.push(
                <div key="-1" className='empty-text'>등록된 이미지가 없습니다.</div>
            )
        }

        return imgList;},[props.imgList.length]);

    return imgs;
}
