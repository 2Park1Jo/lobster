import "./Statistics.css"
import WorkspaceStatistics from "./WorkspaceStatistics";
import DepartmentChatStatistics from "./DepartmentChatStatistics";
import TalkKingStatistics from "./TalkKingStatistics";
import UploadKingStatistics from "./UploadKingStatistic";
import BucketStatistics from "./BucketStatistics";

export default function StatisticsForm({workspaceViewModel, departmentViewModel, chatViewModel, departmentList}){
    return (   
        <div className="statistics-form-container">
            <WorkspaceStatistics
                workspaceViewModel={workspaceViewModel}
            />
            <DepartmentChatStatistics
                departmentViewModel={departmentViewModel}
                chatViewModel = {chatViewModel}
                departmentList = {departmentList}
            />
            <TalkKingStatistics/>
            <BucketStatistics/>
            <UploadKingStatistics/>
        </div>
    );
};