import { useState,useRef,useEffect } from "react"
import BucketAddModal from "./BucketAddModal";
import BucketHistoryModal from "./BucketHistoryModal";

const BucketModal=({setBucketModalIsOpen,departmentId,workspaceId,email,memberName,isShowLast,stomp})=>{
    const [bucketMenu,setBucketMenu]=useState(0)

    return(
        <div>
            <button className="modal-close" type="button" onClick={() => setBucketModalIsOpen(false)}>X</button>
            {bucketMenu===0?
            <>
                <BucketHistoryModal setBucketMenu={setBucketMenu} isShowLast={isShowLast} departmentId={departmentId}/>
            </>
            :
            <>
                <BucketAddModal setBucketMenu={setBucketMenu} departmentId={departmentId} workspaceId={workspaceId} email={email} memberName={memberName} stomp={stomp}/>
            </>
            }
        </div>
    )
}
export default BucketModal