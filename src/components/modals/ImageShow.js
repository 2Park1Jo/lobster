const ImageShow=({setImageShowModalIsOpen,link})=>{
    return(
        <div>
            <button className="modal-close" type="button" onClick={() => setImageShowModalIsOpen(false)}>X</button>
            <img height={500} src={link}/>
        </div>
    )
}
export default ImageShow