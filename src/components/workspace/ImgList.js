import './List.css'

export default function ImgList(props){
    let imgs = [];

    props.imgList.map( (img, index) => {
        let link = img.link
        imgs.push(
            <a href={link} key={index} className="file-container">
                <img src={link} width='50px' height='50px'/>
                <div className="content">{img.content}</div>
            </a>
        )
    })

    if (imgs.length === 0){
        imgs.push(
            <div className='empty-text'>등록된 이미지가 없습니다.</div>
            // <div key='0' className="file-container" style={{fontSize:"10px"}}>등록된 이미지가 없습니다.</div>
        )
    }

    return imgs;
}
