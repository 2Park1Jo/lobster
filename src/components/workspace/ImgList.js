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

    return imgs;
}
