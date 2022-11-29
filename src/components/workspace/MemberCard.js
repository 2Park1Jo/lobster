import React from 'react'
import './Card.css'
import { ListGroup } from 'react-bootstrap'
import {IoPersonCircle} from "react-icons/io5";
import {BsDot} from "react-icons/bs"


export default function MemberCard({ profilePicture, name, email, role, onClicked, isConnected}){
    return(
        localStorage.getItem('loginMemberEmail').includes(email) ?

        <ListGroup.Item className='member-card'>
            <IoPersonCircle style={{fontSize:'29px', marginRight:'7px', color:'#C61C1C'}} />
            <span style={ { fontSize:'14px', fontWeight:'400', color:'#616161'}}>{ name }</span> 
                <BsDot style={{color:'#00CF08', fontSize:'30px'}}/>
            <span style={ { fontSize:'11px'}}> { role } </span>
        </ListGroup.Item>   
        :
        <ListGroup.Item className='member-card'>
            <IoPersonCircle style={{fontSize:'29px', marginRight:'7px', color:'#717171'}} />
            <span style={ { fontSize:'14px', fontWeight:'400', color:'#616161'}}>{ name }</span>
                {
                    isConnected ?
                        <BsDot style={{color:'#00CF08', fontSize:'30px'}}/>
                    :
                        <BsDot style={{color:'#AFAFAF', fontSize:'30px'}}/>
                } 
            <span style={ { fontSize:'11px'}}> { role } </span>
        </ListGroup.Item>
    )
}