import "./Bucket.css"
import BucketCard from "./BucketCard"
import { useState, useEffect } from "react";
import { getLastBucket } from "../../api/BucketAPI"

export default function Bucket({departmentIdList, departmentViewModel}){
  let [bucketCardList, setBucketCardList] = useState([]);

  useEffect( () => {
    console.log("render")
    let bucketCards = [];
    departmentIdList.map( (departmentId) => {
      if (departmentId !== localStorage.getItem('accessedWorkspaceId')){
        getLastBucket(departmentId)
        .then(
          (res) =>{
            let departmentName = departmentViewModel.getName(departmentId);
            let departmentGoal = departmentViewModel.getGoal(departmentId);
            let departmentDeadLine = departmentViewModel.getDeadLine(departmentId);
            bucketCards.push(
              <BucketCard
                departmentName={departmentName}
                departmentGoal={departmentGoal}
                departmentDeadLine={departmentDeadLine}
                bucketTitle={res.title}
                memberName={res.memberName}
                email={res.email}
                date={res.date}
                fileLinkList=""
                key = {res.commitId}   
              />
            )
            setBucketCardList([...bucketCards])
          }
        )
      }})
  },[])

  useEffect(() => {
    console.log(bucketCardList)
  },[bucketCardList])

  return(
    <div className="bucket-page-main-container">
        <div className="bucket-page-top">
          eee
        </div>
        <div className="bucket-page-body">
          <div className="bucket-page-first-col">
            {bucketCardList}
          </div>
          <div className="bucket-page-second-col">
            gd
          </div>
        </div>
    </div>
  )
}