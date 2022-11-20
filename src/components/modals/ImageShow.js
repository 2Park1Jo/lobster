const ImageShow=({setImageShowModalIsOpen,link})=>{
    return(
        <div>
            <button className="modal-close" type="button" onClick={() => setImageShowModalIsOpen(false)}>X</button>
            <img style={{height:'90vh'}} src={link}/>
        </div>
    )
}
export default ImageShow