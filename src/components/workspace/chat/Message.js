import React from "react";
import { useRef, useState } from "react";
import { ListGroup } from "react-bootstrap";
import "./Message.css";
import { AiOutlineFileText, AiOutlineGlobal } from "react-icons/ai";
import ImageShow from "../../modals/ImageShow";
import Modal from "react-modal";
import { translateByPapago } from "../../../api/PapagoAPI";

export default function Message({ chatSender, chatDate, chatContent, chatType, link }) {
    let [imageShowModalIsOpen, setImageShowModalIsOpen] = useState(false);
    const [isTranslation, setIsTranslation] = useState(false);
    const [isShowOptionSelector, setIsShowOptionSelector] = useState(false);
    const [translatedContent, setTranslatedContent] = useState("translation...");
    const inputRef = useRef(null);
    const translateButtonRef = useRef();
    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };
    const modalStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    function translateRequest(source, target) {
        translateByPapago(source, target, chatContent).then((res) => {
            setTranslatedContent(res);
        });
    }

    return chatType === "-1" || chatType === "-2" ? (
        <div className="message text-muted" style={{ textAlign: "center" }}>
            <span className="small">
                ({chatDate})&nbsp;{chatContent}{" "}
            </span>
        </div>
    ) : chatType === "0" ? (
        <div className="message">
            <li className="small" style={{ color: "#2B2B2B" }}>
                {chatSender}{" "}
                <span className="text-muted" style={{ fontSize: "5px" }}>
                    {chatDate.replaceAll("-", ".").substring(0, 16)}
                </span>
            </li>
            <div className="message-content">
                <ListGroup.Item style={{ width: "fit-content" }} className="rounded">
                    <span className="small"> {isTranslation ? translatedContent : chatContent} </span>
                </ListGroup.Item>
                <div
                    className="translation-button"
                    ref={translateButtonRef}
                    style={{
                        // backgroundColor: isTranslation ? "gainsboro" : "white",
                        color: isTranslation ? "blue" : "gray",
                    }}
                    onClick={() => {
                        console.log(translateButtonRef.current.offsetTop);
                        console.log(translateButtonRef.current.offsetLeft + translateButtonRef.current.offsetWidth);
                        setIsShowOptionSelector(!isShowOptionSelector);
                    }}
                >
                    {<AiOutlineGlobal />}
                </div>
                {isShowOptionSelector ? (
                    <div
                        className="translation-option-button-container"
                        // style={{
                        //     position: "absolute",
                        //     left: translateButtonRef.current.offsetLeft + translateButtonRef.current.offsetWidth,
                        //     top: translateButtonRef.current.offsetTop,
                        //     zIndex: 999,
                        // }}
                    >
                        <div
                            className="translation-option-button"
                            onClick={() => {
                                setIsShowOptionSelector(false);
                                setIsTranslation(false);
                            }}
                        >
                            Origin
                        </div>
                        <div
                            className="translation-option-button"
                            onClick={() => {
                                setIsShowOptionSelector(false);
                                setIsTranslation(true);
                                translateRequest("en", "ko");
                            }}
                        >
                            English → Korean
                        </div>
                        <div
                            className="translation-option-button"
                            onClick={() => {
                                setIsShowOptionSelector(false);
                                setIsTranslation(true);
                                translateRequest("ko", "en");
                            }}
                        >
                            Korean → English
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    ) : chatType === "1" ? (
        <div className="message">
            <li className="small" style={{ color: "#2B2B2B" }}>
                {chatSender}{" "}
                <span className="text-muted" style={{ fontSize: "5px" }}>
                    {chatDate.replaceAll("-", ".").substring(0, 16)}
                </span>
            </li>
            <div>
                <ListGroup.Item
                    style={{ width: "auto", float: "left" }}
                    action
                    className="rounded"
                    onClick={handleClick}
                >
                    <AiOutlineFileText style={{ fontSize: "40px" }} />
                    <span className="small"> {chatContent} </span>
                    <a href={link} ref={inputRef} />
                </ListGroup.Item>
            </div>
        </div>
    ) : (
        <div className="message">
            <li className="small" style={{ color: "#2B2B2B" }}>
                {chatSender}{" "}
                <span className="text-muted" style={{ fontSize: "5px" }}>
                    {chatDate.replaceAll("-", ".").substring(0, 16)}
                </span>
            </li>
            <ListGroup.Item style={{ width: "auto" }} action className="rounded">
                <img
                    src={link}
                    style={{ width: "200px", height: "200px" }}
                    onClick={() => setImageShowModalIsOpen(true)}
                />
            </ListGroup.Item>
            <Modal
                ariaHideApp={false}
                isOpen={imageShowModalIsOpen}
                style={modalStyles}
                onRequestClose={() => setImageShowModalIsOpen(false)}
            >
                <ImageShow setImageShowModalIsOpen={setImageShowModalIsOpen} link={link} />
            </Modal>
        </div>
    );
}
