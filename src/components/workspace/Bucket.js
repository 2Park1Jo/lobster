import "./Bucket.css"
import BucketCard from "./BucketCard"

export default function Bucket(){
  return(
    <div className="bucket-page-main-container">
        <div className="bucket-page-top">
          eee
        </div>
        <div className="bucket-page-body">
          <div className="bucket-page-first-col">
            <BucketCard
              departmentName="코딩방"
              departmentGoal="코딩하기"
              departmentDeadLine="2022-10-31"
              bucketTitle="최종 ppt 제출"
              memberName="박대원"
              email="qkreodnjs97@naver.com"
              date="2022-10-24 04:11:47"
              fileLinkList=""              
            />
          </div>
          <div className="bucket-page-second-col">
            gd
          </div>
        </div>
    </div>
  )
}