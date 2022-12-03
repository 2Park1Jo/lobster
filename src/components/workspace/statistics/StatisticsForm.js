import "./Statistics.css"
import WorkspaceStatistics from "./WorkspaceStatistics";
import DepartmentChatStatistics from "./DepartmentChatStatistics";
import TalkKingStatistics from "./TalkKingStatistics";
import UploadKingStatistics from "./UploadKingStatistic";
import BucketStatistics from "./BucketStatistics";

export default function StatisticsForm({workspaceViewModel, departmentList}){
    return (   
        <div className="statistics-form-container">
            <WorkspaceStatistics
                workspaceViewModel={workspaceViewModel}
            />
            <DepartmentChatStatistics
                departmentList = {departmentList}
            />
            <TalkKingStatistics/>
            <BucketStatistics/>
            <UploadKingStatistics/>
        </div>
    );
};