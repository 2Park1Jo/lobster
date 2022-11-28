import { useState } from "react"
import { Alert } from "reactstrap"
import {AiFillCaretDown,AiFillCaretUp} from "react-icons/ai"
const DepartmentSelectionContainer=({departmentName,fileList,setChecked,index})=>{
    const [isShowDetail,setIsShowDetail]=useState(false)

    function handleCheck(){
        setChecked(index)
    }

    const checkBox=<input type="checkbox" defaultChecked={true}
    onChange={()=>handleCheck()} style={{float:"left", marginTop:"6px",marginRight:"5px",cursor:"pointer"}}/>
    return(
        <>
        {
            isShowDetail === true?
                <Alert color="secondary">
                    {departmentName}
                    <AiFillCaretUp style={{float:"right",cursor:"pointer"}} onClick={()=>setIsShowDetail(false)}/>
                    {checkBox}
                    {fileList}
                </Alert>
            :
                <Alert color="secondary">
                    {departmentName}
                    <AiFillCaretDown style={{float:"right",cursor:"pointer"}} onClick={()=>setIsShowDetail(true)}/>
                    {checkBox}
                </Alert>
        }
        </>
    )
}
export default DepartmentSelectionContainer;