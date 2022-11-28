import { useState,useEffect } from "react"
import { Alert } from "reactstrap"
import {AiFillCaretDown,AiFillCaretUp} from "react-icons/ai"
const DepartmentSelectionContainer=({departmentName,fileList,setChecked,index})=>{
    const [isShowDetail,setIsShowDetail]=useState(false)
    const [isChecked,setIsChecked]=useState(true)

    function handleCheck(){
        setChecked(index)
    }

    const checkBox=<input type="checkbox" defaultChecked={isChecked}
    onChange={()=>handleCheck()} style={{float:"left", marginTop:"6px",marginRight:"5px"}}/>
    return(
        <>
        {
            isShowDetail === true?
                <Alert color="secondary">
                    {departmentName}
                    <AiFillCaretUp style={{float:"right"}} onClick={()=>setIsShowDetail(false)}/>
                    {checkBox}
                    {fileList}
                </Alert>
            :
                <Alert color="secondary">
                    {departmentName}
                    <AiFillCaretDown style={{float:"right"}} onClick={()=>setIsShowDetail(true)}/>
                    {checkBox}
                </Alert>
        }
        </>
    )
}
export default DepartmentSelectionContainer;