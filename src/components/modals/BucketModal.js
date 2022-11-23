import { useState,useRef,useEffect } from "react"
import BucketAddModal from "./BucketAddModal";
import BucketHistoryModal from "./BucketHistoryModal";

const BucketModal=({setBucketModalIsOpen,departmentId,workspaceId,email,memberName})=>{
    const [bucketMenu,setBucketMenu]=useState(0)

    return(
        <div>
            <button className="modal-close" type="button" onClick={() => setBucketModalIsOpen(false)}>X</button>
            {bucketMenu===0?
            <>
                <BucketHistoryModal setBucketMenu={setBucketMenu} departmentId={departmentId}/>
            </>
            :
            <>
                <BucketAddModal setBucketMenu={setBucketMenu} departmentId={departmentId} workspaceId={workspaceId} email={email} memberName={memberName}/>
            </>
            }
        </div>
    )
}
export default BucketModal