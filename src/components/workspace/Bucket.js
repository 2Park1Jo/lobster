import "./Bucket.css"
import BucketCard from "./BucketCard"
import BucketSemiCard from "./BucketSemiCard";
import BucketBox from "./BucketBox";
import StatisticsForm from "./statistics/StatisticsForm";
import BucketZipDownloadModal from "../modals/BucketZipDownloadModal";
import Modal from "react-modal"
import { useState, useEffect } from "react";
import { getLastBucket, getBucket } from "../../api/BucketAPI"
import { getWorkspaceDepartments } from "../../api/DepartmentAPI"
import { BiChevronsLeft } from "react-icons/bi";

export default function Bucket({departmentViewModel, workspaceViewModel, chatViewModel}){
  let [bucketCardList, setBucketCardList] = useState([]);
  let [bucketCommitList, setBucketCommitList] = useState([]);
  let [bucketBox, setBucketBox] = useState("");

  let [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  let [selectedCommit, setSelectedCommit] = useState("");

  let [isOpenSemiBucketCard, setIsOpenSemiBucketCard] = useState(false);
  let [isOpenBucketBox, setIsOpenBucketBox] = useState(false);

  let [lastCommitList,setLastCommitList]=useState([])
  let [bucketZipDownloadModalIsOpen,setBucketZipDownloadModalIsOpen]=useState(false);
  let departmentList = [];

  useEffect( () => {
    getWorkspaceDepartments(localStorage.getItem('accessedWorkspaceId'))
    .then( (res) => {
      departmentList = res;
      
      let bucketCards = [];
      let lastCommits=[];
      departmentList.map( (department) => {
        let departmentId = department.departmentId;
        let departmentName = department.departmentName;
        let departmentGoal = department.departmentGoal;
        let departmentDeadLine = "마감일: " + department.departmentDeadline;

        if (departmentId !== localStorage.getItem('accessedWorkspaceId')){
          getLastBucket(departmentId)
          .then(
            (res) =>{
              let lastCommit = [];
              if (res.memberName !== undefined){
                let lastCommit=[];
                bucketCards.push(
                  <BucketCard
                    departmentName={departmentName}
                    departmentGoal={departmentGoal}
                    departmentDeadLine={departmentDeadLine}
                    bucketTitle={res.title}
                    memberName={res.memberName}
                    email={res.email}
                    date={res.date}
                    bucketProgress = {res.bucketProgress}
                    onClick={() => bucketCardClick(departmentId)}
                    key = {res.commitId}   
                  />
                )
                setBucketCardList([...bucketCards])
                lastCommit.push(departmentName)
                let fileLinks=[];
                if(res.fileLink1!=null){
                  fileLinks.push(res.fileLink1)
                }
                if(res.fileLink2!=null){
                  fileLinks.push(res.fileLink2)
                }
                if(res.fileLink3!=null){
                  fileLinks.push(res.fileLink3)
                }
                if(res.fileLink4!=null){
                  fileLinks.push(res.fileLink4)
                }
                if(res.fileLink5!=null){
                  fileLinks.push(res.fileLink5)
                }
                lastCommit.push(fileLinks)
                lastCommits.push([...lastCommit])
                setLastCommitList([...lastCommits])
              }
            }
          )
        }})
    })
  },[])

  useEffect( () => {
    if (selectedDepartmentId === ""){
      return
    }
    getBucket(selectedDepartmentId)
    .then(
      (res) => {
        if (res.status === 200){
          let bucketCommits = [];
          let commitList = res.data.reverse().map(data => data);
          commitList.map(
            (commit) => {
              bucketCommits.push(
                <BucketSemiCard
                  bucketTitle = {commit.title}
                  memberName = {commit.memberName}
                  email = {commit.email}
                  date = {commit.date}
                  onClick={() => commitClick(commit.commitId)}
                  key = {commit.commitId}
                />
              )
            }
          )
          setBucketCommitList([...bucketCommits])
        }
      }
    )
  }, [selectedDepartmentId])

  useEffect( () => {
    if (selectedCommit === ""){
      return
    }
    getBucket(selectedDepartmentId)
    .then(
      (res) => {
        if (res.status === 200){
          res.data.map(
            (commit) => {
              if (commit.commitId === selectedCommit){
                setBucketBox(
                  <BucketBox
                    bucketTitle={commit.title}
                    bucketCommit={commit.commit}
                    link1={commit.fileLink1}
                    link2={commit.fileLink2}
                    link3={commit.fileLink3}
                    link4={commit.fileLink4}
                    link5={commit.fileLink5}
                    key={commit.commitId}
                  />
                )
              }
            }
          )
        }
      }
    )
  }, [selectedCommit])

  function bucketCardClick(departmentId){
    setIsOpenSemiBucketCard(true);
    setIsOpenBucketBox(false);
    setSelectedDepartmentId(departmentId)
  }

  function commitClick(commitId){
    setIsOpenBucketBox(true);
    setSelectedCommit(commitId)
  }

  function closeArrowClick(){
    setIsOpenSemiBucketCard(false);
    setIsOpenBucketBox(false);
  }

  const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

  return(
    <div className="bucket-page-main-container">
      <div className="bucket-page-top">
        <div className="bucket-workspace-info">
          <div className="bucket-page-workspace-name">{workspaceViewModel.getName(localStorage.getItem('accessedWorkspaceId'))}</div>
          <div className="bucket-page-workspace-goal">{workspaceViewModel.getGoal(localStorage.getItem('accessedWorkspaceId'))}</div>
        </div>

        <div className="bucket-workspace-deadline-info">
          <div className="bucket-page-workspace-deadline">마감일 : {workspaceViewModel.getDeadLine(localStorage.getItem('accessedWorkspaceId'))}</div>
          <div className="bucket-page-workspace-dday">{workspaceViewModel.getDDay(localStorage.getItem('accessedWorkspaceId'))}</div>
        </div>
        <div className="bucket-workspace-deadline-info">
          <button className="btn btn-danger" style={{marginRight:"20px",marginTop:"4çpx"}} onClick={()=>setBucketZipDownloadModalIsOpen(true)}>제출물 만들기</button>
        </div>
        <Modal ariaHideApp={false} isOpen= {bucketZipDownloadModalIsOpen} style={modalStyles} onRequestClose={() => setBucketZipDownloadModalIsOpen(false)}>
          <BucketZipDownloadModal
            setBucketZipDownloadModalIsOpen={setBucketZipDownloadModalIsOpen}
            fileList={lastCommitList}
            workspaceName={workspaceViewModel.getName(localStorage.getItem('accessedWorkspaceId'))}                                  
            />
        </Modal>

      </div>
      <div className="bucket-page-body">
        {
          bucketCardList.length > 0 ?
          <div className="bucket-page-first-col">
            <div className="bucket-card-container">
              {bucketCardList}
            </div>

            {
              isOpenSemiBucketCard === true ?
                <>
                  <BiChevronsLeft className="close-arrow" onClick={() => closeArrowClick()}/>
                  <div className="bucket-card-container" style={{width:'263px'}}>
                    {bucketCommitList}
                  </div> 
                </>
              :
                <></>
            }
            

            {
              isOpenBucketBox === true ?
              <>
                <BiChevronsLeft className="close-arrow" onClick={() => setIsOpenBucketBox(false)}/>
                <div>
                  { bucketBox }
                </div>
              </>
              :
              <></>
            }
            </div>
          : //버켓없을경우
          <div className="bucket-page-first-col"> 
            <div className="bucket-card-container">
              <BucketCard
                departmentName="등록된 버킷이 없습니다."
              />
            </div> 
          </div>
        }
        <div className="bucket-page-second-col">
          <StatisticsForm
            workspaceViewModel={workspaceViewModel}
            departmentViewModel={departmentViewModel}
            chatViewModel = {chatViewModel}
            departmentList = {departmentList}
          />
        </div>
      </div>
    </div>
  )
}